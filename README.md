# 🔍 CIPHERSCENE — Digital Crime Scene

A playable **Digital Forensics Simulator** built with **Next.js 14**. Step into the role of a cybercrime investigator and solve a simulated digital crime by examining suspicious files, recovering deleted messages, analyzing browser history, reviewing system activity logs, and connecting digital evidence to identify the attacker.

### 📁 Case File: The Stolen Blueprint

A confidential design blueprint has been leaked from **NovaTech Industries**. Four employees are under suspicion, but only one is responsible.

You are the lead digital investigator. Examine the evidence, uncover hidden connections, challenge suspect alibis, and determine who stole the blueprint.

**Four suspects. One culprit. Can you uncover the truth?**

---

## 🎮 How to Play

Your investigation takes place across multiple digital evidence sources.

1. **Open the Case** — Read the incident briefing and understand the circumstances surrounding the leak.
2. **Examine Files** — Inspect digital files and identify suspicious documents, metadata, and hidden clues.
3. **Recover Messages** — Restore simulated deleted chat messages to uncover conversations related to the crime.
4. **Analyze Browser History** — Investigate visited websites, search activity, and suspicious browsing patterns.
5. **Review Activity Logs** — Cross-reference login attempts, file access records, and timestamps.
6. **Interrogate Suspects** — Examine four suspects, compare their statements, and challenge their alibis using collected evidence.
7. **Submit Your Verdict** — Identify the culprit and submit your final accusation.

### 🏆 Evidence & Scoring System

Every discovered clue contributes to your evidence score. The more evidence you collect before submitting your verdict, the better your detective rating.

Your final outcome depends on both your investigation and the accuracy of your accusation.

---

## 🧠 Detective Ratings

| Evidence Collected | Detective Rating |
|:---:|:---|
| 0–3 clues | 🥉 Rookie |
| 4–6 clues | 🥈 Investigator |
| 7–9 clues | 🥇 Senior Analyst |
| 10+ clues + Correct Verdict | 🏆 Elite Cyber Detective |

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) — App Router |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| State Management | [Zustand](https://github.com/pmndrs/zustand) |
| Language | JavaScript (ES2022) |
| Icons | Inline SVG |
| Deployment | [Vercel](https://vercel.com/) |

### 💡 Zero Backend. Zero Paid APIs.

CIPHERSCENE is designed to run entirely on the client side.

- No paid APIs or external AI services.
- No backend server required.
- No database required.
- Case information and evidence are stored locally in static application data.
- Investigation progress is managed through Zustand.
- Fully playable without an internet connection after the application assets are available locally.

---

## ⚙️ Getting Started Locally

### Prerequisites

- Node.js 18 or later
- npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/digital-crime-scene.git
```

**2. Navigate into the project**

```bash
cd digital-crime-scene
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂️ Project Structure

```text
digital-crime-scene/
│
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
│
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── globals.css
│   │
│   ├── case/
│   │   └── page.js
│   ├── files/
│   │   └── page.js
│   ├── messages/
│   │   └── page.js
│   ├── browser/
│   │   └── page.js
│   ├── logs/
│   │   └── page.js
│   ├── suspects/
│   │   └── page.js
│   └── verdict/
│       └── page.js
│
├── components/
│   ├── Navbar.js
│   ├── CaseHeader.js
│   ├── EvidenceBadge.js
│   └── LoadingSpinner.js
│
├── lib/
│   ├── caseData.js
│   └── store.js
│
└── public/
    └── favicon.ico
```

---

## 🎯 Game Design & Implementation

### 1. Deterministic Case System
The case follows a predefined storyline with a fixed culprit. Evidence is distributed across different investigation modules, requiring players to connect clues rather than rely on random guessing.

### 2. Evidence Tracking
Zustand manages investigation progress, discovered clues, and evidence points throughout the session.

### 3. Digital Forensics Simulation
Players interact with simulated digital artifacts, including:
- Suspicious files and document metadata.
- Recovered deleted conversations.
- Browser history and search activity.
- System login and file access logs.
- Suspect profiles and alibi statements.

### 4. Dynamic Verdict System
The final verdict evaluates the player's accusation and collected evidence to determine the investigation outcome and detective rating.

### 5. Offline-First Architecture
All investigation data is predefined and stored locally. No external database, paid API, or backend infrastructure is required.

---

## 🔐 Important Disclaimer

CIPHERSCENE is an educational digital forensics simulation. All files, messages, browser records, activity logs, suspects, and case events are fictional and generated for gameplay purposes.

This project does not access real devices, recover actual deleted files, monitor browser activity, or perform forensic analysis on external systems.

---
## 👨‍💻 Developed By

Rohit Sawant
Full Stack Developer 💻 · Freelancer 🚀 · Student 🎓

---

<div align="center">

Built with curiosity, creativity, and code.
## 📜 License

This project is licensed under the **MIT License**. You are free to use, modify, and distribute it.

---

<div align="center">

### 🔍 CIPHERSCENE

**Every file tells a story. Every clue brings you closer to the truth.**

*Think like an investigator. Analyze like a forensic expert. Solve the case.*

</div>
