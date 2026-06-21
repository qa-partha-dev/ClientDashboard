import { test } from '../fixtures/auth.fixtures';
import { expect } from '@playwright/test';
import { MyCart } from '../pages/my-cart';

// Story ID: STORY-CART | Test Case ID: TC-CART-EMPTY-01
// Precondition: fresh login session — nothing added to the cart yet.
test.describe('Cart on first open', () => {
  test('Cart is empty when homepage is opened for the first time', async ({ homePage }) => {
    test.info().annotations.push({ type: 'story', description: 'STORY-CART' });
    test.info().annotations.push({ type: 'testCase', description: 'TC-CART-EMPTY-01' });

    const myCart = new MyCart(homePage.page);

    await test.step('Open homepage (logged in)', async () => {
      await homePage.isLoggedIn();
    });

    await test.step('Open My Cart', async () => {
      await homePage.viewCart();
      await expect(homePage.page.getByRole('heading', { name: 'My Cart' })).toBeVisible();
    });

    await test.step('Cart should be empty', async () => {
      await myCart.expectEmpty();
      expect(await myCart.itemCount()).toBe(0);
    });
  });
});
