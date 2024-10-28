import { Builder, By, WebDriver } from "selenium-webdriver";
import { HomePage } from "../pages/hopePage";
import { LoginPage } from "../pages/loginPage";

describe("Login Tests", () => {
  let driver: WebDriver;
  let homePage: HomePage;
  let loginPage: LoginPage;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    homePage = new HomePage(driver);
    loginPage = new LoginPage(driver);
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("Login with valid credentials", async () => {
    await homePage.open("http://www.automationpractice.pl/index.php");
    await homePage.clickSignIn();
    await loginPage.login("testuser@example.com", "Password123");

    const accountPageHeader = await driver.findElement(By.css(".page-heading")).getText();
    expect(accountPageHeader).toBe("AUTHENTICATION");
  });

  test("Login with invalid credentials", async () => {
    await homePage.open("http://www.automationpractice.pl/index.php");
    await homePage.clickSignIn();
    await loginPage.login("invaliduser@example.com", "WrongPassword");

    const errorMessage = await driver.findElement(By.css(".alert-danger")).getText();
    expect(errorMessage).toContain("Authentication failed.");
  });
});
