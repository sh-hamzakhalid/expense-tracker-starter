# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build
npm run lint      # run ESLint
npm run preview   # preview production build locally
```

There are no tests in this project.

## Architecture

This is a single-page React app (Vite + React 19) with no routing, no state management library, and no backend. All state lives in `App.jsx` via `useState`.

**Key facts about `src/App.jsx`:**
- All application logic is in one file — there are no sub-components yet.
- `transactions` is an array of objects: `{ id, description, amount, type, category, date }`.
- `amount` is stored as a **string**, not a number — this is an intentional bug in the starter project that causes incorrect totals (string concatenation instead of addition in `reduce`).
- `totalIncome`, `totalExpenses`, and `balance` are derived directly from `transactions` on every render.
- Filtering by type and category is done in-place with two sequential `.filter()` calls.

**Styling:** `src/App.css` contains all styles (flat, no CSS modules or utility framework). `src/index.css` holds global resets/defaults. CSS class `.delete-btn` exists in the stylesheet but is not yet wired up in the JSX.
