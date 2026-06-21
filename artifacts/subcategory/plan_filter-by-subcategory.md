# Plan: Filter Items by Sub Category

Mirrors `tests/filter-item-by-gender.spec.ts`. Reuses the `homePage` fixture and
extends `pages/homepage.ts`. No new framework, no new page object.

## 1. Extend `pages/homepage.ts` (Page Object)
- Add a parameterized locator/method for the **Sub Categories** filter group:
  - `checkSubCategory(name: string)` — find the sub-category row by its label text
    within `#sidebar form`, click its checkbox, assert it is checked.
    Prefer `getByRole('checkbox')` / `getByText(name)` over `nth-child`.
- Reuse existing `getAllItemsCount()` and `expectNoProductsFound()` for assertions.

## 2. New spec `tests/filter-item-by-subcategory.spec.ts`
- `import { test } from '../fixtures/auth.fixtures'` + `expect` from `@playwright/test`.
- Stamp **story ID + test case ID** via `test.info().annotations` (per AGENTS.md).
- `test.describe('Filter Item by Sub Category')` with `test.step` blocks, e.g.:
  - **Step A** — select sub-category `<A>`:
    `isLoggedIn()` → `checkSubCategory('<A>')` →
    assert grid via `getAllItemsCount()` (or `expectNoProductsFound()`).
  - **Step B** — select sub-category `<B>`:
    `isLoggedIn()` → `checkSubCategory('<B>')` →
    `await expect.poll(() => homePage.getAllItemsCount())` matches expected.

## 3. Run & report
- `npx playwright test tests/filter-item-by-subcategory.spec.ts --reporter=list`.
- On failure: inspect trace/screenshot/video/console/network; classify as
  product defect / test issue / environment issue / insufficient evidence.
- Human review required before merge (no auto-merge, no self-approval).

## ⚠️ Needs your confirmation before I write code (AGENTS.md step 8)
| # | Item | Default I'll use if you don't specify |
|---|------|----------------------------------------|
| 1 | Which **sub-category(ies)** to filter by | the first two real sub-categories shown in the live sidebar |
| 2 | **Expected result** per sub-category | items `> 0` for a populated sub-category; `0` + "No Products Found" if empty |
| 3 | **Story / Test Case ID** | placeholder `STORY-SUBCAT` / `TC-SUBCAT-01` |

Exact sidebar labels + checkbox locator will be confirmed against the live page
while implementing/running (or tell me the labels and I'll hardcode them).
