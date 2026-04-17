export type Project = {
  id: number;
  title: string;
  domain: string;
  budget: string;
  budgetMin: number;
  duration: string;
  tier: string;
  skills: string[];
  applicants: number;
  company: string;
  posted: string;
};

export const projects: Project[] = [
  { id: 1, title: "ESP32 IoT Dashboard for Factory Monitoring", domain: "ECE", budget: "₹18,000–₹25,000", budgetMin: 18000, duration: "10 days", tier: "Practitioner", skills: ["ESP32", "MQTT", "Python", "AWS IoT"], applicants: 5, company: "AutoSense Labs", posted: "2 days ago" },
  { id: 2, title: "PLC Motor Control Simulation (Siemens S7)", domain: "EEE", budget: "₹15,000–₹22,000", budgetMin: 15000, duration: "8 days", tier: "Practitioner", skills: ["PLC", "SCADA", "Ladder Logic", "HMI"], applicants: 3, company: "PowerGrid Dynamics", posted: "1 day ago" },
  { id: 3, title: "SolidWorks Gear Assembly CAD + BOM", domain: "Mechanical", budget: "₹12,000–₹18,000", budgetMin: 12000, duration: "7 days", tier: "Apprentice", skills: ["SolidWorks", "GD&T", "BOM", "Drafting"], applicants: 8, company: "MechVenture India", posted: "3 days ago" },
  { id: 4, title: "ML Churn Prediction Model (Telecom Dataset)", domain: "CS", budget: "₹28,000–₹40,000", budgetMin: 28000, duration: "14 days", tier: "Expert", skills: ["Python", "Scikit-learn", "XGBoost", "Pandas"], applicants: 12, company: "DataCore Analytics", posted: "4 days ago" },
  { id: 5, title: "B2B Sales Outreach Simulation — SaaS Product", domain: "Business", budget: "₹8,000–₹14,000", budgetMin: 8000, duration: "5 days", tier: "Apprentice", skills: ["CRM", "Email Outreach", "Sales Scripts", "LinkedIn"], applicants: 6, company: "GrowthHive", posted: "1 day ago" },
  { id: 6, title: "React Admin Dashboard for HR Analytics", domain: "CS", budget: "₹22,000–₹32,000", budgetMin: 22000, duration: "12 days", tier: "Practitioner", skills: ["React", "TypeScript", "Recharts", "REST API"], applicants: 9, company: "HRflow.io", posted: "5 days ago" },
];

export type Candidate = {
  id: number;
  name: string;
  location: string;
  tfes: number;
  tier: string;
  domain: string;
  skills: string[];
  earned: string;
  projects: number;
  badges: number;
};

export const candidates: Candidate[] = [
  { id: 1, name: "Arjun K.", location: "Coimbatore", tfes: 87, tier: "Expert", domain: "ECE", skills: ["STM32", "FreeRTOS", "Keil", "C Embedded"], earned: "₹1,24,000", projects: 23, badges: 8 },
  { id: 2, name: "Priya S.", location: "Pune", tfes: 82, tier: "Practitioner", domain: "CS", skills: ["Python", "TensorFlow", "SQL", "Pandas"], earned: "₹87,500", projects: 17, badges: 6 },
  { id: 3, name: "Vikram R.", location: "Hyderabad", tfes: 79, tier: "Practitioner", domain: "Mechanical", skills: ["SolidWorks", "ANSYS", "AutoCAD", "CATIA"], earned: "₹63,000", projects: 11, badges: 5 },
];

export const domains = [
  { icon: "Zap", name: "ECE / Electronics", desc: "Circuit sims, embedded systems, IoT" },
  { icon: "Plug", name: "EEE / Electrical", desc: "Power systems, motor control, SCADA" },
  { icon: "Cog", name: "Mechanical", desc: "CAD challenges, FEA, process optimization" },
  { icon: "Code", name: "Computer Science", desc: "DSA, full-stack, ML pipelines" },
  { icon: "BarChart3", name: "Business / Non-Tech", desc: "Sales sims, case studies, communication" },
  { icon: "Bot", name: "AI / Data", desc: "Model building, analytics, Python challenges" },
];

export const tiers = [
  { level: 1, name: "Explorer", color: "oklch(0.7 0.12 230)", earnings: "₹0 – ₹5K" },
  { level: 2, name: "Apprentice", color: "oklch(0.7 0.15 165)", earnings: "₹5K – ₹15K" },
  { level: 3, name: "Practitioner", color: "oklch(0.78 0.13 75)", earnings: "₹15K – ₹40K" },
  { level: 4, name: "Expert", color: "oklch(0.72 0.17 25)", earnings: "₹40K – ₹1L" },
  { level: 5, name: "Master", color: "oklch(0.55 0.22 295)", earnings: "₹1L+" },
];

export const missions = [
  { id: 1, title: "Design a Full-Wave Bridge Rectifier", due: "3 days", xp: 250, reward: "₹8,000", progress: 60 },
  { id: 2, title: "Write embedded C for UART communication", due: "5 days", xp: 180, reward: "₹5,500", progress: 30 },
];

export const spendData = [
  { month: "Jan", talentForge: 24000, industry: 60000, savings: 36000 },
  { month: "Feb", talentForge: 32000, industry: 78000, savings: 46000 },
  { month: "Mar", talentForge: 28000, industry: 70000, savings: 42000 },
  { month: "Apr", talentForge: 41000, industry: 95000, savings: 54000 },
  { month: "May", talentForge: 38000, industry: 88000, savings: 50000 },
  { month: "Jun", talentForge: 45000, industry: 102000, savings: 57000 },
];

export const sampleQuestions = [
  {
    domain: "ECE — Circuit Theory",
    question: "A series RLC circuit has R=10Ω, L=0.1H, C=100μF. At resonance frequency, the impedance is:",
    options: ["10 Ω (purely resistive)", "0 Ω (short circuit)", "100 Ω (inductive)", "Infinite (open circuit)"],
    correct: 0,
  },
  {
    domain: "ECE — Digital Logic",
    question: "Which logic gate outputs HIGH only when all inputs are LOW?",
    options: ["AND", "OR", "NOR", "XOR"],
    correct: 2,
  },
  {
    domain: "ECE — Signals",
    question: "The Nyquist sampling theorem states the sampling rate must be at least:",
    options: ["Equal to signal frequency", "Twice the highest frequency", "Half the highest frequency", "Any rate works"],
    correct: 1,
  },
];
