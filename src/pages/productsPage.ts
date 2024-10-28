import { By, until, WebDriver } from "selenium-webdriver";

export class ProductPage {
  private driver: WebDriver;
  private addToCartButton = By.id("add_to_cart");
  private confirmationPopup = By.id("layer_cart");

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  async addToCart() {
    await this.driver.findElement(this.addToCartButton).click();
    await this.driver.wait(until.elementIsVisible(this.driver.findElement(this.confirmationPopup)), 5000);
  }

  async isProductAddedConfirmationVisible() {
    return await this.driver.findElement(this.confirmationPopup).isDisplayed();
  }
}
