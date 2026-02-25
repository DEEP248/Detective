<div align="center">

# 🕯️ The Silence Protocol

### Episode 1: The Last Candle

[![Live Demo](https://img.shields.io/badge/▶_PLAY_NOW-silence--protocol.vercel.app-c9a84c?style=for-the-badge&logo=vercel&logoColor=white)](https://silence-protocol.vercel.app)

[![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Zustand](https://img.shields.io/badge/Zustand-443E38?style=flat-square&logo=npm&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?style=flat-square&logo=vercel&logoColor=white)](https://silence-protocol.vercel.app)

<br/>

*An immersive, browser-based interactive detective mystery.*
*Investigate a locked-room murder. Interrogate suspects. Connect the evidence. Find the killer.*

<br/>

<img src="https://img.shields.io/badge/Playtime-40--45_min-8b6f9e?style=for-the-badge" alt="Playtime"/>
<img src="https://img.shields.io/badge/Difficulty-Hard-a33a3a?style=for-the-badge" alt="Difficulty"/>
<img src="https://img.shields.io/badge/No_Backend-100%25_Frontend-2ea043?style=for-the-badge" alt="Frontend Only"/>

</div>

---

## 🔍 The Case

> **October 14th. 9:17 PM.** The lights go out at Hale Manor during a violent storm. Fifteen minutes of darkness. When the power returns at 9:32 PM, **Victor Hale** — financier, philanthropist, and host of the dinner party — is found **dead in the library**.
>
> **Cause of death:** Blunt force trauma. The fireplace poker is missing.
>
> **The impossible puzzle:** The library window was **locked from inside**. No forced entry. The door was ajar. Six guests were in the house. One of them is a killer.
>
> **Your mission:** Find the truth.

---

## 🎮 Features

<table>
<tr>
<td width="50%">

### 🧩 Deep Investigation System
- **20 evidence items** across 5 categories
- **Progressive unlocking** — clues reveal new clues
- **Red herrings** designed to mislead
- Evidence board with categorized findings

</td>
<td width="50%">

### 👥 6 Complex Suspects
- Detailed profiles with backstories & motives
- **Interactive interviews** with 5–8 questions each
- Psychological misdirection — the obvious suspects aren't the killer
- Suspicion levels that challenge assumptions

</td>
</tr>
<tr>
<td width="50%">

### ⏱️ Timeline Reconstruction
- 16 chronological events with timestamps
- Color-coded categories (social, conflict, critical)
- Clock discrepancies and misleading testimony
- Murder window analysis

</td>
<td width="50%">

### 🔗 Relationship Web
- Visual map of connections between all characters
- Tension indicators (high / medium / low)
- Hidden motives revealed through relationships
- Victim profile with full backstory

</td>
</tr>
<tr>
<td width="50%">

### ⚖️ Accusation System
- Select a suspect + write a detailed explanation
- System validates against **10 logical evidence points**
- Must connect at least **8 of 10** to solve the case
- **3 attempts maximum** — no brute force
- Dramatic animated reveal on success

</td>
<td width="50%">

### 🛠️ Player Tools
- 📝 **Detective's Notebook** — personal notes
- 💡 **Hint System** — progressive hints (costs score)
- 📄 **Police Report** — official case documentation
- 💾 **Auto-save** — progress saved to localStorage
- 📊 **Scoring** — time, hints, attempts tracked

</td>
</tr>
</table>

---

## 🎨 Design Philosophy

| Principle | Implementation |
|-----------|---------------|
| **Noir Aesthetic** | Deep grey backgrounds, warm amber highlights, subtle shadows |
| **Professional Tone** | No childish elements — serious, immersive detective experience |
| **Smooth Animations** | Framer Motion page transitions, staggered reveals, modal animations |
| **Psychological Design** | Obvious suspects look guilty; the real killer appears harmless |
| **Frustrating but Fair** | Every clue is findable. Every answer is logical. No guessing. |
| **Typography** | Playfair Display (serif) + Inter (sans) + JetBrains Mono (code/reports) |

---

## 🏗️ Architecture

```
src/
├── 📁 components/        # 11 Reusable UI components
│   ├── AccusationPanel    # Suspect selection & logic validation
│   ├── EvidenceCard       # Evidence board cards
│   ├── EvidenceViewer     # Full evidence detail modal
│   ├── HintSystem         # Progressive hints with score cost
│   ├── Modal              # Animated modal with ESC support
│   ├── Notepad            # Slide-out detective notebook
│   ├── PoliceReport       # Official case file view
│   ├── RelationshipMap    # Suspect connection web
│   ├── SuspectCard        # Suspect grid cards
│   ├── SuspectProfile     # Detailed profile + interview Q&A
│   └── TimelineBoard      # Chronological event timeline
│
├── 📁 sections/           # 3 Major game screens
│   ├── IntroSection       # Cinematic typewriter intro
│   ├── BriefingSection    # 3-page case briefing
│   └── InvestigationSection  # Main workspace (6 tabs)
│
├── 📁 data/               # Immutable game data
│   ├── suspects.js        # 6 suspects, alibis, interviews
│   ├── evidence.js        # 20 evidence items + prerequisites
│   ├── timeline.js        # Events + hidden true timeline
│   └── relationships.js   # Connection network + victim
│
├── 📁 logic/              # Puzzle engine (separate from UI)
│   └── puzzleLogic.js     # 10 logic points, validation, hints
│
├── 📁 store/              # State management
│   └── gameStore.js       # Zustand + localStorage persist
│
├── 📁 animations/         # Motion design
│   └── variants.js        # 15 Framer Motion presets
│
└── 📁 utils/              # Helpers
    └── helpers.js         # Formatting utilities
```

> **Design principle:** Puzzle logic is fully separated from UI. All game data is immutable. State is managed centrally through Zustand with automatic localStorage persistence.

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/DEEP248/Detective.git
cd Detective

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🌐 Deployment

This project is deployed on **Vercel** as a static site. No backend required.

| Method | Steps |
|--------|-------|
| **Vercel CLI** | `npm i -g vercel && vercel --prod` |
| **GitHub Integration** | Import repo on [vercel.com](https://vercel.com) → Framework: Vite → Deploy |
| **Manual** | `npm run build` → Upload `dist/` folder to any static host |

**Build output:** ~377 KB JS + ~36 KB CSS (gzipped: ~126 KB total)

---

## 🧠 Game Design Notes

<details>
<summary><b>📌 Why is this game hard? (No spoilers)</b></summary>

- The most suspicious-looking suspects have the strongest alibis
- Multiple characters lied — but only one lied to cover a murder
- Two separate financial crimes exist — only one is the motive
- A key piece of volunteered information is the biggest clue
- The "locked room" isn't actually locked the way you think
- Time-of-death estimates are deliberately misleading (but medically accurate)
- The killer never directly lies in any interview

</details>

<details>
<summary><b>🔧 Technical Design Decisions</b></summary>

- **No backend/database** — Everything runs in the browser for free hosting
- **Zustand over Redux** — Simpler API for game state, built-in persist middleware
- **TailwindCSS** — Rapid iteration on the dark theme with custom color palette
- **Framer Motion** — Professional-grade animations without heavy libraries
- **Progressive unlock system** — Evidence prerequisites create natural investigation flow
- **Keyword-based validation** — Accusation text is analyzed for 10 specific logical connections
- **Anti-brute-force** — 3 attempts max, 8/10 connections required, 100-char minimum explanation

</details>

---

## 📄 Tech Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| [React](https://react.dev) | UI Framework | 18.2 |
| [Vite](https://vitejs.dev) | Build Tool | 5.1 |
| [TailwindCSS](https://tailwindcss.com) | Styling | 3.4 |
| [Framer Motion](https://www.framer.com/motion/) | Animations | 11.0 |
| [Zustand](https://zustand-demo.pmnd.rs/) | State Management | 4.5 |
| [Vercel](https://vercel.com) | Hosting | — |

---

<div align="center">

### 🕵️ Can you solve it?

[![Play Now](https://img.shields.io/badge/🔍_BEGIN_INVESTIGATION-silence--protocol.vercel.app-c9a84c?style=for-the-badge)](https://silence-protocol.vercel.app)

<br/>

*Built with ☕ and suspicion.*

<sub>Made by <a href="https://github.com/DEEP248">DEEP248</a></sub>

</div>
