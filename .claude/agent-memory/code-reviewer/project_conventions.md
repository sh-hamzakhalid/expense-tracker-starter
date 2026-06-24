---
name: project-conventions
description: Established style and architecture decisions observed in this codebase
metadata:
  type: project
---

- Flat CSS in src/App.css — no CSS modules, no utility framework. CSS class names use kebab-case.
- No prop-types, no TypeScript. Do not recommend adding them unless asked.
- No memoization (React.memo / useMemo / useCallback) has been introduced yet. Flag only where there is a real perf risk, not as a blanket suggestion.
- `categories` array is duplicated in TransactionForm.jsx and TransactionList.jsx — a known extraction opportunity flagged in review session 2026-06-25.
- delete-btn CSS class existed before delete logic was wired; now wired in TransactionList.jsx as of commit b9df8b4.
- App.jsx holds all transaction state and passes onDelete down to TransactionList.
- Summary.jsx is purely derived — no local state.
- SpendingChart.jsx uses recharts BarChart; tooltipStyle object is module-level (not recreated per render).
- Amount formatting inconsistency: SpendingChart tooltip uses .toFixed(2); Summary and TransactionList use bare template literals with no decimal formatting — flagged 2026-06-25.
