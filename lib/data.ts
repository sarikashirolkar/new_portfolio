export const personal = {
  name: "Sarika Shirolkar",
  role: "AI Engineer & Builder",
  location: "Bengaluru, KA",
  email: "sarikashirolkar@gmail.com",
  phone: "+91 9741056565",
  github: "https://github.com/sarikashirolkar",
  linkedin: "https://linkedin.com/in/sarikashirolkar",
  domain: "sarika.aiworkflowautomate.com",
  tagline:
    "I ship AI-native products end-to-end — from problem framing through production.",
  about:
    "I'm Sarika — an AI engineer who builds and ships. I've shipped Linkyro (a live Chrome extension), deployed an AI voice scheduling agent for a France-based dental clinic, and published an IEEE first-author paper on YOLOv8 detection under adverse weather. I work across agentic AI, LLM orchestration, multimodal deep learning, and scalable cloud deployment.",
};

export const achievements = [
  {
    title: "1st Place — HackMarch 2.0",
    detail: "Builder mentality validated in time-constrained competitive environment.",
    year: "2024",
    badge: "🏆",
  },
  {
    title: "2nd Place — Databricks Hackathon",
    detail: "Built Kisan Mitra: a chat-first AI assistant for farming families on Databricks.",
    year: "2025",
    badge: "🥈",
  },
  {
    title: "IEEE First-Author Publication",
    detail:
      "Peer-reviewed paper at IEEE International Conference — YOLOv8-based real-time object detection under adverse weather for autonomous systems.",
    year: "2025",
    badge: "📄",
  },
  {
    title: "Chair, IEEE CIS SVIT",
    detail: "Led ML workshops, hackathons, and mentored peers on applied ML pipelines.",
    year: "2024–25",
    badge: "🎓",
  },
  {
    title: "Academic Excellence — CGPA 9.1",
    detail: "Ranked 2nd in department (Sem 6, 2024–2025), B.E. CSE (AI & ML), VTU.",
    year: "2024–25",
    badge: "⭐",
  },
];

export const shippedProducts = [
  {
    title: "Linkyro — AI Comment Generator",
    tag: "Solo-built · Live on Chrome Web Store",
    description:
      "AI-powered Chrome extension that generates context-aware comments using LLMs. Owned the entire product lifecycle: problem discovery, prompt engineering, UI/UX, browser-extension architecture, and Chrome Web Store deployment. Handles real user traffic.",
    stack: ["LLMs", "Prompt Engineering", "Chrome Extension", "JavaScript"],
    link: "https://chromewebstore.google.com/",
    accent: "from-aurora-mint to-aurora-teal",
  },
  {
    title: "AI Voice Scheduling Agent",
    tag: "Production system · Live users",
    description:
      "End-to-end LLM-powered voice agent for a France-based dental clinic using Retell AI, Python, n8n, and Google Calendar. Books, reschedules, cancels appointments, and checks availability via phone. Structured outputs, evaluation checks, real-time calendar sync.",
    stack: ["Retell AI", "n8n", "Python", "Google Calendar API"],
    link: "#",
    accent: "from-aurora-purple to-aurora-violet",
  },
];

export const experience = [
  {
    role: "AI Engineer (AI Agents & Products)",
    company: "AI Workflow Automate",
    period: "Oct 2025 – Present",
    bullets: [
      "Owning AI product development end-to-end: problem framing, AI pipeline design, model integration, production deployment, and iteration on real user feedback.",
      "Built and deployed agentic AI systems — voice scheduling agents using Retell AI + LLM orchestration with n8n — handling real-time conversations, structured outputs, and Google Calendar integration.",
      "Designed AI evaluation pipelines including error analysis, failure-case reduction, and performance benchmarking.",
      "Led rapid prototyping cycles, translating ambiguous founder ideas into shipped, scalable AI features.",
    ],
  },
  {
    role: "Software Engineer (Cloud & AI Infrastructure)",
    company: "AI Workflow Automate",
    period: "Mar 2025 – Sep 2025",
    bullets: [
      "Designed and deployed production backend services on Azure Linux VMs with focus on scalability, latency, and failure recovery.",
      "Improved development velocity by ~40% through AI-assisted workflows while maintaining manual code review and testing standards.",
      "Standardized deployment practices (env config, logging/monitoring, rollback-friendly releases) to reduce operational issues at scale.",
    ],
  },
  {
    role: "AI & ML Intern",
    company: "Bharat Electronics Limited",
    period: "Jul 2025 – Sep 2025",
    bullets: [
      "Developed production-grade computer vision systems for defense platforms — real-time object detection robust under adverse conditions.",
      "Optimized YOLOv8 on custom-annotated datasets for high-accuracy, low-latency inference in safety-critical environments.",
    ],
  },
  {
    role: "Project Intern",
    company: "IEEE IAMPro'25",
    period: "Apr 2025 – Sep 2025",
    bullets: [
      "Research project culminating in a first-author IEEE International Conference publication.",
    ],
  },
];

