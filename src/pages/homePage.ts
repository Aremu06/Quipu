import { By, until, WebDriver } from "selenium-webdriver";

export class HomePage {
  private driver: WebDriver;
  private searchBox = By.id("search_query_top");
  private searchButton = By.name("submit_search");
  private signInButton = By.className("login");

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  async open(url: string) {
    await this.driver.get(url);
  }

  async clickSignIn() {
    await this.driver.findElement(this.signInButton).click();
  }

  async searchForProduct(query: string) {
    await this.driver.findElement(this.searchBox).sendKeys(query);
    await this.driver.findElement(this.searchButton).click();
  }
}
