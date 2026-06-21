import { Locator, Page, expect } from "@playwright/test";

export class MyCart{
    public readonly checkoutBtn: Locator
    private readonly itemsAdded: Locator
    private readonly emptyCartMessage: Locator

    constructor(public readonly page: Page){
        this.checkoutBtn = this.page.getByRole('button', {name: 'Checkout'})
        this.itemsAdded = this.page.locator("//div[@class='cart']/ul")
        this.emptyCartMessage = this.page.getByRole('heading', { name: 'No Products in Your Cart !' })
    }

    async cartList(): Promise <Locator> {
        return this.itemsAdded;
    }

    async expectEmpty(): Promise<void> {
        await expect(this.emptyCartMessage).toBeVisible();
    }

    async itemCount(): Promise<number> {
        return this.page.locator("div.cart ul li").count();
    }
}