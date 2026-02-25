# The Silence Protocol – Episode 1: The Last Candle

An immersive, interactive detective mystery game built with React 18. Investigate a locked-room murder at a private dinner party and identify the killer through logic, evidence analysis, and deductive reasoning.

## 🎮 Game Overview

**Setting:** A private dinner party at Hale Manor. During a storm, the power goes out. When it returns 15 minutes later, the host Victor Hale is found dead in the library. The window was locked from the inside. No forced entry. Six suspects. One truth.

**Playtime:** 40–45 minutes for a thorough investigation.

**Difficulty:** Hard. No shortcuts, no easy guessing, no brute force. You must connect at least 8 of 10 logical evidence points to solve the case.

## 🛠 Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool
- **TailwindCSS 3** — Styling
- **Framer Motion 11** — Animations
- **Zustand 4** — State management with localStorage persistence
- **No backend** — 100% frontend, static deployment

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AccusationPanel.jsx  # Suspect selection & explanation validation
│   ├── EvidenceCard.jsx     # Evidence board card
│   ├── EvidenceViewer.jsx   # Full evidence detail modal
│   ├── HintSystem.jsx       # Progressive hints with score penalties
│   ├── Modal.jsx            # Reusable animated modal
│   ├── Notepad.jsx          # Player's detective notebook
│   ├── PoliceReport.jsx     # Official police report view
│   ├── RelationshipMap.jsx  # Suspect relationship web
│   ├── SuspectCard.jsx      # Suspect grid card
│   ├── SuspectProfile.jsx   # Detailed suspect profile with interviews
│   └── TimelineBoard.jsx    # Event timeline visualization
├── sections/            # Major game sections
│   ├── IntroSection.jsx     # Cinematic intro with typewriter text
│   ├── BriefingSection.jsx  # Case briefing (victim, scene, mission)
│   └── InvestigationSection.jsx  # Main investigation workspace
├── data/                # Game data (immutable)
│   ├── suspects.js          # 6 suspect profiles, alibis, interviews
│   ├── evidence.js          # 20 evidence items with prerequisites
│   ├── timeline.js          # Timeline events + hidden true timeline
│   └── relationships.js     # Relationship network data
├── logic/               # Puzzle logic (separate from UI)
│   └── puzzleLogic.js       # 10 logic connections, accusation validation, hints
├── store/               # State management
│   └── gameStore.js         # Zustand store with localStorage persistence
├── animations/          # Framer Motion configuration
│   └── variants.js          # Animation presets and variants
├── utils/               # Utility functions
│   └── helpers.js           # Formatting and class utilities
├── App.jsx              # Root component with section routing
├── main.jsx             # React entry point
└── index.css            # Global styles and Tailwind configuration
```

## 🎯 Game Features

### Core Mechanics
- **Evidence Board** — 20 pieces of evidence across 5 categories with progressive unlocking
- **Suspect Interviews** — Interactive Q&A with 6 suspects, each with 5-8 questions
- **Timeline Reconstruction** — Chronological event board with critical markers
- **Relationship Map** — Visual connection web between all suspects and victim
- **Police Report** — Official incident documentation
- **Detective's Notebook** — Personal note-taking for theories and connections

### Puzzle Design
- **Progressive Unlocking** — Some evidence only appears after reviewing prerequisite clues
- **Red Herrings** — Multiple suspects appear more guilty than the killer
- **10 Logic Connections** — The player must identify and explain at least 8 to solve the case
- **Anti-Brute Force** — 3 accusation attempts maximum, detailed explanation required
- **Hint System** — 8 progressive hints available at score cost

### Technical
- **localStorage Persistence** — Game progress auto-saves
- **Responsive Design** — Works on desktop and mobile
- **Smooth Animations** — Professional Framer Motion transitions

## 🌐 Deployment (Vercel)

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: GitHub Integration
1. Push this repository to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy

The app will be available at your Vercel URL instantly. No backend needed.

## 📜 License

MIT
