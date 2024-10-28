import { Builder, WebDriver } from 'selenium-webdriver';

export class BaseTest {
  driver!: WebDriver;

  async setup(): Promise<void> {
    this.driver = await new Builder().forBrowser('chrome').build();
    await this.driver.manage().setTimeouts({ implicit: 10000 });
  }

  async teardown(): Promise<void> {
    await this.driver.quit();
  }
}
