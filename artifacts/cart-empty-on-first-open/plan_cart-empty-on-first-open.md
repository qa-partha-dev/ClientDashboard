# Plan: Cart Is Empty on First Open

Reuses the `homePage` fixture and `HomePage.viewCart()`. Adds one small empty-state
helper to the existing `pages/my-cart.ts`. No new framework, no rewrites, no hard waits.

## 1. Extend `pages/my-cart.ts` (Page Object — minimal)
- Add locator:
  - `emptyCartMessage = page.getByRole('heading', { name: 'No Products in Your Cart !' })`
- Add methods:
  - `async expectEmpty()` — assert `emptyCartMessage` is visible.
  - `async itemCount(): Promise<number>` — return `div.cart ul li` count (0 when empty).
- Keep existing `checkoutBtn` / `cartList()` untouched.

## 2. New spec `tests/cart-empty-on-first-open.spec.ts`
- `import { test } from '../fixtures/auth.fixtures'` + `expect` from `@playwright/test`.
- `import { MyCart } from '../pages/my-cart'`.
- Stamp **story ID + test case ID** (per AGENTS.md) via `test.info().annotations`
  — see open question #1 for the values.
- Single test, `test.step` blocks:
  - **Step A — open homepage**: `await homePage.isLoggedIn()` (fixture already logged
    in and landed on dashboard).
  - **Step B — open cart**: `await homePage.viewCart()`;
    assert `getByRole('heading', { name: 'My Cart' })` is visible.
  - **Step C — assert empty**:
    - `await myCart.expectEmpty()` (primary indicator), and
    - `expect(await myCart.itemCount()).toBe(0)` (secondary indicator).

## 3. Run & report
- `npx playwright test tests/cart-empty-on-first-open.spec.ts --reporter=list`.
- On failure: inspect trace/screenshot/video/console/network; classify as
  product defect / test issue / environment issue / insufficient evidence.
- Human review required before merge (no auto-merge, no self-approval).

## ⚠️ Needs your confirmation before I write code (AGENTS.md step 8)
| # | Item | Default I'll use if you don't specify |
|---|------|----------------------------------------|
| 1 | **Story / Test Case ID** | placeholder `STORY-CART` / `TC-CART-EMPTY-01` |
| 2 | **Shared-cart precondition** (see context Gap) | document as a precondition + keep both assertions; do NOT auto-clear the cart. Tell me if you'd rather the test first empty the cart via API/UI to make it self-contained. |
