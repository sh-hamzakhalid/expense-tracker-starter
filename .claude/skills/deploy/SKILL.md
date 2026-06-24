---
description: Deploy to staging — lint, build production bundle, push to staging remote
---

# Deploy

Run these steps in order. Stop immediately and report the failure if any step exits non-zero — do not proceed to the next step.

## Step 1 — Tests / lint

This project has no test suite yet. Run lint as the quality gate:

```bash
npm run lint
```

When a test script is added to `package.json`, run it here before lint:

```bash
npm test
npm run lint
```

## Step 2 — Production build

```bash
npm run build
```

Confirm the `dist/` directory was created and is non-empty. If the build emits warnings about bundle size or missing assets, surface them to the user before continuing.

## Step 3 — Push to staging

```bash
git push staging main
```

The staging remote must be configured in this repo (`git remote -v` to verify). If it is missing, stop and tell the user:

> No `staging` remote found. Add one with:
> `git remote add staging <your-staging-url>`

## Reporting

After a successful deploy, report:
- Which commit SHA was pushed (`git rev-parse --short HEAD`)
- The staging URL if known
- Any build warnings surfaced in Step 2

If any step failed, report the exact error output and which step failed so the user can fix it and re-run `/deploy`.
