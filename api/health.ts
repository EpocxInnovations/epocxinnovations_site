import type { IncomingMessage, ServerResponse } from "node:http"

export default function handler(req: IncomingMessage, res: ServerResponse) {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate")
  res.end(JSON.stringify({ status: "ok", timestamp: Date.now() }))
}

