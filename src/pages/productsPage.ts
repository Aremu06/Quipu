import { By, until, WebDriver } from "selenium-webdriver";

export class ProductPage {
  private driver: WebDriver;
  private addToCartButton = By.id("add_to_cart");
  private confirmationPopup = By.id("layer_cart");
  private firstProducts = By.css('.product_list .product-container')

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  async addToCart() {
    await this.driver.findElement(this.addToCartButton).click();
    await this.driver.wait(until.elementIsVisible(this.driver.findElement(this.confirmationPopup)), 5000);
    await this.driver.findElement(this.firstProducts).click();
  }

  async isProductAddedConfirmationVisible() {
    return await this.driver.findElement(this.confirmationPopup).isDisplayed();
  }
}
