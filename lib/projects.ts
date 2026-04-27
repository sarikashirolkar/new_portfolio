export type CuratedProject = {
  slug: string;
  title: string;
  challenge: string;
  solved: string;
  stack: string[];
  group: "AI Agents" | "Hackathon" | "Computer Vision" | "ML" | "Product" | "Other";
  extraLinks?: { label: string; url: string }[];
};

export const CURATED_PROJECTS: CuratedProject[] = [
  {
    slug: "Adaptive-Memory-System-HackMarch2.0_Hackathon",
    title: "Adaptive Memory System",
    challenge: "Static spaced-repetition apps don't adapt to how a user actually forgets.",
    solved:
      "Built an AI-driven adaptive scheduler grounded in the Ebbinghaus curve — won 1st place at HackMarch 2.0.",
    stack: ["Python", "FastAPI", "Streamlit", "n8n"],
    group: "Hackathon",
  },
  {
    slug: "RAG-portfolio",
    title: "RAG Portfolio Chatbot",
    challenge: "Recruiters skim portfolios — answers should be one question away, not buried in scroll.",
    solved:
      "Retrieval-augmented chatbot grounded in my resume + projects so anyone can ask and get cited answers.",
    stack: ["RAG", "LLM", "Python"],
    group: "AI Agents",
  },
  {
    slug: "E-commerce-Agentic-AI-",
    title: "E-commerce Agentic AI",
    challenge: "Shoppers want product help that actually reasons across catalog, reviews, and intent.",
    solved:
      "Multi-tool agent that plans → searches → ranks → explains, with structured outputs for downstream UI.",
    stack: ["LangChain", "Tool-use", "Python"],
    group: "AI Agents",
  },
  {
    slug: "Hackathon_Polaris",
    title: "Polaris",
    challenge: "Hackathon brief: assistive AI for navigation under uncertainty.",
    solved: "Prototyped end-to-end pipeline + interface in <48h with a small team.",
    stack: ["Python", "LLM"],
    group: "Hackathon",
  },
  {
    slug: "VoiceAgent-Hackathon-HackBlr",
    title: "Voice Agent — HackBlr",
    challenge: "Voice agents typically break on interruptions, silences, and structured handoffs.",
    solved: "Built a real-time voice agent with robust turn-taking and tool calls during a Bengaluru hackathon.",
    stack: ["Retell AI", "LLM", "n8n"],
    group: "Hackathon",
  },
  {
    slug: "Secure-Identification-of-Autonomous-Vehicles",
    title: "Secure Object ID for Autonomous Systems",
    challenge: "Object detection drops accuracy fast under fog, rain, and low light — unsafe for autonomy.",
    solved:
      "YOLOv8 pipeline tuned for adverse weather with rigorous benchmarking — first-author IEEE publication.",
    stack: ["YOLOv8", "PyTorch", "OpenCV"],
    group: "Computer Vision",
  },
  {
    slug: "AI-Research-Agent",
    title: "AI Research Agent",
    challenge: "Manual literature review is slow and produces inconsistent artifacts.",
    solved:
      "Agent that gathers sources, reasons through findings, and emits structured research artifacts.",
    stack: ["LangChain", "RAG", "Streamlit"],
    group: "AI Agents",
  },
  {
    slug: "Crater-Detection",
    title: "Crater Detection",
    challenge: "Planetary surface images need crater localization for terrain analysis at scale.",
    solved: "CNN-based detector with evaluation against labeled lunar/Martian datasets.",
    stack: ["CNN", "OpenCV", "Python"],
    group: "Computer Vision",
  },
  {
    slug: "IBM-Sales-Risk-Prediction-Model",
    title: "IBM Sales Risk Prediction",
    challenge: "Sales pipelines hide which deals are quietly slipping.",
    solved:
      "Risk model with feature engineering + threshold optimization to surface high-risk records early.",
    stack: ["scikit-learn", "Pandas", "Python"],
    group: "ML",
  },
  {
    slug: "Amazon-Business-Risk-Prediction-Model",
    title: "Business Risk Prediction",
    challenge: "Identifying high-risk records from large transactional datasets without flooding ops with false positives.",
    solved: "Precision-recall tuned classifier with calibrated thresholds for real-world cost ratios.",
    stack: ["Python", "scikit-learn", "Pandas"],
    group: "ML",
  },
  {
    slug: "AI-Powered-Code-Review-Assistant",
    title: "AI Code Review Assistant",
    challenge: "Code review fatigue — small things slip through and reviewers burn out.",
    solved:
      "LLM-powered reviewer that flags issues, explains reasoning, and stays inside diff context.",
    stack: ["LLM", "Python", "Prompt Eng"],
    group: "AI Agents",
  },
  {
    slug: "appointo.ai",
    title: "Appointo.ai — Voice Agent Product",
    challenge: "Clinics and SMBs lose calls outside business hours and during peak load.",
    solved:
      "Full-stack voice-agent product — site, frontend, and backend — that books, reschedules, and answers via phone.",
    stack: ["Retell AI", "Python", "TypeScript"],
    group: "Product",
    extraLinks: [
      { label: "Frontend", url: "https://github.com/sarikashirolkar/front_end_appointo.ai" },
      { label: "Backend", url: "https://github.com/sarikashirolkar/backend_appointo.ai" },
    ],
  },
  {
    slug: "IIM-Indian-Institue-of-Management-BLR--Agentic-AI-Workshop-Series",
    title: "IIM Bangalore — Agentic AI Workshop",
    challenge: "Translate working agentic-AI practice into a teachable curriculum for execs and students.",
    solved: "Designed and delivered a hands-on workshop series at IIM Bangalore.",
    stack: ["Agentic AI", "Teaching", "Python"],
    group: "Other",
  },
  {
    slug: "PromptWars-Ankinator",
    title: "PromptWars — Ankinator",
    challenge: "Build a prompt-driven game that pushes LLM reasoning under time pressure.",
    solved: "Hackathon-style entry exploring adversarial prompt mechanics.",
    stack: ["TypeScript", "LLM"],
    group: "Hackathon",
  },
  {
    slug: "PromptWars-Virtual",
    title: "PromptWars — Virtual",
    challenge: "Virtual edition of PromptWars — multiplayer prompt battles over the web.",
    solved: "Web-based prompt-game runtime with shared state.",
    stack: ["TypeScript", "LLM"],
    group: "Hackathon",
  },
  {
    slug: "hormonia-an-ios-app",
    title: "Hormonia — iOS App",
    challenge: "Hormonal-health tracking apps rarely surface insight, only data.",
    solved: "Mobile app concept exploring meaningful summaries instead of raw logs.",
    stack: ["JavaScript", "Mobile"],
    group: "Product",
  },
  {
    slug: "Resume-Builder",
    title: "Resume Builder on Azure",
    challenge: "Resume tools often lack scalable, cloud-ready hosting for real users.",
    solved: "Deployed a resume builder on Azure App Service with cloud-native config.",
    stack: ["Azure", "App Service", "Python"],
    group: "Product",
  },
  {
    slug: "aiworkflowautomate.com",
    title: "AI Workflow Automate — Company Site",
    challenge: "Company needed a credible web presence reflecting its AI-product focus.",
    solved: "Designed and shipped the company site.",
    stack: ["HTML", "CSS"],
    group: "Product",
  },
  {
    slug: "ai-website",
    title: "AI Website",
    challenge: "Lightweight site experiment for an AI-focused brand.",
    solved: "Static site exploring layout and motion choices.",
    stack: ["CSS", "HTML"],
    group: "Product",
  },
  {
    slug: "DAWNVision",
    title: "DAWNVision",
    challenge: "Engineering minor project — vision system under degraded image conditions.",
    solved: "Built and presented as part of the engineering minor project track.",
    stack: ["Computer Vision", "HTML"],
    group: "Computer Vision",
  },
];
