import { useEffect, useState } from "react"
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  useParams,
} from "react-router"
import logoImage from "@/imports/logo.webp"
import heroArtwork from "@/assets/Futuristic Golden Neural Orbit Sculpture.png"
import {
  HeroHeading,
  HeroButtons,
  GoldDust,
  NeuralNetworkBackground,
} from "./hero-motion";
import {
  PageFadeIn,
  AnimatedLogoText,
  StaggerContainer,
  StaggerItem,
  ProcessTimeline,
  MagneticButton,
  CountUp,
  ParallaxMountain,
} from "./site-motion";
type IconName = "code" | "agent" | "model" | "spark" | "flow" | "software" | "arrow" | "check" | "menu" | "close"

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    code: (
      <>
        <path d="m8 9-4 3 4 3" />
        <path d="m16 9 4 3-4 3" />
        <path d="m14 5-4 14" />
      </>
    ),
    agent: (
      <>
        <rect x="5" y="7" width="14" height="11" rx="3" />
        <path d="M12 3v4M8 12h.01M16 12h.01M9 15h6" />
      </>
    ),
    model: (
      <>
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="7" r="2" />
        <circle cx="8" cy="18" r="2" />
        <circle cx="17" cy="17" r="2" />
        <path d="m8 7 8 0M7 8l1 8M17 9v6M10 17h5" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3-1.2 4.2L7 9l3.8 1.8L12 15l1.2-4.2L17 9l-3.8-1.8L12 3Z" />
        <path d="m5 15-.6 2.1L2.5 18l1.9.9L5 21l.6-2.1 1.9-.9-1.9-.9L5 15Z" />
        <path d="m19 13-.6 2.1-1.9.9 1.9.9L19 19l.6-2.1 1.9-.9-1.9-.9L19 13Z" />
      </>
    ),
    flow: (
      <>
        <rect x="3" y="4" width="6" height="5" rx="1" />
        <rect x="15" y="15" width="6" height="5" rx="1" />
        <path d="M9 6.5h4a4 4 0 0 1 4 4V15M15 17.5h-4a4 4 0 0 1-4-4V9" />
      </>
    ),
    software: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M7 6.5h.01M10 6.5h.01M8 14h3M8 17h8" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14M14 7l5 5-5 5" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    menu: (
      <>
        <path d="M4 8h16M4 16h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
function Logo({
  inverse = false,
  tileless = true,
}: {
  inverse?: boolean
  tileless?: boolean
}) {
  return (
    <a
      className={`logo ${inverse ? "logo-inverse" : ""}`}
      href="/#home"
      aria-label="Epocx Innovation home"
    >
      <span
        className={inverse ? "logo-mark" : ""}
        style={
          !inverse
            ? {
                width: 36,
                height: 36,
                padding: 0,
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                background: "transparent",
                border: "none",
                borderRadius: 0,
              }
            : undefined
        }
      >
        {inverse ? (
          <span />
        ) : (
          <img
            src={logoImage}
            alt="Epocx Innovation logo"
            width={120}
            height={33}
            decoding="async"
            style={{
              width: "auto",
              height: 33,
              marginLeft: 0,
              objectFit: "cover",
              borderRadius: 0,
            }}
          />
        )}
      </span>
      <AnimatedLogoText inverse={inverse} />
    </a>
  )
}
function ArrowLink({
  children,
  href = "#",
}: {
  children: React.ReactNode
  href?: string
}) {
  return (
    <a className="arrow-link" href={href}>
      {children}
      <Icon name="arrow" size={17} />
    </a>
  )
}

const services = [
  {
    icon: "code",
    title: "Web Application Development",
    text: "Responsive, secure, and scalable web applications built for lasting performance.",
    technologies: [
      ["UI design", "Figma"],
      ["Frontend", "React + TypeScript"],
      ["Styling", "Tailwind CSS"],
      ["Backend", "Python + FastAPI"],
      ["Database", "PostgreSQL"],
      ["AI models", "OpenAI API / Amazon Bedrock"],
      ["AI framework", "LangChain / LangGraph"],
      ["Authentication", "Auth.js or managed authentication"],
      ["Deployment", "Vercel + AWS"],
      ["Version control", "Git + GitHub"],
    ],
  },
  {
    icon: "agent",
    title: "AI Agent Development",
    text: "Intelligent agents that automate tasks, decisions, and complex workflows.",
    technologies: [
      ["Language", "Python"],
      ["LLM", "OpenAI API or Amazon Bedrock"],
      ["Agent workflow", "LangGraph"],
      ["Tool integration", "Python functions and APIs"],
      ["Backend", "FastAPI"],
      ["RAG", "LangChain + embeddings + FAISS"],
      ["Database", "PostgreSQL"],
      ["Frontend", "React + Tailwind CSS"],
      ["Deployment", "AWS"],
      ["Monitoring", "Logs, tracing, and evaluation"],
    ],
  },
  {
    icon: "model",
    title: "Custom AI Models",
    text: "Machine learning and deep learning solutions shaped around your data.",
    technologies: [
      ["Language", "Python"],
      ["Data processing", "Pandas + NumPy"],
      ["Machine learning", "Scikit-learn"],
      ["Deep learning", "PyTorch"],
      ["Model API", "FastAPI"],
      ["Frontend", "React + Tailwind CSS"],
      ["Database", "PostgreSQL"],
      ["Infrastructure", "Docker + AWS"],
    ],
  },
  {
    icon: "spark",
    title: "Generative AI",
    text: "Practical LLM applications, RAG systems, and purposeful chatbots.",
    technologies: [
      ["Language", "Python + TypeScript"],
      ["LLM", "OpenAI API / Amazon Bedrock"],
      ["AI framework", "LangChain + LangGraph"],
      ["RAG", "Embeddings + vector search"],
      ["Backend", "FastAPI"],
      ["Frontend", "React + Tailwind CSS"],
      ["Database", "PostgreSQL + pgvector"],
      ["Evaluation", "Tracing + quality evaluation"],
      ["Deployment", "AWS + Vercel"],
    ],
  },
  {
    icon: "flow",
    title: "Workflow Automation",
    text: "Streamlined business processes and integrations that reduce manual work.",
    technologies: [
      ["Automation", "Python workflows"],
      ["Orchestration", "LangGraph / event queues"],
      ["Integrations", "REST APIs + webhooks"],
      ["Backend", "FastAPI"],
      ["Database", "PostgreSQL"],
      ["Frontend", "React + TypeScript"],
      ["Infrastructure", "Docker"],
      ["Deployment", "AWS"],
      ["Monitoring", "Logs + alerts + tracing"],
    ],
  },
  {
    icon: "software",
    title: "Custom Software",
    text: "Reliable, considered software tailored to how your business operates.",
    technologies: [
      ["Product design", "Figma"],
      ["Frontend", "React + TypeScript"],
      ["Styling", "Tailwind CSS"],
      ["Backend", "Node.js or FastAPI"],
      ["Database", "PostgreSQL / MongoDB"],
      ["Authentication", "Auth.js or managed authentication"],
      ["Testing", "Automated unit + integration tests"],
      ["Infrastructure", "Docker"],
      ["Deployment", "AWS + Vercel"],
      ["Version control", "Git + GitHub"],
    ],
  },
] as const

function serviceSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function DashboardMockup() {
  return (
    <div
      className="dashboard-wrap"
      aria-label="Analytics software dashboard preview"
    >
      <div className="float-card float-top">
        <span className="status-dot" /> Systems operational
      </div>
      <div className="dashboard">
        <div className="dash-top">
          <div className="dash-logo">E</div>
          <span>Insight</span>
          <div className="dash-search">Search data...</div>
          <div className="avatar">AK</div>
        </div>
        <div className="dash-body">
          <aside>
            {["Overview", "Intelligence", "Workflows", "Data sources"].map(
              (item, i) => (
                <div className={i === 0 ? "active" : ""} key={item}>
                  <i />
                  {item}
                </div>
              ),
            )}
          </aside>
          <div className="dash-main">
            <div className="dash-heading">
              <div>
                <small>WORKSPACE</small>
                <strong>Business overview</strong>
              </div>
              <button>Export report</button>
            </div>
            <div className="metric-row">
              <div>
                <small>Tasks automated</small>
                <strong>2,480</strong>
                <em>↗ 12.4%</em>
              </div>
              <div>
                <small>Time recovered</small>
                <strong>384h</strong>
                <em>↗ 8.1%</em>
              </div>
              <div>
                <small>Success rate</small>
                <strong>98.7%</strong>
                <em>Stable</em>
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-title">
                <span>Workflow performance</span>
                <small>Last 6 months</small>
              </div>
              <div className="chart">
                {[34, 48, 42, 66, 58, 82, 71, 93].map((height, i) => (
                  <i key={i} style={{ height: `${height}%` }} />
                ))}
              </div>
              <div className="chart-labels">
                <span>JAN</span>
                <span>FEB</span>
                <span>MAR</span>
                <span>APR</span>
                <span>MAY</span>
                <span>JUN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="float-card float-bottom">
        <b>+24%</b>
        <span>Efficiency gain</span>
      </div>
    </div>
  )
}

function ProjectVisual({ type }: { type: number }) {
  if (type === 0)
    return (
      <div className="project-ui agent-ui">
        <div className="ui-side">
          <div className="ui-logo">E</div>
          {[1, 2, 3, 4].map((n) => (
            <i key={n} />
          ))}
        </div>
        <div className="chat-panel">
          <small>AI WORKSPACE</small>
          <strong>Research assistant</strong>
          <div className="chat-line muted" />
          <div className="chat-bubble">
            Summarize the latest documents and identify action items.
          </div>
          <div className="thinking">
            <span />
            <span />
            <span />
          </div>
          <div className="sources">
            <b>4 sources reviewed</b>
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="tool-panel">
          <small>ACTIVE TOOLS</small>
          <div>
            Document search <span>On</span>
          </div>
          <div>
            Knowledge base <span>On</span>
          </div>
          <div>
            Web research <span>On</span>
          </div>
        </div>
      </div>
    )
  if (type === 1)
    return (
      <div className="project-ui workflow-ui">
        <div className="workflow-top">
          <span>Customer onboarding</span>
          <b>Live</b>
        </div>
        <div className="workflow-canvas">
          <div className="flow-node n1">
            <i>01</i>
            <span>
              <small>TRIGGER</small>Form submitted
            </span>
          </div>
          <div className="flow-node n2">
            <i>02</i>
            <span>
              <small>ACTION</small>Validate data
            </span>
          </div>
          <div className="flow-node n3">
            <i>03</i>
            <span>
              <small>AI STEP</small>Classify request
            </span>
          </div>
          <div className="flow-node n4">
            <i>04</i>
            <span>
              <small>OUTPUT</small>Route & notify
            </span>
          </div>
          <svg viewBox="0 0 600 250" preserveAspectRatio="none">
            <path d="M145 70 C220 70 185 170 265 170M345 170 C410 170 380 70 455 70" />
            <path d="M345 170h110" />
          </svg>
        </div>
      </div>
    )
  return (
    <div className="project-ui intelligence-ui">
      <div className="intel-header">
        <span>Model intelligence</span>
        <small>Updated just now</small>
      </div>
      <div className="intel-grid">
        <div className="intel-score">
          <small>MODEL ACCURACY</small>
          <div>
            <strong>
              <CountUp end={94.8} decimals={1} />
            </strong>
            <span>%</span>
          </div>
          <em>+3.2 this cycle</em>
        </div>
        <div className="intel-chart">
          <small>PERFORMANCE</small>
          <svg viewBox="0 0 300 100">
            <path d="M0 88 C40 80 50 55 80 64S130 78 155 45 210 55 235 23 270 30 300 8" />
          </svg>
        </div>
        <div className="intel-list">
          <small>MODEL ACTIVITY</small>
          {["Embedding pipeline", "Classification model", "RAG evaluator"].map(
            (x, i) => (
              <div key={x}>
                <i className={`model-dot d${i}`} />
                <span>{x}</span>
                <b>
                  <CountUp end={[98, 94, 91][i]} />%
                </b>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  )
}

function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <aside className="floating-actions" aria-label="Quick actions">
      <a
        className="fab-btn fab-whatsapp"
        href="https://wa.me/919999999999?text=Hello%20Epocx%20Innovation%2C%20I%20would%20like%20to%20inquire%20about%20your%20services"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Epocx Innovation on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
        </svg>
      </a>

      {showBackToTop && (
        <button
          className="fab-btn fab-back-to-top"
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          title="Back to top"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      )}
    </aside>
  )
}

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formStatus, setFormStatus] =
    useState<"idle" | "sending" | "success" | "error">("idle")
  const closeMenu = () => setMenuOpen(false)
  const handleInquiry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setFormStatus("sending")

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/info@epocxinnovations.in",
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        },
      )

      if (!response.ok) throw new Error("Unable to send inquiry")
      form.reset()
      setFormStatus("success")
    } catch {
      setFormStatus("error")
    }
  }

  return (
    <PageFadeIn>
      <div className="site-shell">
        <header className="navbar">
          <div className="container nav-inner">
            <Logo tileless />
            <nav
              className={menuOpen ? "nav-links open" : "nav-links"}
              aria-label="Main navigation"
            >
              {["Home", "Services", "About", "Projects", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={closeMenu}
                  >
                    {item}
                  </a>
                ),
              )}
              <MagneticButton>
                <a
                  className="button button-small nav-cta"
                  href="#contact"
                  onClick={closeMenu}
                >
                  Let&apos;s Talk <Icon name="arrow" size={16} />
                </a>
              </MagneticButton>
            </nav>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </header>

      <main>
      

