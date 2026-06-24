---
name: recurring-issues
description: Bugs and anti-patterns found across review sessions; track fix status over time
metadata:
  type: project
---

## Flagged in review session 2026-06-25

1. **Seed data bug** — App.jsx line 13: "Freelance Work" has type "expense" but category "salary". Corrupts SpendingChart (salary bar inflated) and Summary totals. Status: OPEN.

2. **Missing number formatting** — Summary.jsx lines 16, 20, 24 and TransactionList.jsx line 51: amounts rendered as `${amount}` with no .toFixed(2) or toLocaleString(). Floating-point results like $3445.1 are possible. Status: OPEN.

3. **Negative balance display** — Summary.jsx line 24: when balance < 0 the template renders `$-570` instead of `-$570`. No negative guard. Status: OPEN.

4. **`window.confirm` in JSX** — TransactionList.jsx line 57: blocks the main thread, unstyled, inaccessible. Status: OPEN.

5. **`handleAdd` uses stale closure** — App.jsx line 21: `setTransactions([...transactions, transaction])` captures the transactions value at render time. Should use the functional updater `setTransactions(prev => [...prev, transaction])`. Same pattern in handleDelete line 25. Status: OPEN.

6. **`categories` duplicated** — TransactionForm.jsx line 3 and TransactionList.jsx line 3 are identical. Should be extracted to src/constants.js. Status: OPEN.

7. **`Date.now()` id collisions** — TransactionForm.jsx line 16: two rapid submits can produce the same id, causing duplicate React keys. Status: OPEN.

8. **Amount input accepts negative/zero values** — TransactionForm.jsx line 41: `type="number"` with no `min` attribute. Status: OPEN.

9. **`outline: none` without replacement** — App.css line 155: removes focus ring from form inputs with no `:focus-visible` fallback (only `:focus` box-shadow, which still fires on click). Accessibility concern. Status: OPEN.

10. **Bar chart includes income-categorised-as-expense** — App.jsx line 13 seed data issue bleeds into SpendingChart. Derived from issue 1. Status: OPEN.
