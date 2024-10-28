import { By, WebDriver } from "selenium-webdriver";

export class LoginPage {
  private driver: WebDriver;
  private emailField = By.id("email");
  private passwordField = By.id("passwd");
  private submitButton = By.id("SubmitLogin");

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  async login(email: string, password: string) {
    await this.driver.findElement(this.emailField).sendKeys(email);
    await this.driver.findElement(this.passwordField).sendKeys(password);
    await this.driver.findElement(this.submitButton).click();
  }
}
