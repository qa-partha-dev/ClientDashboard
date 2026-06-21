# Context: Filter Items by Sub Category

## Scenario
Mirror of `tests/filter-item-by-gender.spec.ts`, for the **Sub Categories** filter
group in the dashboard sidebar. Verified live via Playwright MCP on
`https://rahulshettyacademy.com/client/#/dashboard/dash` (title "Let's Shop").

- **Auth**: reuse `fixtures/auth.fixtures.ts` (`homePage` fixture; creds from `.env`)
- **Page Object**: extend `pages/homepage.ts` (no new page object)

## Live DOM (discovered)
Sidebar `#sidebar` has filter groups, each a `div.py-2.border-bottom.ml-3` headed
by an `<h6>`: **Price Range**, **Categories**, **Sub Categories**, **Search For**.

The **Sub Categories** group:
```html
<div class="py-2 border-bottom ml-3">
  <h6 class="font-weight-bold">Sub Categories</h6>
  <div id="orange">...</div>
  <div class="form-group ng-star-inserted"><input type="checkbox"><label for="sub">t-shirts</label></div>
  ... (shirts, shoes, mobiles, laptops)
</div>
```
- Checkboxes have **no id/name**; every label is `for="sub"` (non-unique) → `getByLabel` is NOT reliable.
- `shirts` is a substring of `t-shirts` → must use **exact** text matching.
- "Search For" group holds men/women = the existing `menCheckBox`/`womenCheckBox`.

## Locator strategy (AGENTS.md: prefer getByRole/getByText over XPath/CSS-position)
- **Section**: `#sidebar div.border-bottom` filtered by
  `getByRole('heading', { name: 'Sub Categories', exact: true })`.
- **Sub-category checkbox**: within section, the `div.form-group` filtered by
  `getByText(name, { exact: true })`, then `.getByRole('checkbox')`.
- **Empty result**: assert `getAllItemsCount() === 0` (deterministic). The
  "No Products Found" indicator is a **transient toast**
  (`div[aria-label="No Products Found"].toast-title`), so it's a secondary signal only.

## Verified behavior (baseline = 3 products: ADIDAS ORIGINAL, ZARA COAT 3, iphone 13 pro)
| Sub-category | Result count |
|---|---|
| t-shirts | 0 |
| shirts | 0 |
| shoes | 0 |
| **mobiles** | **3** |
| laptops | 0 |

**Rule (confirmed):** only `mobiles` returns products (>0); every other
sub-category returns 0.

## Decisions
- Expected result: per table above (mobiles > 0; t-shirts/shirts/shoes/laptops = 0).
- Traceability IDs: **skipped** per reviewer (diverges from AGENTS.md Code Standards).
