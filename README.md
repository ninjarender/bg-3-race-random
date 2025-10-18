# 🎲 BG3 Random Build Generator

A fan-made web app that generates completely random character builds for **Baldur's Gate 3**.

## ✨ Features

- 🎲 **One-click random generation** — Generate race, subrace, class, subclass, and background
- 🔗 **Share builds via URL** — Share your build with friends using URL parameters
- 📋 **Copy to clipboard** — Copy build details as formatted text
- 💾 **Auto-save** — Last generated build saved to localStorage
- 🌙 **BG3-themed dark UI** — Immersive design with gold accents
- 📱 **Fully responsive** — Works on desktop and mobile

## 🚀 Tech Stack

- **React** + **TypeScript** — Type-safe component development
- **Vite** — Lightning-fast build tool
- **Zustand** — Lightweight state management
- **Tailwind CSS** — Utility-first styling
- **localStorage** — Build persistence

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎮 How to Use

1. Click **"Generate Random Build"** to create a new character
2. Click **"Generate Again"** to create another build
3. Click **"Share URL"** to copy a shareable link
4. Click **"Copy Build"** to copy build details as text
5. Click **"Reset"** to clear the current build

## 📊 Data Structure

The app uses local JSON files for all game data:

- `src/data/races.json` — All BG3 races and subraces
- `src/data/classes.json` — All BG3 classes and subclasses
- `src/data/backgrounds.json` — All BG3 backgrounds

## 🔧 Project Structure

```
src/
├── components/        # React components
│   └── BuildCard.tsx # Build result display
├── data/             # Game data JSON files
│   ├── races.json
│   ├── classes.json
│   └── backgrounds.json
├── store/            # Zustand state management
│   └── useBuildStore.ts
├── types/            # TypeScript types
│   └── index.ts
├── utils/            # Helper functions
│   └── buildGenerator.ts
├── App.tsx           # Main app component
├── main.tsx          # App entry point
└── index.css         # Global styles
```

## 🎯 Acceptance Criteria (MVP)

✅ Random generation works for all attributes  
✅ Dependencies (race↔subrace, class↔subclass) are respected  
✅ Share URLs function correctly  
✅ Build persists via localStorage  
✅ UI adapts to mobile screens  
✅ No TypeScript compilation errors

## 📝 License

MIT License

## 👨‍💻 Author

**Vadym Kruchyna**  
2025

---

> **Disclaimer:** This is a fan-made tool for *Baldur's Gate 3* players.  
> Not affiliated with **Larian Studios** or **Wizards of the Coast**.
