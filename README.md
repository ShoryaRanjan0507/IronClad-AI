# Ironclad AI — Security Threat Monitoring Agent

An AI-powered Security Threat Monitoring Agent designed to analyze logs, authentication events, and network packets, filter out false positives, prioritize critical threat vectors, and explain attack patterns in simple, actionable language.

**🌐 Live Demo:** [https://iron-clad-ai.vercel.app/](https://iron-clad-ai.vercel.app/)

---

## 🛡️ The Problem Statement

Security operations teams receive thousands of alerts daily, leading to alert fatigue and making it difficult to distinguish and prioritize genuine threats from benign baseline traffic.

**Ironclad AI** addresses this by acting as a smart agent that:
1. **Analyzes Live Telemetry**: Aggregates and parses security stdout logs, authentication events, and network packets in real-time.
2. **Filters False Positives**: Explains exactly what baseline sweeps or standard backup events were analyzed and dismissed as benign noise.
3. **Prioritizes Critical Threats**: Bubbles up critical anomaly alerts (DDoS, Ransomware) and offers severity filters to focus analyst response.
4. **Explains Attacks Simply**: Translates complex security payload signatures into simple, readable explanations of the attack patterns.

---

## ⚡ Key Features

- **Cinematic Landing Page**: Premium glassy interface layout, background looping loop video, and an infinite scrolling logo marquee tracker.
- **Security Command Console**: Prioritized Threat Queue, interactive Details Pane with dynamic AI Analysis, Triage Copilot chat widget, and live streaming security logs.
- **Admin Control Tower**: Role-based settings, operator registry controls (Change Role / Suspend operator), audit logs registry, weekly line analytics, and threat simulator panels.
- **Mobile Responsive Drawer Layout**: Full support for smaller mobile screen sizes with vertical column stacking and drawer navigation overlays.

---

## 🛠️ Stack & Setup

Built using **React 18 + TypeScript + Vite + Tailwind CSS + motion/react + lucide-react**.

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/ShoryaRanjan0507/IronClad-AI.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run local dev server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
