import { test, expect } from '@playwright/test';
import { LogIn } from '../pages/login-page';

test('shows error for invalid login', async ({ page }) => {
    const loginPage = new LogIn(page);
    await loginPage.goTo();
    await loginPage.logIn('qa.partha@gmail.com', 'Buildempire1');
    await loginPage.expectLoginError(' Incorrect email or password. ');
});