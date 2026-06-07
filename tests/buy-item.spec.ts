import { test } from "../fixtures/auth.fixtures";
import { HomePage } from "../pages/homepage";
import { expect } from "@playwright/test";
import { MyCart } from "../pages/my-cart";
import { CheckOut } from "../pages/checkout-page";
import { ConfirmationPage } from "../pages/confirmation-page";
import { OrdersPage } from "../pages/orders-page";
import { OrderDetailsPage } from "../pages/order-details-page";

test.describe("Checkout and buy two products", async () => {
    test("Add two items to cart and go to checkout", async ({ homePage }) => {
      test
        .info()
        .annotations.push({ type: "owner", description: "Partha Saha" });
      test
        .info()
        .annotations.push({ type: "severity", description: "critical" });

      const items = homePage.allItems;
      const myCart = new MyCart(homePage.page);
      const checkOut = new CheckOut(homePage.page);
      let addItems: string[] = [];

      await test.step("Add first two items to cart", async () => {
        for (let i = 0; i < 2; i++) {
          addItems.push(
            (await items.nth(i).locator("//h5/b").textContent()) || "",
          );
          await items.nth(i).locator(HomePage.addToCartBtnSelector).click();
        }
      });

      await test.step("View cart and verify items", async () => {
        await homePage.viewCart();
        await expect(
          homePage.page.getByRole("heading", { name: "My Cart" }),
        ).toBeVisible();
        await (await myCart.cartList())
          .locator("h3")
          .first()
          .waitFor({ state: "visible" });
        const cartItems = (
          await (await myCart.cartList()).locator("h3").allTextContents()
        ).map((name) => name.trim());
        expect(cartItems).toEqual(addItems);
        await myCart.checkoutBtn.click();
      });

      await test.step("Fill checkout details", async () => {
        await checkOut.setCreditCard("4542 9931 9292 2293");
        await checkOut.setCVV("356");
        await checkOut.setNameOnCard("Partha Saha");
        await checkOut.setApplyCoupon("udemy");
        await checkOut.setExpMonth("08");
        await checkOut.setExpYear("18");
        await checkOut.setEmail("qa.partha@gmail.com");
        await checkOut.setCountry("United States");
      });

      await test.step("Place on the order", async () => {
        const confirmationPage = new ConfirmationPage(homePage.page);
        const ordersPage = new OrdersPage(homePage.page);
        const orderDetailsPage = new OrderDetailsPage(homePage.page);

        // Submit the order
        await checkOut.placeOrder();

        // Verify the success message
        const message = await confirmationPage.getSuccessMessage();
        expect(message).toMatch(/THANKYOU FOR THE ORDER/i);

        // Get generated Order ID
        const orderId = await confirmationPage.getOrderId();
        expect(orderId).not.toBe("");

        // Navigate to Orders Dashboard
        await ordersPage.navigateTo();

        // Verify that all purchased items created an entry in the Orders dashboard
        for (const item of addItems) {
          const itemRow = homePage.page.locator("tbody tr").filter({ hasText: item }).first();
          await expect(itemRow).toBeVisible();
        }

        // Verify order row matches ID
        const orderRow = await ordersPage.getOrderRow(orderId);
        await expect(orderRow).toBeVisible();

        // View Order Details for the specific Order ID
        await ordersPage.viewOrder(orderId);

        // Assert we navigated to details view
        await expect(homePage.page).toHaveURL(/.*\/dashboard\/order-details\/.*/);
        
        // Since the app generates one order PER ITEM, this specific order details page 
        // will only display ONE of our items. Let's make sure it's at least one of them.
        let foundMatchingItem = false;
        for (const item of addItems) {
          const isPresent = await orderDetailsPage.isItemPresent(item);
          if (isPresent) {
            foundMatchingItem = true;
            break;
          }
        }
        expect(foundMatchingItem).toBeTruthy();
      });
    });
});
