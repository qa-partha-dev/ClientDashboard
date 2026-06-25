# Context: Cart Is Empty on First Open

## Scenario
When a user opens the homepage / dashboard for the first time (fresh session,
nothing added), the **My Cart** page should be empty.

Verified live via Playwright MCP on
`https://rahulshettyacademy.com/client/#/dashboard/dash` (title "Let's Shop").
Cart route: `https://rahulshettyacademy.com/client/#/dashboard/cart`.

- **Auth**: reuse `fixtures/auth.fixtures.ts` (`homePage` fixture; creds from `.env`).
  The fixture logs in and lands on the dashboard — this *is* "open homepage".
- **Navigate to cart**: reuse `HomePage.viewCart()` (clicks the header **Cart** button)
  — no new navigation helper needed.
- **Page Object**: `pages/my-cart.ts` (needs one small empty-state addition, below).

## Live DOM (discovered, logged-in)
Header nav `<nav>` list items: `HOME`, `ORDERS`, `Cart`, `Sign Out`
(the `Cart` button = `getByRole('button', { name: 'Cart' })`).

Empty **My Cart** page:
```html
<div class="...">
  <h1>My Cart</h1>
  <button>Continue Shopping❯</button>
  <h1>No Products in Your Cart !</h1>   <!-- empty-state indicator -->
</div>
```
- Empty-state heading text: **`No Products in Your Cart !`** (stable `<h1>`).
- When the cart is empty, **`div.cart ul` does NOT exist** → cart item count `= 0`.
  (`MyCart.cartList()` currently points at `//div[@class='cart']/ul`, which only
  renders when items exist.)
- No numeric cart-count badge is present in the header.

## Success indicators (for assertions)
1. **Primary**: `getByRole('heading', { name: 'No Products in Your Cart !' })` is visible.
2. **Secondary**: cart item count `= 0` (the `div.cart ul li` list is absent/empty).

## Reuse map (no new framework, no rewrites)
| Need | Reuse |
|------|-------|
| Login + open homepage | `homePage` fixture (`fixtures/auth.fixtures.ts`) |
| Go to cart | `HomePage.viewCart()` |
| Cart page object | `pages/my-cart.ts` (add empty-state locator + 1 method) |

## ⚠️ Precondition / Gap (important)
The test account (`qa.partha@gmail.com`) is **shared** and cart state can persist.
- `tests/buy-item.spec.ts` checks out → leaves cart empty (good).
- `tests/add-to-cart-from-homepage.spec.ts` adds an item and **never removes it**
  → if that test runs first against the same account, the cart will **not** be empty
  and this test would (correctly) fail as a state-pollution issue, not a product defect.

At time of exploration the live cart was confirmed **empty**.
Decision needed: treat "empty cart" as a precondition (run in isolation) — see plan.
