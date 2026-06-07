import { test as base } from '@playwright/test';
import { LogIn } from '../pages/login-page';
import { HomePage } from '../pages/homepage';
import * as dotenv from 'dotenv';

dotenv.config();

type myFixture = {
  homePage: HomePage;
}

export const test = base.extend<myFixture>({
  
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    const loginPage = new LogIn(page);
    await loginPage.goTo();
    if (!(await homePage.isLoggedIn())) {
      const loginPage = new LogIn(page);
      await loginPage.logIn(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
    }
    await use(homePage);
  },
});