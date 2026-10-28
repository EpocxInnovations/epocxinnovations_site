import { useEffect, useState, useRef } from "react"
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  useNavigate,
  useLocation,
  useParams,
} from "react-router"
import logoImage from "@/imports/logo.webp"
import heroArtwork from "@/assets/Futuristic Golden Neural Orbit Sculpture.png"
import agroguardScreens from "@/assets/agroguard-screens.png"
import agroguardPlantPhoto from "@/assets/agroguard-plant-photo.png"
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

const WHATSAPP_NUMBER = "918667540547" // +91 866 754 0547

function openWhatsApp({ name, email, service, details }: { name: string; email: string; service: string; details: string }) {
  const lines = ["Hi Epocx Innovation, I'd like to discuss a project."]
  if (name) lines.push(`Name: ${name}`)
  if (email) lines.push(`Email: ${email}`)
  if (service) lines.push(`Service: ${service}`)
  if (details) lines.push(`Details: ${details}`)
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`
  window.open(url, "_blank", "noopener,noreferrer")
}

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
  href,
  to,
}: {
  children: React.ReactNode
  href?: string
  to?: string
}) {
  if (to) {
    return (
      <Link className="arrow-link" to={to}>
        {children}
        <Icon name="arrow" size={17} />
      </Link>
    )
  }
  return (
    <a className="arrow-link" href={href || "#"}>
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

export interface ProjectItem {
  slug: string
  title: string
  category: string
  shortDesc: string
  tags: string[]
  clientOrDomain: string
  year: string
  metrics: { value: string; label: string; suffix?: string }[]
  overview: string
  problem: string
  solution: string
  features: { title: string; desc: string }[]
  technologies: [string, string][]
  visualType: number
  showcaseImage?: string
}

const projects: ProjectItem[] = [
  {
    slug: "e-commerce",
    title: "AI-Powered E-Commerce Platform",
    category: "Intelligent Retail & Commerce",
    shortDesc:
      "Modern headless commerce engine featuring personalized recommendations, dynamic pricing intelligence, and seamless real-time checkout flows.",
    tags: ["Next.js", "FastAPI", "Stripe", "PostgreSQL", "Redis", "TypeScript"],
    clientOrDomain: "Enterprise Retail & D2C Brands",
    year: "2025",
    metrics: [
      { value: "42.8", suffix: "%", label: "Cart Conversion Increase" },
      { value: "110", suffix: "ms", label: "P99 Edge Latency" },
      { value: "99.99", suffix: "%", label: "Checkout Reliability" },
      { value: "2.4", suffix: "M+", label: "Monthly Orders Processed" },
    ],
    overview:
      "A composable, ultra-fast commerce platform built to maximize conversion and streamline multi-channel operations. Powered by edge-rendered storefronts and vector recommendation pipelines, the system dynamically curates product offerings and optimizes cart checkout in milliseconds.",
    problem:
      "Legacy e-commerce monolithic architectures face crippling bottlenecks during peak flash sales, elevated cart abandonment rates due to sluggish page transitions, and generic recommendation carousels that fail to match real-time shopper intent.",
    solution:
      "We engineered a distributed, headless microservices architecture combining Next.js SSR/ISR at the edge with FastAPI backend services. Real-time vector embeddings deliver hyper-personalized suggestions, while an event-driven inventory engine powered by Redis ensures accurate stock synchronization across fulfillment hubs.",
    features: [
      {
        title: "Sub-Second Edge Storefront",
        desc: "Optimized server-side and edge-rendered catalog pages yielding near-instant First Contentful Paint (FCP) and elevated search rankings.",
      },
      {
        title: "Real-Time AI Recommendations",
        desc: "In-session vector search and collaborative filtering algorithms adapting suggestions to live browsing behaviors in under 40ms.",
      },
      {
        title: "Algorithmic Dynamic Pricing",
        desc: "Automated margin and pricing optimization reacting to inventory velocity, demand shifts, and competitive market data.",
      },
      {
        title: "Global Multi-Currency Checkout",
        desc: "Fully compliant, one-click checkout flows utilizing Stripe Elements, localized taxes, and automated anti-fraud screening.",
      },
    ],
    technologies: [
      ["Storefront UI", "Next.js 14 + React + Tailwind CSS"],
      ["Client State & Cache", "Zustand + TanStack Query"],
      ["Microservices Backend", "FastAPI + Python"],
      ["Primary Database", "PostgreSQL + Prisma ORM"],
      ["Vector Search Engine", "Qdrant / pgvector"],
      ["Caching & Rate Limits", "Redis Sentinel"],
      ["Payment Processing", "Stripe Connect + Webhooks"],
      ["Event Streaming", "Apache Kafka + Redis Streams"],
      ["Edge & Cloud Infra", "Cloudflare Edge + AWS ECS"],
    ],
    visualType: 0,
  },
  {
    slug: "protein-structure-prediction",
    title: "AI Protein Structure Prediction",
    category: "Bioinformatics & Structural Biology",
    shortDesc:
      "Deep learning platform predicting 3D macromolecular structures and folding trajectories from amino acid sequences with atomic precision.",
    tags: ["PyTorch", "AlphaFold", "BioPython", "FastAPI", "WebGL", "Docker"],
    clientOrDomain: "Biotech & Computational Pharmacology",
    year: "2025",
    metrics: [
      { value: "92.4", suffix: "%", label: "Global pLDDT Accuracy" },
      { value: "1.12", suffix: " Å", label: "Backbone RMSD vs Cryo-EM" },
      { value: "120", suffix: "x", label: "Speedup vs Traditional CASP" },
      { value: "50", suffix: "k+", label: "Target Structures Modeled" },
    ],
    overview:
      "A next-generation computational structural biology pipeline engineered to accelerate drug discovery and synthetic biology research. By combining evolutionary multiple sequence alignments (MSAs) with spatial coordinate invariant transformers, the platform generates 3D atomic coordinates directly from raw sequence fasta files.",
    problem:
      "Experimental structural determination methods such as X-ray crystallography and Cryo-EM are expensive, labor-intensive, and can take months to resolve a single macromolecule, severely throttling early-stage therapeutic research and enzyme engineering.",
    solution:
      "We built a GPU-accelerated deep learning platform utilizing geometric neural networks and evoformer architectures. The platform integrates end-to-end multiple sequence alignment retrieval, residue contact map calculation, and automated PDB generation with real-time interactive 3D WebGL inspection.",
    features: [
      {
        title: "Attention-Driven Coordinate Reconstruction",
        desc: "Invariant point attention layers mapping non-local evolutionary constraints into rigid 3D spatial backbone transformations.",
      },
      {
        title: "Per-Residue Confidence Profiling",
        desc: "Continuous pLDDT and Predicted Aligned Error (PAE) matrices giving researchers fine-grained confidence across domain regions.",
      },
      {
        title: "Interactive WebGL Molecular Explorer",
        desc: "Hardware-accelerated rendering of cartoon ribbons, hydrophobic surfaces, hydrogen bonding, and binding pocket cavities.",
      },
      {
        title: "High-Throughput Batch Inference",
        desc: "Distributed worker pools deployed on GPU clusters to batch-fold entire proteomes and genomic sequences on demand.",
      },
    ],
    technologies: [
      ["Deep Learning Engine", "PyTorch + PyTorch Geometric"],
      ["Model Architecture", "Evoformer + Invariant Point Attention"],
      ["Bioinformatics Stack", "BioPython + MMseqs2 + HH-suite"],
      ["Inference API", "FastAPI + Celery + Redis"],
      ["3D Visualization", "Three.js + Mol* WebGL Viewer"],
      ["Coordinate Storage", "PostgreSQL + MinIO S3 (PDB / CIF)"],
      ["Hardware Acceleration", "NVIDIA TensorRT + CUDA 12"],
      ["Infrastructure", "Kubernetes GPU Nodes (NVIDIA A100)"],
      ["Validation Suite", "CASP Benchmarks + PDB Validation Tools"],
    ],
    visualType: 1,
  },
  {
    slug: "skin-disease-prediction",
    title: "Skin Disease Prediction & Diagnostics",
    category: "Medical AI & Clinical Computer Vision",
    shortDesc:
      "Clinical-grade computer vision system analyzing dermatoscopic imagery to detect, segment, and classify cutaneous lesions with high diagnostic sensitivity.",
    tags: ["PyTorch", "Vision Transformer", "OpenCV", "FastAPI", "Medical AI", "DICOM"],
    clientOrDomain: "Digital Dermatology & Clinical Triage",
    year: "2025",
    metrics: [
      { value: "96.8", suffix: "%", label: "Melanoma Diagnostic Sensitivity" },
      { value: "94.6", suffix: "%", label: "Multi-Class Clinical Accuracy" },
      { value: "0.85", suffix: "s", label: "Inference & Segmentation Time" },
      { value: "25", suffix: "k+", label: "Verified Dermoscopic Cases" },
    ],
    overview:
      "A clinician-assistive artificial intelligence platform developed for early skin cancer screening and dermatological risk stratification. Integrating multi-scale vision transformers with automated lesion boundary segmentation, the system provides transparent diagnostic probabilities backed by clinical ABCDE evaluation metrics.",
    problem:
      "Early detection of malignant melanoma is paramount for clinical survival, yet access to specialized dermatologists is severely restricted globally, leading to diagnostic delays, unnecessary invasive biopsies, and elevated healthcare costs.",
    solution:
      "We engineered an end-to-end clinical vision pipeline featuring automated hair removal filtering, U-Net lesion segmentation, and an ensemble Vision Transformer (ViT) trained on diverse clinical datasets. The system generates calibrated risk classifications, Grad-CAM saliency heatmaps, and structured clinical triage reports in under one second.",
    features: [
      {
        title: "Sub-Pixel Lesion Boundary Segmentation",
        desc: "Automated contour delineation isolating lesion borders from healthy surrounding tissue and skin artifacts.",
      },
      {
        title: "Differential Multi-Class Diagnosis",
        desc: "Accurate stratification across Melanoma, Melanocytic Nevus, Basal Cell Carcinoma, Actinic Keratosis, and Benign Keratosis.",
      },
      {
        title: "Automated ABCDE Clinical Scoring",
        desc: "Quantitative computational assessment of Asymmetry, Border irregularity, Color variegation, and Diameter metrics.",
      },
      {
        title: "Explainable Saliency Heatmaps",
        desc: "Grad-CAM visual attribution maps highlighting the specific morphological features informing the model's prediction.",
      },
    ],
    technologies: [
      ["Vision AI Framework", "PyTorch + Torchvision"],
      ["Neural Architectures", "Swin Transformer + EfficientNet-V2"],
      ["Segmentation Pipeline", "TransUNet + OpenCV Morphology"],
      ["Inference Server", "FastAPI + ONNX Runtime (GPU-Optimized)"],
      ["Medical Imaging Standards", "DICOM Format Processing + HL7 FHIR"],
      ["Compliance & Security", "HIPAA-Compliant Encrypted Storage"],
      ["Web Interface", "React + Canvas 2D Diagnostic Overlays"],
      ["Model Monitoring", "Evidently AI (Data Drift Detection)"],
      ["Clinical Validation", "ISIC Archive + Hospital Dermoscopy Datasets"],
    ],
    visualType: 2,
  },
  {
    slug: "agroguard-ai",
    title: "AgroGuard AI — Crop Disease & Dynamic Advisory",
    category: "Smart Agriculture & Applied Computer Vision",
    shortDesc:
      "Deep learning banana crop pathology diagnostic platform combining ConvNeXt vision, Google Gemini dynamic advisory, and multilingual voice assistance.",
    tags: ["PyTorch", "ConvNeXt Small", "FastAPI", "Gemini 2.5 Flash", "OpenAI Whisper", "PostgreSQL", "React"],
    clientOrDomain: "Horticultural Research & Smart Agriculture (ICAR-NRCB)",
    year: "2025",
    metrics: [
      { value: "99.78", suffix: "%", label: "Multi-Class Validation Accuracy" },
      { value: "15", suffix: "ms", label: "Thumbnail Retrieval Latency" },
      { value: "6", suffix: "", label: "Supported Indian Languages" },
      { value: "68", suffix: "%", label: "Client Bundle Size Reduction" },
    ],
    overview:
      "A comprehensive intelligent agricultural diagnostic platform engineered to protect staple banana crops from destructive fungal, viral, and insect pests. Integrating a fine-tuned ConvNeXt Small neural network with Google Gemini 2.5 Flash generative advisory and OpenAI Whisper voice transcription, AgroGuard AI delivers actionable diagnostic and treatment protocols aligned with ICAR-NRCB (Trichy) standards directly to smallholder farmers in their native dialect.",
    problem:
      "Banana farming sustains millions of smallholder families, yet suffers catastrophic crop devastation from virulent diseases like Panama Disease (Fusarium Wilt), Black & Yellow Sigatoka, and Pseudostem Weevil. Traditional extension services suffer from multi-day turnaround delays, lack of localized language assistance for non-English literate farmers, and slow, heavy interfaces unsuited for rural connectivity.",
    solution:
      "We engineered an asynchronous microservices platform powered by FastAPI and PyTorch ConvNeXt Small, protected by a 3-stage validation guardrail (MIME validation, OpenCV HSV foliage contours, and confidence thresholding). Model predictions dynamically invoke Google Gemini 2.5 Flash to synthesize context-aware organic and chemical treatment guides in 6 regional languages, complete with OpenAI Whisper voice transcription and Haversine geospatial proximity routing to ICAR extension centers.",
    features: [
      {
        title: "ConvNeXt Small Computer Vision Core",
        desc: "Depthwise separable convolutional backbone delivering 99.78% multi-class validation accuracy across 7 critical banana crop pathologies.",
      },
      {
        title: "ICAR-NRCB Grounded Advisory Engine",
        desc: "Context-aware Gemini 2.5 Flash generation providing 4-tier actionable guidance: disease symptoms, organic controls, precise chemical dosage, and future preventive measures.",
      },
      {
        title: "Multilingual Voice & Speech Processing",
        desc: "OpenAI Whisper speech-to-text and native speech synthesis supporting English, Tamil (தமிழ்), Hindi (हिंदी), Malayalam (മലയാളം), Telugu (తెలుగు), and Kannada (ಕನ್ನಡ).",
      },
      {
        title: "Geospatial Extension Center Locator",
        desc: "Haversine distance algorithms indexing GPS coordinates to connect farmers with the nearest ICAR research stations and Krishi Vigyan Kendras (KVK).",
      },
    ],
    technologies: [
      ["Vision AI Core", "PyTorch + ConvNeXt Small (7-Class Head)"],
      ["Generative Advisory", "Google GenAI SDK (Gemini 2.5 Flash)"],
      ["Voice Processing", "OpenAI Whisper (Multilingual ASR & TTS)"],
      ["Backend Architecture", "FastAPI + Python 3.12 (Async ASGI)"],
      ["Database & ORM", "PostgreSQL + Async SQLAlchemy + asyncpg"],
      ["Input Guardrails", "OpenCV (Leaf Edge Contours & HSV Filter)"],
      ["Geospatial Locator", "Haversine Distance Index (ICAR & KVK)"],
      ["Frontend SPA", "React 18 + TypeScript + Vite 6 + TailwindCSS"],
      ["Performance Stack", "HTML5 Canvas Downsampling (<15ms) + React.memo"],
    ],
    visualType: 3,
    showcaseImage: agroguardScreens,
  },
]

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

function AgroGuardVisual() {
  const [activeTab, setActiveTab] = useState<"screens" | "telemetry">("screens")

  return (
    <div className="project-ui agroguard-ui">
      <div className="agro-topbar">
        <div className="agro-brand-block">
          <div className="agro-avatar">AG</div>
          <div className="agro-title-meta">
            <strong>AgroGuard.ai</strong>
            <span>Crop Disease Detection &amp; Advisory</span>
          </div>
        </div>
        <div className="agro-view-switcher">
          <button
            type="button"
            className={`agro-view-btn ${activeTab === "screens" ? "active" : ""}`}
            onClick={() => setActiveTab("screens")}
          >
            App Screens
          </button>
          <button
            type="button"
            className={`agro-view-btn ${activeTab === "telemetry" ? "active" : ""}`}
            onClick={() => setActiveTab("telemetry")}
          >
            Diagnostics
          </button>
        </div>
        <div className="agro-topbar-pills">
          <div className="agro-status-pill">
            <span className="agro-pulse" />
            <span>ConvNeXt // 99.78% Acc</span>
          </div>
        </div>
      </div>

      {activeTab === "screens" ? (
        <div className="agro-screens-wrap">
          <img
            src={agroguardScreens}
            alt="AgroGuard.ai application interface showing login screen, conversational chatbot assistant, and banana crop disease detection"
            className="agro-screens-img"
          />
          <div className="agro-screens-footer-bar">
            <div className="agro-screen-tag">
              <span>01</span> Farmer Portal
            </div>
            <div className="agro-screen-tag">
              <span>02</span> Multilingual Assistant
            </div>
            <div className="agro-screen-tag active">
              <span>03</span> Panama Wilt Diagnostic
            </div>
          </div>
        </div>
      ) : (
        <div className="agro-content-grid">
          <div className="agro-chat-column">
            <div className="agro-chat-bubble agro-bot-bubble">
              <span>👋 Hello! I&apos;m AgroGuard AI, your crop health assistant. Upload a photo of your plant, and I&apos;ll analyze it for diseases and provide treatment recommendations.</span>
              <span className="agro-chat-time">04:53 pm</span>
            </div>

            <div className="agro-chat-bubble agro-user-bubble">
              <div className="agro-stem-preview">
                <img
                  src={agroguardPlantPhoto}
                  alt="Banana pseudostem cross section showing Fusarium vascular browning"
                  className="agro-stem-real-img"
                />
              </div>
              <span>Please analyze this plant image</span>
              <span className="agro-chat-time">04:54 pm</span>
            </div>

            <div className="agro-analysis-result-card">
              <strong>
                <Icon name="check" size={12} />
                Analysis complete! Detected: Panama Disease (Fusarium Wilt)
              </strong>
              <div className="agro-chip-row">
                <span className="agro-chip high">98.45% Conf</span>
                <span className="agro-chip severe">Severity: Severe</span>
                <span className="agro-chip icar">ICAR-NRCB Guide</span>
              </div>
            </div>

            <div className="agro-input-mockup">
              <span>Describe your plant issue or upload...</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
              <div className="agro-upload-btn-mock">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
                <span>Upload Photo</span>
              </div>
            </div>
          </div>

          <div className="agro-telemetry-column">
            <div className="agro-telemetry-header">
              <small>PRIMARY PATHOLOGY (7-CLASS CONVNEXT)</small>
              <strong>Panama Wilt (Fusarium oxysporum)</strong>
            </div>

            <div className="agro-prob-box">
              <div className="agro-prob-item">
                <div className="agro-prob-label">
                  <span>Banana - Panama Disease (Fusarium)</span>
                  <b><CountUp end={98.45} decimals={2} />%</b>
                </div>
                <div className="agro-prob-track">
                  <div className="agro-prob-fill primary" style={{ width: "98.45%" }} />
                </div>
              </div>

              <div className="agro-prob-item">
                <div className="agro-prob-label">
                  <span>Pseudostem Weevil Infestation</span>
                  <b>0.51%</b>
                </div>
                <div className="agro-prob-track">
                  <div className="agro-prob-fill secondary" style={{ width: "5.1%" }} />
                </div>
              </div>

              <div className="agro-prob-item">
                <div className="agro-prob-label">
                  <span>Banana - Black Sigatoka</span>
                  <b>0.34%</b>
                </div>
                <div className="agro-prob-track">
                  <div className="agro-prob-fill tertiary" style={{ width: "3.4%" }} />
                </div>
              </div>
            </div>

            <div className="agro-guardrail-card">
              <span>🛡 3-Stage OpenCV Guardrail:</span>
              <b>Passed (HSV Foliage 94.2%)</b>
            </div>

            <div className="agro-advisory-box">
              <small>ICAR-NRCB TRICHY TREATMENT PROTOCOL</small>
              <p>🌿 <strong>Organic:</strong> Eradicate infected mat; apply Trichoderma viride + neem cake.</p>
              <p>🧪 <strong>Chemical:</strong> Soil drenching with Propiconazole 0.1% or Carbendazim 2g/L.</p>
            </div>

            <div className="agro-geo-footer">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Nearest Center: ICAR-NRCB Podavur, Trichy (4.2 km)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ProjectVisual({ type }: { type: number }) {
  if (type === 0)
    return (
      <div className="project-ui ecommerce-ui">
        <div className="ecom-topbar">
          <div className="ecom-status">
            <span className="live-dot" />
            <span>AI COMMERCE ENGINE</span>
          </div>
          <div className="ecom-search">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span>Search products, categories, SKU...</span>
          </div>
          <div className="ecom-cart-badge">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <b>3 Items</b>
          </div>
        </div>

        <div className="ecom-grid">
          <div className="ecom-product-card">
            <div className="ecom-chip">DYNAMIC PRICING ACTIVE</div>
            <div className="ecom-product-preview">
              <div className="ecom-prod-visual">
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c9a24b"
                  strokeWidth="1.6"
                >
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </div>
              <div className="ecom-prod-meta">
                <strong>AeroSonic Pro ANC Headset</strong>
                <span className="ecom-sku">SKU: ASP-9022 • High-Res Spatial Audio</span>
                <div className="ecom-price-row">
                  <b className="ecom-price">$289.00</b>
                  <span className="ecom-discount">-15% AI Flash</span>
                </div>
              </div>
            </div>
            <div className="ecom-actions">
              <button className="ecom-btn-primary" type="button">
                1-Click Instant Checkout
              </button>
              <span className="ecom-stock-tag">
                ⚡ In Stock (Ready for Dispatch)
              </span>
            </div>
          </div>

          <div className="ecom-metrics-col">
            <div className="ecom-kpi-card">
              <small>CONVERSION BOOST</small>
              <div className="ecom-kpi-value">
                <strong>+<CountUp end={42.8} decimals={1} /></strong>
                <span>%</span>
              </div>
              <em>via Personalized Vector Search</em>
            </div>

            <div className="ecom-pipeline-card">
              <small>LIVE ORDER FULFILLMENT</small>
              <div className="ecom-pipe-item active">
                <span className="pipe-step">01</span>
                <span>Order #8492</span>
                <b>Paid</b>
              </div>
              <div className="ecom-pipe-item active">
                <span className="pipe-step">02</span>
                <span>Stock Allocation</span>
                <b>Synced</b>
              </div>
              <div className="ecom-pipe-item active">
                <span className="pipe-step">03</span>
                <span>Global Dispatch</span>
                <b>En Route</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  if (type === 1)
    return (
      <div className="project-ui protein-ui">
        <div className="protein-topbar">
          <div className="protein-target">
            <span className="protein-pulse" />
            <span>FOLDING ENGINE // TARGET PDB-7X8K</span>
          </div>
          <span className="protein-badge">Fold Converged (High Conf)</span>
        </div>

        <div className="protein-canvas">
          <div className="protein-wireframe">
            <svg viewBox="0 0 520 200" className="protein-svg">
              <defs>
                <linearGradient id="helixGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c9a24b" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#4a86e8" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#6aa84f" stopOpacity="0.9" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M 30 130 Q 80 30 140 110 T 250 70 T 360 130 T 480 60"
                fill="none"
                stroke="url(#helixGrad)"
                strokeWidth="4"
                filter="url(#glow)"
              />
              <path
                d="M 50 110 Q 90 20 130 100 T 240 60 T 350 120 T 460 50"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="1.6"
                strokeDasharray="4 4"
                opacity="0.65"
              />
              <line x1="80" y1="75" x2="80" y2="125" stroke="#c9a24b" strokeWidth="1" strokeDasharray="2 3" opacity="0.75" />
              <line x1="180" y1="90" x2="180" y2="140" stroke="#c9a24b" strokeWidth="1" strokeDasharray="2 3" opacity="0.75" />
              <line x1="300" y1="70" x2="300" y2="125" stroke="#c9a24b" strokeWidth="1" strokeDasharray="2 3" opacity="0.75" />
              <line x1="410" y1="95" x2="410" y2="145" stroke="#c9a24b" strokeWidth="1" strokeDasharray="2 3" opacity="0.75" />
              <circle cx="80" cy="75" r="5" fill="#c9a24b" />
              <circle cx="140" cy="110" r="5" fill="#60a5fa" />
              <circle cx="250" cy="70" r="5" fill="#6aa84f" />
              <circle cx="360" cy="130" r="5" fill="#60a5fa" />
              <circle cx="480" cy="60" r="5" fill="#c9a24b" />
            </svg>

            <div className="protein-tag ptag-1">Met-1</div>
            <div className="protein-tag ptag-2">α-Helix (Leu-14)</div>
            <div className="protein-tag ptag-3">Active Pocket (Tyr-28)</div>
            <div className="protein-tag ptag-4">β-Sheet (Phe-42)</div>
            <div className="protein-tag ptag-5">Cys-65</div>
          </div>

          <div className="protein-footer">
            <div className="protein-stat">
              <small>GLOBAL pLDDT</small>
              <strong><CountUp end={92.4} decimals={1} />%</strong>
              <span>Very High Conf</span>
            </div>
            <div className="protein-stat">
              <small>BACKBONE RMSD</small>
              <strong>1.12</strong>
              <span>Å vs Cryo-EM</span>
            </div>
            <div className="protein-stat">
              <small>MSA ALIGNMENT</small>
              <strong>4,820</strong>
              <span>Sequences</span>
            </div>
            <div className="protein-stat">
              <small>GPU INFERENCE</small>
              <strong><CountUp end={1.4} decimals={1} />s</strong>
              <span>TensorRT A100</span>
            </div>
          </div>
        </div>
      </div>
    )

  if (type === 2)
    return (
      <div className="project-ui skindisease-ui">
        <div className="skin-topbar">
          <div className="skin-case-id">
            <span className="skin-pulse" />
            <span>DERMOSCOPY SCAN // CASE #DRM-904</span>
          </div>
          <span className="skin-badge">CLASSIFICATION COMPLETE</span>
        </div>

        <div className="skin-content-grid">
          <div className="skin-lens-card">
            <div className="skin-aperture">
              <div className="skin-reticle horizontal" />
              <div className="skin-reticle vertical" />
              <div className="skin-scan-ring" />
              <svg viewBox="0 0 160 160" className="skin-contour-svg">
                <path
                  d="M 50 40 C 90 25 130 45 125 85 C 120 125 95 135 60 125 C 25 115 20 80 50 40 Z"
                  fill="rgba(180, 110, 80, 0.22)"
                  stroke="#e06c53"
                  strokeWidth="1.8"
                  strokeDasharray="4 2"
                />
                <circle cx="75" cy="85" r="3" fill="#e06c53" />
              </svg>
              <span className="skin-lens-tag">ROI: 8.4mm</span>
              <span className="skin-lens-marker marker-a">A: 0.94 (Symm)</span>
              <span className="skin-lens-marker marker-b">B: Regular</span>
            </div>
          </div>

          <div className="skin-diagnostics-card">
            <div className="skin-diag-header">
              <small>PRIMARY DIAGNOSIS</small>
              <div className="skin-diag-result">
                <strong>Melanocytic Nevus</strong>
                <span className="skin-safe-tag">BENIGN</span>
              </div>
            </div>

            <div className="skin-probabilities">
              <div className="skin-prob-row">
                <div className="skin-prob-info">
                  <span>Melanocytic Nevus</span>
                  <b><CountUp end={94.6} decimals={1} />%</b>
                </div>
                <div className="skin-prob-bar">
                  <div className="skin-prob-fill high" style={{ width: "94.6%" }} />
                </div>
              </div>

              <div className="skin-prob-row">
                <div className="skin-prob-info">
                  <span>Seborrheic Keratosis</span>
                  <b>3.8%</b>
                </div>
                <div className="skin-prob-bar">
                  <div className="skin-prob-fill low" style={{ width: "3.8%" }} />
                </div>
              </div>

              <div className="skin-prob-row">
                <div className="skin-prob-info">
                  <span>Melanoma Risk</span>
                  <b className="skin-danger-text">&lt; 1.2%</b>
                </div>
                <div className="skin-prob-bar">
                  <div className="skin-prob-fill safe" style={{ width: "1.2%" }} />
                </div>
              </div>
            </div>

            <div className="skin-triage-box">
              <small>RECOMMENDED ACTION</small>
              <p>Routine dermoscopy screening in 12 months. No biopsy required.</p>
            </div>
          </div>
        </div>
      </div>
    )

  return <AgroGuardVisual />
}


function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600)
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
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
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

  // Controlled field values
  const [fields, setFields] = useState({ name: "", email: "", details: "" })

  // Blur-touched tracking for inline validation
  const [touched, setTouched] = useState({ name: false, email: false, details: false })

  // Inline error messages
  function getError(field: keyof typeof fields): string {
    if (!touched[field]) return ""
    if (field === "name" && !fields.name.trim()) return "Please enter your name"
    if (field === "email") {
      if (!fields.email.trim()) return "Please enter a valid email"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return "Please enter a valid email"
    }
    if (field === "details" && !fields.details.trim()) return "Please enter your message"
    return ""
  }

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [menuOpen])

  const handleInquiry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Mark all touched for validation display
    setTouched({ name: true, email: true, details: true })
    // Validate
    if (!fields.name.trim()) return
    if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return
    if (!fields.details.trim()) return

    const form = event.currentTarget
    // Honeypot check
    const honeypot = form.elements.namedItem("_gotcha") as HTMLInputElement | null
    if (honeypot && honeypot.value) return

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
      setFields({ name: "", email: "", details: "" })
      setTouched({ name: false, email: false, details: false })
      setFormStatus("success")
      // Move focus to success message
      setTimeout(() => {
        const msg = document.getElementById("form-success-msg")
        msg?.focus()
      }, 100)
    } catch {
      setFormStatus("error")
    }
  }

  // Trigger fade-up animation when form enters viewport
  useEffect(() => {
    const form = document.querySelector(".contact-form")
    if (!form) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          form.classList.add("in-view")
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(form)
    return () => observer.disconnect()
  }, [])

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
              {services.map((service) => (
                <StaggerItem key={service.title}>
                  <article className="service-card">
                    <div className="service-top">
                      <span className="service-icon">
                        <Icon name={service.icon} />
                      </span>
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
              {projects.map((project, i) => (
                <StaggerItem key={project.slug}>
                  <article className={`project-row project-${i}`}>
                    <div className="project-info">
                      <h3>{project.title}</h3>
                      <p>{project.shortDesc}</p>
                      <div className="tags">
                        {project.tags.map((tag) => (
                          <small key={tag}>{tag}</small>
                        ))}
                      </div>
                      <ArrowLink to={`/projects/${project.slug}`}>
                        View Project
                      </ArrowLink>
                    </div>
                    <ProjectVisual type={project.visualType} />
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
          <div className="container contact-container">
            <div className="contact-header">
              <h2>Let&apos;s Build Something Amazing</h2>
              <p>
                Have a project in mind? We are excited to serve you! Reach out and let&apos;s create something extraordinary together.
              </p>
            </div>
            <form
              className="contact-form"
              onSubmit={handleInquiry}
              noValidate
            >
              <input
                type="hidden"
                name="_subject"
                value="New inquiry from the Epocx Innovation website"
              />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              {/* Honeypot spam protection */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ display: "none" }}
              />
              <div className="form-field">
                <input
                  id="cf-name"
                  type="text"
                  name="Name"
                  placeholder="Your Name"
                  autoComplete="off"
                  required
                  aria-required="true"
                  aria-invalid={!!getError("name")}
                  aria-describedby={getError("name") ? "err-name" : undefined}
                  value={fields.name}
                  onChange={e => setFields(f => ({ ...f, name: e.target.value }))}
                  onBlur={() => setTouched(t => ({ ...t, name: true }))}
                  className={getError("name") ? "field-invalid" : ""}
                />
                {getError("name") && (
                  <span id="err-name" className="field-error" aria-live="polite">{getError("name")}</span>
                )}
              </div>

              <div className="form-field">
                <input
                  id="cf-email"
                  type="email"
                  name="Email"
                  placeholder="Your Email"
                  autoComplete="off"
                  required
                  aria-required="true"
                  aria-invalid={!!getError("email")}
                  aria-describedby={getError("email") ? "err-email" : undefined}
                  value={fields.email}
                  onChange={e => setFields(f => ({ ...f, email: e.target.value }))}
                  onBlur={() => setTouched(t => ({ ...t, email: true }))}
                  className={getError("email") ? "field-invalid" : ""}
                />
                {getError("email") && (
                  <span id="err-email" className="field-error" aria-live="polite">{getError("email")}</span>
                )}
              </div>

              <div className="form-field">
                <textarea
                  id="cf-details"
                  name="Message"
                  placeholder="Your Message"
                  rows={5}
                  required
                  aria-required="true"
                  aria-invalid={!!getError("details")}
                  aria-describedby={getError("details") ? "err-details" : undefined}
                  value={fields.details}
                  onChange={e => setFields(f => ({ ...f, details: e.target.value }))}
                  onBlur={() => setTouched(t => ({ ...t, details: true }))}
                  className={getError("details") ? "field-invalid" : ""}
                />
                {getError("details") && (
                  <span id="err-details" className="field-error" aria-live="polite">{getError("details")}</span>
                )}
              </div>
              <button
                className="submit-button"
                type="submit"
                disabled={formStatus === "sending"}
              >
                {formStatus === "sending" ? "Sending..." : "Send Message"}
              </button>

              {/* Success / Error messages */}
              {formStatus === "success" && (
                <p
                  id="form-success-msg"
                  className="form-status success"
                  role="status"
                  tabIndex={-1}
                >
                  Thank you! We&apos;ll reply within 24 hours.
                </p>
              )}
              {formStatus === "error" && (
                <p className="form-status error" role="alert">
                  Something went wrong. Please email{" "}
                  <a href="mailto:info@epocxinnovations.in">info@epocxinnovations.in</a>.
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
                <a href="https://www.linkedin.com/company/epocx-innovations/">LinkedIn</a>
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

interface ServicesDropdownProps {
  currentSlug?: string
  onNavigate?: () => void
}

function ServicesDropdown({ currentSlug, onNavigate }: ServicesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Close when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Close on outside click or touch
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    document.addEventListener("touchstart", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("touchstart", handleOutsideClick)
    }
  }, [])

  // Focus management for keyboard navigation
  useEffect(() => {
    if (isOpen && activeIndex >= 0 && menuRef.current) {
      const items = menuRef.current.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]')
      if (items[activeIndex]) {
        items[activeIndex].focus()
      }
    }
  }, [activeIndex, isOpen])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false)
      containerRef.current?.querySelector<HTMLButtonElement>("button")?.focus()
      return
    }

    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        setIsOpen(true)
        setActiveIndex(0)
      }
      return
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((prev) => (prev + 1) % services.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((prev) => (prev - 1 + services.length) % services.length)
    }
  }

  const handleBlur = (e: React.FocusEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setIsOpen(false)
    }
  }

  const handleSelect = (slug: string) => {
    setIsOpen(false)
    navigate(`/services/${slug}`)
    window.scrollTo(0, 0)
    if (onNavigate) onNavigate()
  }

  return (
    <div
      className={`services-dropdown ${isOpen ? "open" : ""}`}
      ref={containerRef}
      onMouseEnter={() => {
        if (window.innerWidth >= 768) {
          setIsOpen(true)
        }
      }}
      onMouseLeave={() => {
        if (window.innerWidth >= 768) {
          setIsOpen(false)
        }
      }}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <button
        type="button"
        className="services-dropdown-trigger"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>All Services</span>
        <svg
          className="services-dropdown-chevron"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <ul
          className="services-dropdown-menu"
          role="menu"
          aria-label="All Services"
          ref={menuRef}
        >
          {services.map((item, idx) => {
            const slug = serviceSlug(item.title)
            const isActive = slug === currentSlug
            return (
              <li key={item.title} role="none">
                <Link
                  to={`/services/${slug}`}
                  role="menuitem"
                  className={`services-dropdown-item ${isActive ? "active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                  tabIndex={isOpen ? 0 : -1}
                  onClick={(e) => {
                    e.preventDefault()
                    handleSelect(slug)
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function ServiceTechnologyPage() {
  const { serviceSlug: currentSlug } = useParams()
  const [menuOpen, setMenuOpen] = useState(false)
  const service = services.find(
    (item) => serviceSlug(item.title) === currentSlug,
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentSlug])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [menuOpen])

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
              className={menuOpen ? "service-page-nav open" : "service-page-nav"}
              aria-label="Service page navigation"
            >
              <ServicesDropdown
                currentSlug={currentSlug}
                onNavigate={() => setMenuOpen(false)}
              />
              <a
                className="button button-small nav-cta"
                href="/#contact"
                onClick={() => setMenuOpen(false)}
              >
                Let&apos;s Talk <Icon name="arrow" size={16} />
              </a>
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
          <section className="service-detail-hero">
            <div className="container service-detail-hero-grid">
              <div>
                <Link className="back-link" to="/">
                  <span>←</span> Back to home
                </Link>
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

function ProjectDetailPage() {
  const { projectSlug: currentSlug } = useParams()
  const [menuOpen, setMenuOpen] = useState(false)
  const project = projects.find((item) => item.slug === currentSlug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentSlug])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [menuOpen])

  if (!project) {
    return (
      <main className="service-not-found">
        <div>
          <div className="eyebrow">PROJECT NOT FOUND</div>
          <h1>We couldn&apos;t find that project.</h1>
          <Link className="button" to="/#projects">
            Return to Projects
          </Link>
        </div>
      </main>
    )
  }

  return (
    <PageFadeIn>
      <div className="site-shell project-page">
        <header className="navbar">
          <div className="container nav-inner">
            <Logo />
            <nav
              className={menuOpen ? "service-page-nav open" : "service-page-nav"}
              aria-label="Project page navigation"
            >
              <a href="/#projects" onClick={() => setMenuOpen(false)}>All Projects</a>
              <a href="/#services" onClick={() => setMenuOpen(false)}>Services</a>
              <a className="button button-small nav-cta" href="/#contact" onClick={() => setMenuOpen(false)}>
                Let&apos;s Talk <Icon name="arrow" size={16} />
              </a>
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
          <section className="project-detail-hero">
            <div className="container">
              <a className="back-link" href="/#projects">
                <span>←</span> Back to projects
              </a>
              <div className="eyebrow">
                <span />
                CASE STUDY // {project.category.toUpperCase()}
              </div>
              <h1>{project.title}</h1>
              <p className="project-detail-lead">{project.overview}</p>

              <div className="project-metrics-grid">
                {project.metrics.map((m) => (
                  <div className="project-metric-card" key={m.label}>
                    <div className="project-metric-val">
                      <CountUp
                        end={parseFloat(m.value)}
                        decimals={m.value.includes(".") ? 1 : 0}
                      />
                      <span>{m.suffix}</span>
                    </div>
                    <small>{m.label}</small>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="project-showcase-section">
            <div className="container">
              <div className="project-showcase-wrap">
                <div className="project-showcase-header">
                  <div>
                    <span className="showcase-dot" />
                    <strong>Live Interactive Architecture & UI Preview</strong>
                  </div>
                  <span>Epocx Production Engineering</span>
                </div>
                <div className="project-showcase-canvas">
                  <ProjectVisual type={project.visualType} />
                </div>
              </div>
            </div>
          </section>

          <section className="project-deepdive-section">
            <div className="container project-deepdive-grid">
              <div className="project-narrative">
                <div className="project-narrative-block">
                  <div className="eyebrow">THE CHALLENGE</div>
                  <h2>Engineering for scale and high precision.</h2>
                  <p>{project.problem}</p>
                </div>

                <div className="project-narrative-block">
                  <div className="eyebrow">THE ARCHITECTURE</div>
                  <h2>How Epocx engineered the solution.</h2>
                  <p>{project.solution}</p>
                  {project.showcaseImage && (
                    <figure className="project-app-preview-figure">
                      <img
                        src={project.showcaseImage}
                        alt={`${project.title} Interface Walkthrough`}
                        className="project-app-preview-img"
                      />
                      <figcaption>AgroGuard.ai Production Application — Farmer Authentication, Multilingual Chat Assistant, and Real-time Plant Pathology Vision Analysis</figcaption>
                    </figure>
                  )}
                </div>

                <div className="project-narrative-block">
                  <div className="eyebrow">KEY CAPABILITIES</div>
                  <h2>Key innovations delivered.</h2>
                  <div className="project-features-list">
                    {project.features.map((feat) => (
                      <div className="project-feature-item" key={feat.title}>
                        <div className="project-feat-check">
                          <Icon name="check" size={14} />
                        </div>
                        <div>
                          <strong>{feat.title}</strong>
                          <p>{feat.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="project-sidebar">
                <div className="project-meta-card">
                  <div className="eyebrow">PROJECT SUMMARY</div>
                  <div className="meta-row">
                    <span>Domain</span>
                    <strong>{project.clientOrDomain}</strong>
                  </div>
                  <div className="meta-row">
                    <span>Timeline</span>
                    <strong>Production Ready</strong>
                  </div>
                  <div className="meta-row">
                    <span>Year</span>
                    <strong>{project.year}</strong>
                  </div>
                  <div className="meta-row">
                    <span>Key Technologies</span>
                    <div className="tags" style={{ margin: "8px 0 0" }}>
                      {project.tags.map((t) => (
                        <small key={t}>{t}</small>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="stack-table">
                  <div className="stack-table-head">
                    <span>Layer / Component</span>
                    <span>Technology</span>
                  </div>
                  {project.technologies.map(([layer, technology], index) => (
                    <div className="stack-table-row" key={layer}>
                      <span>
                        <small>{String(index + 1).padStart(2, "0")}</small>
                        {layer}
                      </span>
                      <strong>{technology}</strong>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </section>

          <section className="service-detail-cta">
            <div className="container">
              <div>
                <div className="eyebrow light">BUILD WITH PURPOSE</div>
                <h2>
                  Have {project.title.toLowerCase().startsWith("ai") ? "" : "a "}
                  {project.title.toLowerCase()} in mind?
                </h2>
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
  { path: "/projects/:projectSlug", Component: ProjectDetailPage },
  { path: "*", Component: HomePage },
])

export default function App() {
  return <RouterProvider router={router} />
}

