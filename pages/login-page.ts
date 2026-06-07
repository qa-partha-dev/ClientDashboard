import { type Page, type Locator, expect } from '@playwright/test';

export class LogIn {
    private readonly userNameSelector : Locator
    private readonly passSelector : Locator
    private readonly  lgnBtn : Locator
    private readonly alertSelector : Locator

    constructor(public readonly page: Page){
        this.userNameSelector = this.page.locator('#userEmail')
        this.passSelector = this.page.locator('#userPassword')
        this.lgnBtn = this.page.locator('#login')
        this.alertSelector = this.page.locator('#toast-container .toast-message')
    }

    async goTo(){
        await this.page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash')
        await expect(this.page).toHaveTitle("Let's Shop")
        console.log('User can see the website')
    }

    async logIn(username: string, password: string){
        await this.userNameSelector.fill(username);
        await this.passSelector.fill(password);
        await this.lgnBtn.click();
    }

    async expectLoginError(message: string) {
        await expect(this.alertSelector).toHaveText(message);
    }
}