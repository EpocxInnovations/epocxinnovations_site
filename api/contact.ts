import type { IncomingMessage, ServerResponse } from "node:http"

interface ContactPayload {
  name?: string
  email?: string
  details?: string
  service?: string
  _gotcha?: string
}

async function parseBody(req: IncomingMessage & { body?: any }): Promise<ContactPayload> {
  if (req.body && typeof req.body === "object") {
    return req.body
  }

  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }

  return new Promise((resolve) => {
    let data = ""
    req.on("data", (chunk) => {
      data += chunk
      if (data.length > 1e6) {
        req.destroy()
        resolve({})
      }
    })
    req.on("end", () => {
      try {
        resolve(JSON.parse(data))
      } catch {
        resolve({})
      }
    })
    req.on("error", () => resolve({}))
  })
}

export default async function handler(
  req: IncomingMessage & { body?: any; query?: any },
  res: ServerResponse,
) {
  // CORS & Security Headers
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept")

  if (req.method === "OPTIONS") {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method !== "POST") {
    res.statusCode = 405
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ ok: false, error: "Method Not Allowed" }))
    return
  }

  try {
    const body = await parseBody(req)
    const { name, email, details, service = "", _gotcha } = body

    // 1. Honeypot check: Silent success if filled
    if (_gotcha && String(_gotcha).trim().length > 0) {
      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify({ ok: true }))
      return
    }

    // 2. Strict Server-Side Validation
    const trimmedName = typeof name === "string" ? name.trim() : ""
    const trimmedEmail = typeof email === "string" ? email.trim() : ""
    const trimmedDetails = typeof details === "string" ? details.trim() : ""
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!trimmedName || !trimmedEmail || !emailRegex.test(trimmedEmail) || !trimmedDetails) {
      res.statusCode = 400
      res.setHeader("Content-Type", "application/json")
      res.end(
        JSON.stringify({
          ok: false,
          error: "Invalid input: name, valid email, and message details are required.",
        }),
      )
      return
    }

    const emailSubject = `New inquiry from ${trimmedName}`
    const emailBody = `Name: ${trimmedName}\nEmail: ${trimmedEmail}${
      service ? `\nService: ${service}` : ""
    }\n\nMessage:\n${trimmedDetails}`

    // 3. Email Dispatch Strategy:
    // Option A: Resend HTTPS API (Recommended - fastest latency)
    if (process.env.RESEND_API_KEY) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "Epocx Website <no-reply@epocxinnovations.in>",
          to: [process.env.EMAIL_TO || "info@epocxinnovations.in"],
          reply_to: trimmedEmail,
          subject: emailSubject,
          text: emailBody,
        }),
      })

      if (!resendRes.ok) {
        const errText = await resendRes.text()
        console.error("Resend API Error:", resendRes.status, errText)
        throw new Error(`Email provider returned HTTP ${resendRes.status}`)
      }
    }
    // Option B: Brevo HTTPS API
    else if (process.env.BREVO_API_KEY) {
      const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sender: {
            name: "Epocx Website",
            email: process.env.EMAIL_FROM_ADDRESS || "no-reply@epocxinnovations.in",
          },
          to: [{ email: process.env.EMAIL_TO || "info@epocxinnovations.in" }],
          replyTo: { email: trimmedEmail, name: trimmedName },
          subject: emailSubject,
          textContent: emailBody,
        }),
      })

      if (!brevoRes.ok) {
        const errText = await brevoRes.text()
        console.error("Brevo API Error:", brevoRes.status, errText)
        throw new Error(`Email provider returned HTTP ${brevoRes.status}`)
      }
    }
    // Option C: Local Dev / Test mode (Graceful simulation without stalling)
    else {
      console.log(
        `[Contact API Dev/Sim] Received submission from ${trimmedName} <${trimmedEmail}>: "${trimmedDetails.slice(0, 40)}..."`,
      )
    }

    // 4. Return instant 200 OK
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ ok: true, message: "Inquiry received successfully" }))
  } catch (error: any) {
    console.error("Contact API Handler Failure:", error?.message || error)
    res.statusCode = 500
    res.setHeader("Content-Type", "application/json")
    res.end(
      JSON.stringify({
        ok: false,
        error: "Failed to process inquiry. Please try again or email info@epocxinnovations.in.",
      }),
    )
  }
}

