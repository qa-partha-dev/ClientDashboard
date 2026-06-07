import { expect, type Page, type Locator } from "@playwright/test";
import { LogIn } from "./login-page";

export class HomePage {
  private readonly signOutBtn: Locator;
  private readonly addToCartBtn: Locator;
  public readonly allItems: Locator;
  private readonly minTextInput : Locator;
  private readonly maxTextInput : Locator;
  private readonly searchTextInput: Locator
  private readonly viewCartBtn: Locator;
  private static readonly productNameSelector = 'h5 > b';
  public static readonly addToCartBtnSelector = "button:has-text('Add To Cart')";
  private static readonly viewBtnSelector = "button:has-text('View')";
  

  constructor(public readonly page: Page) {
    this.signOutBtn = this.page.getByRole("button", { name: "Sign Out" });
    this.addToCartBtn = this.page.locator('//div/div/button[2]');
    this.allItems = this.page.locator("//div[@class='container']/div[@class='row']/div");
    this.minTextInput = this.page.getByRole('textbox', { name: 'Min Price' });
    this.maxTextInput = this.page.getByRole('textbox', { name: 'Max Price' });
    this.searchTextInput = this.page.getByRole('textbox', { name: 'search' });
    this.viewCartBtn = this.page.locator('//ul/li[4]/button');
  }

  async isLoggedIn(): Promise<boolean> {
    return this.signOutBtn.isVisible();
  }

  // Private helper to find an item card by name
  private async findItemByName(itemName: string): Promise<Locator> {
    await this.allItems.first().waitFor({ state: 'visible' });
    const items = this.allItems;
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const nameLocator = item.locator(HomePage.productNameSelector);
      await nameLocator.waitFor({ state: 'visible' });
      const name = await nameLocator.textContent();

      if (name && name.trim() === itemName) {
        return item;
      }
    }
    throw new Error(`Item with name "${itemName}" not found`);
  }
  async getAllItemsCount(): Promise<number>{
    const count= this.allItems.count();
    return count;
  }

  async addToCart(itemName: string) {
    const item = await this.findItemByName(itemName);
    const addToCartBtn = item.locator(HomePage.addToCartBtnSelector);
    await addToCartBtn.click();
  }

  async viewItem(itemName: string) {
    const item = await this.findItemByName(itemName);
    const viewBtn = item.locator(HomePage.viewBtnSelector);
    await viewBtn.click();
  }

  async filterItemByMinMax(min: string, max:string){
    await this.minTextInput.fill(min)
    await this.maxTextInput.fill(max)
    await this.page.keyboard.press('Enter')
    await this.page.waitForTimeout(500);
  }

  async searchItemByName(itemName: string){
    await this.searchTextInput.fill(itemName);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(500);
    const names = await this.page.$$eval('h5 > b', els => els.map(el => el.textContent?.trim()));
for (const name of names) {
  expect(name).not.toBe('');
}
  }

  async viewCart(){
    await this.viewCartBtn.click();
  }
    
}