export const projects = [
  {
    title: "AI Research Agent",
    description:
      "Agentic AI system with retrieval-augmented generation, tool usage, and structured outputs. Autonomously gathers sources, reasons through findings, and generates research artifacts.",
    stack: ["LangChain", "RAG", "Streamlit"],
    link: "https://github.com/sarikashirolkar",
  },
  {
    title: "Kisan Mitra — Dual-Purpose AI Assistant",
    description:
      "Chat-first AI product for farming families: crop advisory + scholarship discovery. Matching pipeline on Delta tables with Spark SQL. Databricks Hackathon 2nd place.",
    stack: ["Databricks", "Delta Lake", "Spark SQL", "LLM"],
    link: "https://github.com/sarikashirolkar",
  },
  {
    title: "Ebbinghaus Adaptive Memory Agent",
    description:
      "Spaced-repetition app with AI-driven adaptive scheduling. FastAPI + SQLite backend, Streamlit dashboard, n8n automation, Telegram integration, and AI quiz/chat.",
    stack: ["FastAPI", "SQLite", "Streamlit", "n8n", "Telegram"],
    link: "https://github.com/sarikashirolkar",
  },
  {
    title: "Secure Object ID for Autonomous Systems",
    description:
      "YOLOv8-based real-time detection under adverse weather. Rigorous benchmarking and error analysis. First-author IEEE Conference publication.",
    stack: ["YOLOv8", "OpenCV", "PyTorch"],
    link: "https://github.com/sarikashirolkar",
  },
  {
    title: "AI Agent for LinkedIn Content Automation",
    description:
      "Automated agentic workflow orchestrating LLM prompts, content validation, and publishing triggers for context-aware LinkedIn content.",
    stack: ["n8n", "LLMs", "Automation"],
    link: "https://www.linkedin.com/company/aiworkflowautomate",
  },
  {
    title: "Business Risk Prediction Model",
    description:
      "Python prediction system to identify high-risk records from large transactional datasets. Feature engineering, threshold optimization, precision-recall evaluation.",
    stack: ["Python", "scikit-learn", "Pandas"],
    link: "https://github.com/sarikashirolkar",
  },
  {
    title: "Crater Detection Model",
    description:
      "Computer vision model to detect lunar/Martian craters and evaluate detection performance on image datasets.",
    stack: ["OpenCV", "CNN", "Python"],
    link: "https://github.com/sarikashirolkar",
  },
  {
    title: "Resume Builder — Azure App Service",
    description:
      "Deployed a resume-builder application on Azure App Services with scalable hosting and cloud-ready configuration.",
    stack: ["Azure", "App Service", "Python"],
    link: "https://github.com/sarikashirolkar",
  },
];

export const skillGroups = [
  {
    label: "AI / ML & Deep Learning",
    items: ["LLMs", "Transformers", "CNNs", "YOLOv8", "Object Detection", "Fine-tuning", "Model Evaluation", "Error Analysis"],
  },
  {
    label: "Agentic AI & LLM Tooling",
    items: ["LangChain", "n8n", "Retell AI", "Prompt Engineering", "RAG", "Structured Outputs", "Tool-use Agents"],
  },
  {
    label: "Programming",
    items: ["Python", "SQL", "Java", "C", "JavaScript", "TypeScript"],
  },
  {
    label: "Cloud & Production",
    items: ["Azure (VMs, App Service, Blob)", "Linux", "Docker", "Databricks", "Delta Lake", "MLflow"],
  },
  {
    label: "Frameworks & Libraries",
    items: ["scikit-learn", "TensorFlow", "Keras", "OpenCV", "FastAPI", "Streamlit", "Pandas", "NumPy"],
  },
  {
    label: "Data & Tools",
    items: ["MySQL", "MongoDB", "SQLite", "Spark SQL", "Power BI", "Git", "Chrome Extension Dev"],
  },
];
