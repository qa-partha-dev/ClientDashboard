# ClientDashboard — Playwright E2E Tests

End-to-end UI test suite for the **Rahul Shetty Academy** practice e‑commerce client
(`https://rahulshettyacademy.com/client`), built with **Playwright + TypeScript** using
the **Page Object Model** and fixture-based authentication.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev) | Browser automation & test runner |
| TypeScript | Test/page-object language |
| [Allure](https://allurereport.org/) | Rich HTML reporting |
| dotenv | Loads credentials from `.env` |

---

## Project Structure

```
ClientDashboard/
├── tests/              # Spec files (one scenario per file)
├── pages/              # Page Objects (locators + actions)
├── fixtures/           # auth.fixtures.ts — logs in, exposes `homePage`
├── artifacts/          # Per-scenario context + plan notes
├── test-results/       # Traces, screenshots, videos (failures)
├── allure-results/     # Raw Allure data
├── playwright.config.ts
├── .env                # USER_EMAIL / USER_PASSWORD (not committed)
└── AGENTS.md / CLAUDE.md  # Authoring workflow & standards
```

### Page Objects (`pages/`)
`homepage`, `login-page`, `my-cart`, `checkout-page`, `confirmation-page`,
`orders-page`, `order-details-page`, `view-item-page`.

### Tests (`tests/`)
Login, search, view item, add-to-cart, filter by gender / category / price,
empty-cart check, and the full buy-item checkout flow.

---

## Prerequisites

- **Node.js** ≥ 20 (developed on v24)
- Install dependencies and browsers:

```bash
npm install
npx playwright install
```

---

## Configuration

Create a `.env` file in the project root with valid practice-site credentials:

```dotenv
USER_EMAIL=your-email@example.com
USER_PASSWORD=your-password
```

The `homePage` fixture (`fixtures/auth.fixtures.ts`) reads these, logs in once, and
hands each test a ready-to-use, authenticated `HomePage`.

> Key settings in `playwright.config.ts`: `headless: false`, `chromium`, 40s test
> timeout, `screenshot: only-on-failure`, `video: retain-on-failure`,
> `trace: on-first-retry`.

---

## Running Tests

```bash
# All tests
npx playwright test

# A single spec
npx playwright test tests/cart-empty-on-first-open.spec.ts

# List reporter (concise output)
npx playwright test --reporter=list

# Headed / debug / UI mode
npx playwright test --headed
npx playwright test --debug
npx playwright test --ui
```

> 💡 `package.json` currently has no `scripts`. Optional shortcuts:
> ```json
> "scripts": {
>   "test": "playwright test",
>   "test:headed": "playwright test --headed",
>   "report": "playwright show-report",
>   "allure": "allure serve allure-results"
> }
> ```

---

## Reports

```bash
# Playwright HTML report
npx playwright show-report

# Allure report (serve)
npx allure serve allure-results
```

---

## Writing New Tests

This repo follows a strict authoring workflow — see [AGENTS.md](AGENTS.md):

1. **Reuse** existing page objects, fixtures, and test data — don't rewrite patterns.
2. Explore only the target page; the **live page is the source of truth**.
3. Capture a context + plan note in `artifacts/`, then **get human approval** before
   writing code.
4. Keep tests in `tests/`, page objects in `pages/`, data in `test-data/`.
5. Prefer `getByRole` / `getByLabel` / `getByText` / `data-testid` over XPath/CSS
   position. **No hard waits.**
6. Tag each test with a story ID + test case ID for traceability.
7. **Human review is required before merge** — no auto-merge, no self-approval.

---

## Conventions

- **Page Object Model**: locators live in `pages/*`, specs stay declarative.
- **Fixtures over manual login**: import `test` from `fixtures/auth.fixtures.ts`.
- **`test.step(...)`** blocks for readable, traceable reports.
- On failure, classify as: *product defect · test issue · environment issue ·
  insufficient evidence* (inspect trace/screenshot/video/console/network first).
