# Pumping Lemma Simulator

An interactive two-page web app for learning and exploring the Pumping Lemma in formal language theory. Built with React + Vite.

---

## What's inside

- **Learn Page** — 5 unlockable lessons with interactive pump demos and quizzes
- **Simulator Page** — generate splits, auto-prove non-regularity, explore y-pumping visually with animated character blocks

---

## Prerequisites

You need **Node.js** installed. Download it from https://nodejs.org (choose the LTS version).

To check if you already have it:
```
node -v
npm -v
```

---

## How to run

### Step 1 — Open the project in VS Code

Open VS Code, then go to **File → Open Folder** and select the `pumping-lemma-simulator` folder.

### Step 2 — Open the terminal

In VS Code, press **Ctrl + ` ** (backtick) to open the integrated terminal.

### Step 3 — Install dependencies

```bash
npm install
```

This downloads React, Vite, and all required packages into a `node_modules` folder. Takes about 30 seconds.

### Step 4 — Start the development server

```bash
npm run dev
```

You'll see output like:
```
  VITE v5.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
```

### Step 5 — Open in browser

Go to **http://localhost:5173** in your browser. The app loads instantly.

---

## Building for production

To create a production-ready bundle:

```bash
npm run build
```

Output goes into the `dist/` folder. You can deploy that folder to any static host (Netlify, Vercel, GitHub Pages, etc.).

To preview the production build locally:

```bash
npm run preview
```

---

## Project structure

```
pumping-lemma-simulator/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies & scripts
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # Page router (learn ↔ simulator)
    ├── index.css               # Global CSS variables & resets
    ├── data/
    │   └── lessons.js          # All 5 lesson content & quiz data
    ├── utils/
    │   └── languages.js        # Language definitions, validators, split generator
    └── components/
        ├── ParticlesCanvas.jsx         # Animated background
        ├── LearnPage.jsx               # Learn page layout & XP system
        ├── LearnPage.module.css
        ├── LessonCard.jsx              # Individual lesson with quiz
        ├── LessonCard.module.css
        ├── PumpDemo.jsx                # Interactive pump-k demo
        ├── PumpDemo.module.css
        ├── SimulatorPage.jsx           # Full simulator
        └── SimulatorPage.module.css
```

---

## Supported languages

| Language | Type |
|---|---|
| aⁿbⁿ | Non-regular (classic) |
| aⁿb²ⁿ | Non-regular |
| aⁿbⁿcⁿ | Context-sensitive |
| 0s = 1s | Non-regular |
| Palindrome | Non-regular |
| aⁿbᵐ | Regular ✓ |

---

## Troubleshooting

**`npm install` fails** → Make sure Node.js is installed and you're inside the project folder.

**Port 5173 is busy** → Vite will automatically try 5174, 5175, etc. Check the terminal output.

**Fonts not loading** → You need an internet connection the first time (Google Fonts). After that, the browser caches them.
