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

This is a single-page React app (Vite + React 19) with no routing, no state management library, and no backend.

**Component tree:**
```
App
├── Summary
├── TransactionForm
└── TransactionList
```

**State ownership:**
- `App.jsx` — holds the single `transactions` array (objects: `{ id, description, amount, type, category, date }`). Passes it down as props and passes `onAdd` to `TransactionForm`.
- `TransactionForm.jsx` — owns its own form field state. Calls `onAdd(transaction)` on submit; `amount` is stored as a number (`parseFloat`).
- `TransactionList.jsx` — owns `filterType` and `filterCategory` state. Applies two sequential `.filter()` calls to derive the visible list.
- `Summary.jsx` — derives `totalIncome`, `totalExpenses`, and `balance` from the `transactions` prop on every render.

**Styling:** `src/App.css` contains all styles (flat, no CSS modules or utility framework). `src/index.css` holds global resets/defaults. CSS class `.delete-btn` exists in the stylesheet but is not yet wired up in any component.