<section className="hero hero-new" id="home">
  <div className="hero-grain" aria-hidden="true" />
  <NeuralNetworkBackground />
  <GoldDust />

  <div className="container hero-stage hero-new-stage">
    <div className="hero-new-note" aria-hidden="true">
      SMARTER
      <br />
      TECHNOLOGY.
      <br />
      REAL IMPACT.
      <span />
    </div>
    <div className="hero-grid hero-new-grid">
      <div className="hero-copy hero-new-copy">
        <div className="hero-path">
          <span>IDEAS</span>
          <Icon name="arrow" size={12} />
          <span>AI</span>
          <Icon name="arrow" size={12} />
          <span>AUTOMATION</span>
          <Icon name="arrow" size={12} />
          <span>IMPACT</span>
        </div>

        <HeroHeading
          className="hero-new-title"
       words={[
            { text: "EPOCX" },
            { text: "INNOVATION", className: "hero-lightning-text" },
             ]}
        />

        <h2>
          We develop AI, ML, and automation solutions and software
          applications.
        </h2>

        <p className="hero-new-description">
          Turning ideas into intelligent, scalable and real-world
          solutions.
        </p>

        <HeroButtons
          className="hero-actions hero-new-actions"
          wordCount={2}
        >
          <MagneticButton>
            <a className="button hero-pill" href="#contact">
              Get Started <Icon name="arrow" size={15} />
            </a>
          </MagneticButton>

          <a
            className="button button-outline hero-pill"
            href="#projects"
          >
            Explore Our Work
          </a>
        </HeroButtons>
      </div>

      <div className="hero-art hero-new-art">
        <div className="hero-sculpture-wrap">
          <div className="hero-sculpture-glow" aria-hidden="true" />
          <div className="hero-sculpture-light" aria-hidden="true" />
          <div className="hero-sculpture-shadow" aria-hidden="true" />
          <img
            src={heroArtwork}
            alt="Golden glass sphere containing an AI neural network brain, surrounded by orbiting rings"
            width={1984}
            height={793}
            fetchPriority="high"
            decoding="async"
            className="hero-sculpture-img"
          />
        </div>
      </div>
    </div>

    <div className="hero-tech-rail" aria-label="Core technologies">
      <div className="hero-tech-track">
        {[
          { name: "React", logo: "/logos/react.svg" },
          { name: "Python", logo: "/logos/python.svg" },
          { name: "PyTorch", logo: "/logos/pytorch.svg" },
          { name: "TensorFlow", logo: "/logos/tensorflow.svg" },
          { name: "Scikit-learn", logo: "/logos/scikitlearn.svg" },
          { name: "FastAPI", logo: "/logos/fastapi.svg" },
          { name: "PostgreSQL", logo: "/logos/postgresql.svg" },
          { name: "AWS", logo: "/logos/aws.svg" },
          { name: "Flask", logo: "/logos/flask.svg" },
          { name: "Power BI", logo: "/logos/powerbi.svg" },
        ].map((tech) => (
          <span className="tech-item" key={`orig-${tech.name}`}>
            <img
              src={tech.logo}
              alt={tech.name}
              width={22}
              height={22}
              loading="lazy"
              decoding="async"
            />
            {tech.name}
          </span>
        ))}
        {[
          { name: "React", logo: "/logos/react.svg" },
          { name: "Python", logo: "/logos/python.svg" },
          { name: "PyTorch", logo: "/logos/pytorch.svg" },
          { name: "TensorFlow", logo: "/logos/tensorflow.svg" },
          { name: "Scikit-learn", logo: "/logos/scikitlearn.svg" },
          { name: "FastAPI", logo: "/logos/fastapi.svg" },
          { name: "PostgreSQL", logo: "/logos/postgresql.svg" },
          { name: "AWS", logo: "/logos/aws.svg" },
          { name: "Flask", logo: "/logos/flask.svg" },
          { name: "Power BI", logo: "/logos/powerbi.svg" },
        ].map((tech) => (
          <span
            className="tech-item"
            key={`dup-${tech.name}`}
            aria-hidden="true"
          >
            <img
              src={tech.logo}
              alt={tech.name}
              width={22}
              height={22}
              loading="lazy"
              decoding="async"
            />
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  </div>
</section>



        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <div className="eyebrow">WHAT WE DO</div>
                <h2>
                  Solutions Built Around
                  <br />
                  Your Business
                </h2>
              </div>
              <p>
                From concept to deployment, we design and engineer technology
                that addresses the work that matters most.
              </p>
            </div>
            <StaggerContainer className="services-grid" stagger={0.12}>
              {services.map((service, index) => (
                <StaggerItem key={service.title}>
                  <article className="service-card">
                    <div className="service-top">
                      <span className="service-icon">
                        <Icon name={service.icon} />
                      </span>
                      <small>0{index + 1}</small>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <Link
                      className="arrow-link"
                      to={`/services/${serviceSlug(service.title)}`}
                    >
                      Learn More <Icon name="arrow" size={17} />
                    </Link>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section className="section about-section" id="about">
          <ParallaxMountain />
          <div className="container about-grid">
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=tinysrgb&fit=crop&fm=webp&q=80&w=1200"
                alt="Software team collaborating in a bright workspace"
                loading="lazy"
                decoding="async"
                width={700}
                height={590}
              />
              <div className="image-caption">
                <span>01</span>
                <p>
                  Thoughtful collaboration.
                  <br />
                  Measurable outcomes.
                </p>
              </div>
            </div>
            <div className="about-copy">
              <div className="eyebrow">HOW WE THINK</div>
              <h2>Good Technology Starts With Understanding the Problem.</h2>
              <p className="lead">
                Epocx Innovation combines rigorous software engineering with
                applied AI to solve meaningful business challenges—without
                adding unnecessary complexity.
              </p>
              <div className="principles">
                {[
                  [
                    "Business-First Thinking",
                    "We begin with your goals, users, and operations—not a predetermined technology.",
                  ],
                  [
                    "Purposeful Innovation",
                    "We apply emerging tools only where they create clear, lasting value.",
                  ],
                  [
                    "Scalable Engineering",
                    "We build maintainable systems designed to evolve as your business grows.",
                  ],
                ].map(([title, text], i) => (
                  <div key={title}>
                    <span>0{i + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="impact-stats-row">
                <div className="impact-stat-item">
                  <strong className="stat-gradient">
                    <CountUp end={50} suffix="+" />
                  </strong>
                  <p>Enterprise Projects</p>
                </div>
                <div className="impact-stat-item">
                  <strong className="stat-gradient">
                    <CountUp end={10} suffix="+" />
                  </strong>
                  <p>Custom AI Solutions</p>
                </div>
                <div className="impact-stat-item">
                  <strong className="stat-gradient">
                    <CountUp end={100} suffix="%" />
                  </strong>
                  <p>Client Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section process-section">
          <div className="container">
            <div className="section-heading centered">
              <div className="eyebrow">OUR PROCESS</div>
              <h2>From Idea to Delivery.</h2>
              <p>
                A clear, collaborative path from the first conversation to a
                product ready for the real world.
              </p>
            </div>
            <ProcessTimeline
              steps={[
                [
                  "Discover",
                  "We clarify the challenge, users, and business outcome.",
                ],
                [
                  "Design",
                  "We shape the experience, architecture, and delivery plan.",
                ],
                [
                  "Develop",
                  "We build in focused cycles with regular, visible progress.",
                ],
                [
                  "Deliver",
                  "We launch, document, and support what comes next.",
                ],
              ]}
            />
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <div className="eyebrow">SELECTED WORK</div>
                <h2>
                  Ideas, Engineered
                  <br />
                  Into Solutions.
                </h2>
              </div>
              <p>
                Selected concepts showing how we turn complex technology into
                clear, useful, and dependable products.
              </p>
            </div>
            <StaggerContainer className="projects-list" stagger={0.12}>
              {[
                [
                  "Agentic AI Assistant",
                  "RAG, AI agents, and integrated tools working together in one focused workspace.",
                  ["React", "LangGraph", "RAG"],
                ],
                [
                  "Intelligent Workflow Automation",
                  "A visual automation system that simplifies complex business processes.",
                  ["FastAPI", "Python", "PostgreSQL"],
                ],
                [
                  "AI Intelligence Platform",
                  "A unified environment for machine learning insights and Generative AI.",
                  ["PyTorch", "React", "AWS"],
                ],
              ].map(([title, desc, tags], i) => (
                <StaggerItem key={title as string}>
                  <article
                    className={`project-row project-${i}`}
                  >
                    <div className="project-info">
                      <span>0{i + 1}</span>
                      <h3>{title as string}</h3>
                      <p>{desc as string}</p>
                      <div className="tags">
                        {(tags as string[]).map((tag) => (
                          <small key={tag}>{tag}</small>
                        ))}
                      </div>
                      <ArrowLink>View Project</ArrowLink>
                    </div>
                    <ProjectVisual type={i} />
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section className="cta-section">
          <div className="container cta-inner">
            <div>
              <div className="eyebrow light">HAVE A PROJECT IN MIND?</div>
              <h2>
                Let&apos;s Build Something
                <br />
                That Matters.
              </h2>
            </div>
            <div>
              <p>
                Tell us about your idea, and let&apos;s explore the right
                solution.
              </p>
              <MagneticButton>
                <a className="button button-light" href="#contact">
                  Start a Conversation <Icon name="arrow" size={17} />
                </a>
              </MagneticButton>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy">
              <div className="eyebrow">START A CONVERSATION</div>
              <h2>What are you looking to build?</h2>
              <p>
                Share a little about your goals. We&apos;ll get back to you with
                thoughtful questions and a clear next step.
              </p>
              <div className="contact-details">
                <div>
                  <small>EMAIL</small>
                  <a href="mailto:info@epocxinnovations.in">
                    info@epocxinnovations.in
                  </a>
                </div>
                <div>
                  <small>LOCATION</small>
                  <span>Tamil Nadu , India</span>
                </div>
                <div>
                  <small>SOCIAL</small>
                  <span>
                    <a href="#">LinkedIn</a> |{" "}
                    <a href="https://github.com/EpocxInnovations">GitHub</a>
                  </span>
                </div>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleInquiry}>
              <input
                type="hidden"
                name="_subject"
                value="New inquiry from the Epocx Innovation website"
              />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <div className="form-row">
                <label>
                  Full Name
                  <input
                    type="text"
                    name="Full Name"
                    placeholder="Jane Smith"
                    required
                  />
                </label>
                <label>
                  Work Email
                  <input
                    type="email"
                    name="Work Email"
                    placeholder="jane@company.com"
                    required
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Company
                  <input
                    type="text"
                    name="Company"
                    placeholder="Company name"
                  />
                </label>
                <label>
                  Service Required
                  <select name="Service Required" defaultValue="" required>
                    <option value="" disabled>
                      Select a service
                    </option>
                    {services.map((s) => (
                      <option key={s.title}>{s.title}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                Project Details
                <textarea
                  name="Project Details"
                  rows={5}
                  placeholder="Tell us about the challenge, goals, or idea you have in mind..."
                  required
                />
              </label>
              <MagneticButton>
                <button
                  className="button submit-button"
                  type="submit"
                  disabled={formStatus === "sending"}
                >
                  {formStatus === "sending" ? "Sending..." : "Send Inquiry"}{" "}
                  {formStatus !== "sending" && <Icon name="arrow" size={17} />}
                </button>
              </MagneticButton>
              {formStatus === "success" && (
                <p className="form-status success" role="status">
                  Thank you. Your inquiry has been sent successfully.
                </p>
              )}
              {formStatus === "error" && (
                <p className="form-status error" role="alert">
                  Your inquiry could not be sent. Please try again or email us
                  directly.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <Logo inverse />
              <p>
                Engineering purposeful digital products and intelligent systems
                for ambitious businesses.
              </p>
            </div>
            <div>
              <h4>Navigate</h4>
              {["Home", "Services", "About", "Projects", "Contact"].map((x) => (
                <a key={x} href={`#${x.toLowerCase()}`}>
                  {x}
                </a>
              ))}
            </div>
            <div>
              <h4>Services</h4>
              {[
                "Web Development",
                "AI Agents",
                "Generative AI",
                "Automation",
                "Custom Software",
              ].map((x) => (
                <a key={x} href="#services">
                  {x}
                </a>
              ))}
            </div>
            <div>
              <h4>Contact</h4>
              <a href="mailto:info@epocxinnovations.in">
                info@epocxinnovations.in
              </a>
              <span> Tamil Nadu, India</span>
              <div className="footer-social">
                <a href="#">LinkedIn</a>
                <a href="https://github.com/EpocxInnovations">GitHub</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Epocx Innovation. All rights
              reserved.
            </span>
            <div>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      <FloatingActions />
    </div>
    </PageFadeIn>
  )
}

function ServiceTechnologyPage() {
  const { serviceSlug: currentSlug } = useParams()
  const service = services.find(
    (item) => serviceSlug(item.title) === currentSlug,
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentSlug])

  if (!service) {
    return (
      <main className="service-not-found">
        <div>
          <div className="eyebrow">SERVICE NOT FOUND</div>
          <h1>We couldn&apos;t find that service.</h1>
          <Link className="button" to="/#services">
            Return to Services
          </Link>
        </div>
      </main>
    )
  }

  return (
    <PageFadeIn>
      <div className="site-shell service-page">
        <header className="navbar">
        <div className="container nav-inner">
          <Logo />
          <nav
            className="service-page-nav"
            aria-label="Service page navigation"
          >
            <a href="/#services">All Services</a>
            <a className="button button-small" href="/#contact">
              Let&apos;s Talk <Icon name="arrow" size={16} />
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="service-detail-hero">
          <div className="container service-detail-hero-grid">
            <div>
              <a className="back-link" href="/#services">
                <span>←</span> Back to services
              </a>
              <div className="eyebrow">
                <span />
                OUR CAPABILITIES
              </div>
              <h1>{service.title}</h1>
              <p>
                {service.text} We select each part of the stack for
                maintainability, performance, and a clear fit with your business
                requirements.
              </p>
            </div>
            <div className="service-detail-mark">
              <span>0{services.indexOf(service) + 1}</span>
              <div>
                <Icon name={service.icon} size={48} />
              </div>
            </div>
          </div>
        </section>

        <section className="service-stack-section">
          <div className="container service-stack-grid">
            <div className="stack-intro">
              <div className="eyebrow">TECHNOLOGY USED</div>
              <h2>A considered stack for reliable delivery.</h2>
              <p>
                These are our recommended foundations. The final architecture is
                always adapted to your existing systems, security needs, team,
                and product goals.
              </p>
            </div>
            <div className="stack-table">
              <div className="stack-table-head">
                <span>Layer / Component</span>
                <span>Technology</span>
              </div>
              {service.technologies.map(([layer, technology], index) => (
                <div className="stack-table-row" key={layer}>
                  <span>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    {layer}
                  </span>
                  <strong>{technology}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="service-detail-cta">
          <div className="container">
            <div>
              <div className="eyebrow light">BUILD WITH PURPOSE</div>
              <h2>Have a {service.title.toLowerCase()} project in mind?</h2>
            </div>
            <MagneticButton>
              <a className="button button-light" href="/#contact">
                Discuss Your Project <Icon name="arrow" size={17} />
              </a>
            </MagneticButton>
          </div>
        </section>
      </main>

      <footer className="service-footer">
        <div className="container">
          <Logo inverse />
          <span>
            © {new Date().getFullYear()} Epocx Innovation. All rights reserved.
          </span>
        </div>
      </footer>
      <FloatingActions />
    </div>
    </PageFadeIn>
  )
}

const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "/services/:serviceSlug", Component: ServiceTechnologyPage },
  { path: "*", Component: HomePage },
])

export default function App() {
  return <RouterProvider router={router} />
}
