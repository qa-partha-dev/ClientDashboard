import { Page, Locator } from "@playwright/test";

export class CheckOut {
  private readonly creditCardInput: Locator;
  private readonly cvvInput: Locator;
  private readonly nameOnCardInput: Locator;
  private readonly applyCoupon: Locator;
  private readonly expMonth: Locator;
  private readonly expYear: Locator;

  private readonly emailInput: Locator;
  private readonly countryDropdown: Locator;
  private readonly placeOrderBtn: Locator;

  constructor(public readonly page: Page) {
    this.creditCardInput = this.page.locator(
      "//div[contains(text(),'Credit Card Number')]/following-sibling::input",
    );
    this.cvvInput = this.page.locator(
      "//div[contains(text(),'CVV Code')]/following-sibling::input",
    );
    this.nameOnCardInput = this.page.locator(
      "//div[contains(text(),'Name on Card')]/following-sibling::input",
    );
    this.applyCoupon = this.page.locator(
      "//div[contains(text(),'Apply Coupon')]/following-sibling::input",
    );
    this.expMonth = this.page.locator(
      "//div[contains(text(),'Expiry Date')]/following-sibling::select[1]",
    );
    this.expYear = this.page.locator(
      "//div[contains(text(),'Expiry Date')]/following-sibling::select[2]",
    );

    this.emailInput = this.page.locator(
      '//div[contains(@class, "user__name")]/input[1]',
    );
    this.countryDropdown = this.page.locator(
      '//div[contains(@class, "form-group")]/input',
    );
    this.placeOrderBtn = this.page.locator(".action__submit");
  }

  async placeOrder() {
    await this.placeOrderBtn.click();
  }

  async setCreditCard(creditCardNumber: string) {
    await this.creditCardInput.fill(creditCardNumber);
  }
  async setCVV(cvv: string) {
    await this.cvvInput.fill(cvv);
  }
  async setNameOnCard(nameOnCard: string) {
    await this.nameOnCardInput.fill(nameOnCard);
  }
  async setApplyCoupon(coupon: string) {
    await this.applyCoupon.fill(coupon);
    await this.page.getByRole("button", { name: "Apply Coupon" }).click();
    const spinner = this.page.locator("ngx-spinner > div");
    try {
      await spinner.waitFor({ state: "visible", timeout: 2000 });
    } catch (e) {
      // Spinner did not appear, that's fine, continue
    }

    // Now wait for spinner to disappear
    await spinner.waitFor({ state: "hidden" });
  }
  async setExpMonth(expMonth: string) {
    await this.expMonth.selectOption(expMonth);
  }
  async setExpYear(expYear: string) {
    await this.expYear.selectOption(expYear);
  }
  async setEmail(email: string) {
    await this.emailInput.fill(email);
  }
  async setCountry(country: string) {
    await this.countryDropdown.pressSequentially(country, { delay: 100 });
    await this.page
      .locator(".ta-results > button")
      .first()
      .waitFor({ state: "visible" });
    await this.page.locator(".ta-results > button").first().click();
  }
}
