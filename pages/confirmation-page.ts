import { Page, Locator } from "@playwright/test";

export class ConfirmationPage {
  private readonly successMessage: Locator;
  private readonly orderIdLabel: Locator;

  constructor(public readonly page: Page) {
    this.successMessage = this.page.locator(".hero-primary");
    this.orderIdLabel = this.page.locator(".em-spacer-1 .ng-star-inserted").first();
  }

  async getSuccessMessage(): Promise<string | null> {
    await this.successMessage.waitFor({ state: "visible" });
    return await this.successMessage.textContent();
  }

  async getOrderId(): Promise<string> {
    await this.orderIdLabel.waitFor({ state: "visible" });
    const orderIdText = await this.orderIdLabel.textContent();
    return orderIdText ? orderIdText.replace(/\|/g, "").trim() : "";
  }
}
