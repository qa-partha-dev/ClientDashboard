import { test} from '../fixtures/auth.fixtures';

test('Add a item to the cart form homepage', async ({ homePage }) => {
    await homePage.isLoggedIn();
    await homePage.addToCart("ADIDAS ORIGINAL");
});