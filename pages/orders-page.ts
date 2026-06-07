import { Page, Locator } from "@playwright/test";

export class OrdersPage {
  private readonly ordersDashboardLink: Locator;
  private readonly tableRows: Locator;

  constructor(public readonly page: Page) {
    this.ordersDashboardLink = this.page.locator("button[routerlink*='myorders']");
    this.tableRows = this.page.locator("tbody tr");
  }

  async navigateTo() {
    await this.ordersDashboardLink.click();
    await this.tableRows.first().waitFor({ state: "visible" });
  }

  async getOrderRow(orderId: string): Promise<Locator> {
    return this.tableRows.filter({ hasText: orderId });
  }

  async viewOrder(orderId: string) {
    const orderRow = await this.getOrderRow(orderId);
    await orderRow.locator("button:has-text('View')").click();
  }
}
