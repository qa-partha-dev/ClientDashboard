import { Locator, Page } from "@playwright/test";

export class MyCart{
    public readonly checkoutBtn: Locator
    private readonly itemsAdded: Locator 

    constructor(public readonly page: Page){
        this.checkoutBtn = this.page.getByRole('button', {name: 'Checkout'})
        this.itemsAdded = this.page.locator("//div[@class='cart']/ul")
    }

    async cartList(): Promise <Locator> {
        return this.itemsAdded;
    }
}