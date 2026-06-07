import {Locator, Page} from '@playwright/test'

export class ViewItemPage{
    private readonly continueShopBtn : Locator
    private readonly addToCartBtn : Locator
    constructor(public readonly page: Page){
        this.continueShopBtn= page.getByRole('link', { name: 'Continue Shopping' })
        this.addToCartBtn = page.getByRole('button', { name: 'Add to Cart' })
    }
    async continueShopping(){
        await this.continueShopBtn.waitFor({state: 'visible'})
        await this.continueShopBtn.click();
    }
    async addToCart(){
        await this.addToCartBtn.waitFor({state: 'visible'})
        await this.addToCartBtn.click();
    }

}