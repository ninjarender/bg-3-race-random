# 🎲 BG3 Random Build Generator — Project Requirements (English)

## 1. Overview

**BG3 Random Build Generator** is a frontend-only web app that generates a **completely random character build** for *Baldur’s Gate 3*.  
It selects random combinations of **race**, **subrace**, **class**, **subclass**, and **background**, while maintaining logical dependencies (e.g., subraces belong to their races).

All data is stored in local static JSON files — no backend or external API is used.

---

## 2. Project Goals

1. Provide a simple one-click tool for generating random BG3 characters.  
2. Display the generated result in an easy-to-read card layout.  
3. Allow users to **share builds via URL** parameters.  
4. Save the **last generated build** in `localStorage`.  
5. Deliver an immersive and fast fan-made experience for Baldur’s Gate 3 players.

---

## 3. Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend Framework** | [React + TypeScript](https://react.dev/) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) |
| **Styling (optional)** | [Tailwind CSS](https://tailwindcss.com/) / shadcn/ui |
| **Routing (optional)** | React Router or simple useState switching |
| **Deployment** | Vercel / GitHub Pages |

---

## 4. Functional Requirements

| # | Feature | Description |
|---|----------|-------------|
| 1 | Random generation | Button **“Generate”** creates a random combination (race, subrace, class, subclass, background). |
| 2 | Dependency logic | Subraces are selected only from their parent race; subclasses only from their parent class. |
| 3 | Result card | Display build details clearly (race → subrace, class → subclass, background). |
| 4 | Regenerate | Press “Generate again” to create a new random build. |
| 5 | Share via URL | Create a URL like `?race=Elf&subrace=Drow&class=Wizard&subclass=Evocation`. |
| 6 | Local storage | Save the last generated build in `localStorage` (`bg3-build`). |
| 7 | Copy to clipboard | Copy the build summary as plain text. |
| 8 | Reset | Clear the current build from memory and UI. |

---

## 5. Non‑Functional Requirements

| Category | Requirement |
|-----------|--------------|
| **Performance** | Random generation ≤ 100 ms. |
| **UX/UI** | Minimalist, BG3‑themed dark design (serif headings, gold tones). |
| **Persistence** | Use `localStorage` for saving build data. |
| **Responsiveness** | Fully usable on desktop and mobile. |
| **Data format** | Valid JSON files under `/src/data/*.json`. |
| **Offline (optional)** | Can be extended to PWA mode. |
| **Internationalization (optional)** | Future support for EN / UK / RU. |

---

## 6. Data Structure

### races.json
```json
[
  { "name": "Elf", "subraces": ["High Elf", "Wood Elf", "Drow"] },
  { "name": "Dwarf", "subraces": ["Gold Dwarf", "Shield Dwarf"] },
  { "name": "Human" },
  { "name": "Githyanki" }
]
```

### classes.json
```json
[
  {
    "name": "Wizard",
    "subclasses": ["Evocation", "Abjuration", "Necromancy"],
    "primaryAbilities": ["Intelligence"]
  },
  {
    "name": "Fighter",
    "subclasses": ["Champion", "Battle Master", "Eldritch Knight"],
    "primaryAbilities": ["Strength", "Dexterity"]
  }
]
```

### backgrounds.json
```json
["Acolyte", "Soldier", "Charlatan", "Outlander", "Sage", "Criminal"]
```

---

## 7. Generation Logic

1. Pick a random **race** from `races.json`.  
2. If that race has **subraces**, pick one randomly.  
3. Pick a random **class** from `classes.json`.  
4. If that class has **subclasses**, pick one randomly.  
5. Pick a random **background** from `backgrounds.json`.  
6. Return a `Build` object:

```json
{
  "race": "Elf",
  "subrace": "Drow",
  "class": "Wizard",
  "subclass": "Evocation",
  "background": "Sage"
}
```

---

## 8. User Interface

### Main Page (Generator)
- **Button:** Generate random build  
- **Result card:** displays generated data  
- **Toolbar:** Generate again · Share · Copy · Reset  

Example output:
```
🧝 Race: Drow (Elf)
⚔️ Class: Wizard — Evocation
🎭 Background: Sage
```

### About Page
> Fan‑made randomizer for Baldur’s Gate 3. Not affiliated with Larian Studios.

---

## 9. Acceptance Criteria (MVP)

✅ Random generation works for all attributes.  
✅ Dependencies (race↔subrace, class↔subclass) are respected.  
✅ Share URLs function correctly.  
✅ Build persists via `localStorage`.  
✅ UI adapts to mobile screens.  
✅ No TypeScript compilation errors (`tsc --noEmit`).  

---

## 10. Future Enhancements

- [ ] “Constrained randomness” — e.g. generate only elves, or only spellcasters.  
- [ ] Attribute rolls (STR/DEX/CON/INT/WIS/CHA).  
- [ ] Save favorite builds (local presets).  
- [ ] Add background art and class/race icons.  
- [ ] Thematic filters (e.g. “evil”, “holy”, “chaotic”).  
- [ ] Simple synergy score between race/class combos.  

---

## 11. License & Credits

**Author:** Vadym Kruchyna  
**License:** MIT  
**Date:** 2025‑10‑18  

> This project is a **fan‑made tool** for *Baldur’s Gate 3* players.  
> Not affiliated with **Larian Studios** or **Wizards of the Coast**.  
