import { By, until, WebDriver } from "selenium-webdriver";

export class SearchResultsPage {
  private driver: WebDriver;
  private results = By.css(".product_list .product-container");
  private noResultsMessage = By.css(".alert.alert-warning");

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  async hasResults() {
    return (await this.driver.findElements(this.results)).length > 0;
  }

  async getNoResultsMessage() {
    const noResultsElem = await this.driver.wait(until.elementLocated(this.noResultsMessage), 5000);
    return noResultsElem.getText();
  }
}
