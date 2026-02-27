<div align="center">

# 🔍 Detective Duniya

### *Think Deep. Doubt Everyone.*

[![Live Demo](https://img.shields.io/badge/▶_PLAY_NOW-detective--duniya.vercel.app-c9a84c?style=for-the-badge&logo=vercel&logoColor=white)](https://detective-duniya.vercel.app)

[![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Zustand](https://img.shields.io/badge/Zustand-443E38?style=flat-square&logo=npm&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?style=flat-square&logo=vercel&logoColor=white)](https://detective-duniya.vercel.app)

<br/>

*Interactive mystery stories made for smart minds.*
*Investigate. Interrogate. Deduce.*

<br/>

<img src="https://img.shields.io/badge/Episodes-3_Available-c9a84c?style=for-the-badge" alt="Episodes"/>
<img src="https://img.shields.io/badge/Playtime-15--45_min-8b6f9e?style=for-the-badge" alt="Playtime"/>
<img src="https://img.shields.io/badge/No_Backend-100%25_Frontend-2ea043?style=for-the-badge" alt="Frontend Only"/>

</div>

---

## 📖 Episodes

### Episode 1: 🕯️ The Last Candle
> **Setting:** Hale Manor, English countryside
>
> A dinner party at an English manor turns deadly. The host, **Victor Hale**, is found dead in a locked library during a blackout. The fireplace poker is missing. The window was locked from inside. **6 suspects. One truth.**

### Episode 2: ☠️ The Silent Poison
> **Setting:** Malhotra Haveli, Jaipur, Rajasthan
>
> A businessman collapses after drinking saffron milk at a lavish engagement ceremony. The poison was in his glass only. The CCTV footage from the critical 10 minutes is missing. **7 suspects. One killer.**

### Episode 3: 🎂 The Blackout Birthday ⚡ NEW
> **Setting:** Penthouse apartment, Bandra, Mumbai
>
> A birthday party for **Sanya Mehra** — tech founder turning 30. Five guests. A **real-time countdown**. At minute 10, the lights go out. At minute 11, the host is dead with a cake knife in her chest. **5 suspects. 2 interactive puzzles. Fast-paced.**
>
> 🎮 *New game mode: Real-time room navigation, blackout flashlight effect, phone unlock & torn paper puzzles*

### Episode 4–10: 🔒 Coming Soon
> New episodes added regularly. Each is a self-contained mystery you can play in any order.

---

## 🎮 How to Play

1. **Choose a Case** — Pick any episode from the homepage
2. **Gather Evidence** — Examine clues; each one unlocks new findings
3. **Interrogate Suspects** — Question everyone; look for contradictions
4. **Study the Timeline** — Map every movement during the critical window
5. **Make Your Accusation** — Select the killer. You have **3 attempts**.

### 🆘 Stuck?
- **Use Hints (💡)** — Progressive clues that guide you (costs score points)
- **Reveal Solution** — Click "Reveal Full Solution" in the hint menu to see the full answer

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 🧩 **Deep Investigation** | 5–20 evidence items per episode, progressive unlocking, red herrings |
| 👥 **Complex Suspects** | 5–7 suspects with detailed profiles, interviews, and hidden motives |
| ⏱️ **Real-Time Mode** | Live countdown, room navigation, suspects move based on timeline (Ep3) |
| 🌑 **Blackout Event** | Screen goes dark, flashlight follows cursor, cinematic audio cues (Ep3) |
| 🧩 **Interactive Puzzles** | Phone unlock pattern & torn paper assembly mini-games (Ep3) |
| ⏱️ **Timeline Analysis** | Chronological events with timestamps and contradictions (Ep1–2) |
| 🔗 **Relationship Map** | Visual web of connections, tensions, and secrets between characters |
| ⚖️ **Accusation System** | Select the killer — 3 attempts max, no brute force |
| 💡 **Hint System** | Progressive hints + full solution reveal as last resort |
| 📝 **Detective's Notebook** | Personal notes that save automatically |
| 💾 **Auto-Save** | Progress saved per episode to localStorage |
| 🔐 **Anti-Cheat** | Answers encrypted in bundle — no plain-text spoilers in source code |

---

## 🏗️ Architecture

```
src/
├── 📁 episodes/              # Episode data (scalable to 10+)
│   ├── index.js              # Episode registry + loader
│   ├── episode1/             # Classic investigation mode
│   │   ├── data/             # suspects, evidence, timeline, relationships
│   │   └── logic/            # puzzleLogic (encrypted, hints, reveal)
│   ├── episode2/             # Classic investigation mode
│   │   ├── data/
│   │   └── logic/
│   └── episode3/             # ⚡ Real-time mode (new!)
│       ├── data/             # + rooms.js for navigable locations
│       ├── logic/
│       └── components/       # RealTimeSection, BlackoutOverlay, Puzzles
│
├── 📁 pages/                 # Top-level pages
│   └── HomePage.jsx          # Hero, episode grid, features
│
├── 📁 sections/              # Game screens (classic mode)
│   ├── IntroSection.jsx      # Cinematic typewriter intro
│   ├── BriefingSection.jsx   # Case briefing pages
│   └── InvestigationSection.jsx  # Main workspace (6 tabs)
│
├── 📁 components/            # Reusable UI components
│   ├── AccusationPanel.jsx   # Suspect selection + reveal
│   ├── HintSystem.jsx        # Hints + solution reveal
│   └── ...                   # Evidence, Suspects, Timeline, etc.
│
├── 📁 utils/                 # Crypto utilities (answer encryption)
│   └── crypto.js
│
├── 📁 store/                 # Zustand state (episode-aware)
│   └── gameStore.js          # Per-episode save, dynamic data
│
└── App.jsx                   # Router: classic vs real-time mode
```

> **Key design:** All components read data from the store's `episodeData` — no hardcoded imports. Adding a new episode requires only creating data files and registering in `episodes/index.js`.

---

## 🚀 Quick Start

```bash
git clone https://github.com/DEEP248/Detective.git
cd Detective
npm install
npm run dev
```

## 🌐 Deployment

```bash
# Deploy to Vercel
npx vercel --prod

# Or build for any static host
npm run build    # → dist/ folder
```

---

## 📋 Adding a New Episode

1. Create `src/episodes/episodeN/data/` with `suspects.js`, `evidence.js`, `timeline.js`, `relationships.js`
2. Create `src/episodes/episodeN/logic/puzzleLogic.js` with validation, hints, and reveal data
3. Add static imports and episode metadata to `src/episodes/index.js`
4. That's it — the homepage and all components auto-adapt

---

## 🗺️ Roadmap

| Phase | Status | Details |
|-------|--------|---------|
| Episodes 1–3 | ✅ Done | The Last Candle + The Silent Poison + The Blackout Birthday |
| Episodes 4–10 | 🔄 In Progress | New episode added regularly |
| Scalability | 📋 Planned | Lazy loading after 10 episodes |
| User Accounts | 📋 Planned | Login, save progress to cloud |
| Payments | 📋 Planned | Premium episodes, subscriptions |
| Backend | 📋 Planned | API, database, analytics |
| Leaderboard | 📋 Planned | Global rankings, scores |
| Daily Challenge | 📋 Planned | Mini-mystery every day |

---

## 📄 Tech Stack

| Technology | Purpose |
|-----------|---------|
| [React 18](https://react.dev) | UI Framework |
| [Vite 5](https://vitejs.dev) | Build Tool |
| [TailwindCSS 3](https://tailwindcss.com) | Styling |
| [Framer Motion 11](https://www.framer.com/motion/) | Animations |
| [Zustand 4](https://zustand-demo.pmnd.rs/) | State Management |
| [Vercel](https://vercel.com) | Hosting |

---

<div align="center">

### 🕵️ Can you solve it?

[![Play Now](https://img.shields.io/badge/🔍_BEGIN_INVESTIGATION-detective--duniya.vercel.app-c9a84c?style=for-the-badge)](https://detective-duniya.vercel.app)

<br/>

*Built with ☕ and suspicion.*

<sub>Made by <a href="https://github.com/DEEP248">DEEP248</a></sub>

</div>
