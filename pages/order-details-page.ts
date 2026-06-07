import { Page, Locator } from "@playwright/test";

export class OrderDetailsPage {
  private readonly itemTitles: Locator;

  constructor(public readonly page: Page) {
    this.itemTitles = this.page.locator(".title");
  }

  async isItemPresent(itemName: string): Promise<boolean> {
    const item = this.itemTitles.filter({ hasText: new RegExp(itemName, 'i') });
    try {
      await item.first().waitFor({ state: "visible", timeout: 5000 });
      return true;
    } catch {
      // Fallback if .title class doesn't match for some reason
      try {
        await this.page.getByText(itemName, { exact: false }).first().waitFor({ state: "visible", timeout: 5000 });
        return true;
      } catch {
        return false;
      }
    }
  }
}
