import { test } from "../fixtures/auth.fixtures";
import { ViewItemPage } from "../pages/view-item-page";

test.describe.serial("User able to view the item and add to cart", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.isLoggedIn();
    await homePage.viewItem("ADIDAS ORIGINAL");
  });

  test("User able to add the item to cart", async ({ homePage }) => {
    let viewItemPage = new ViewItemPage(homePage.page);
    await viewItemPage.addToCart();
  });

  test("User able to continue shopping", async ({ homePage }) => {
    let viewItemPage = new ViewItemPage(homePage.page);
    await viewItemPage.continueShopping();
    await homePage.isLoggedIn()
  });
});
