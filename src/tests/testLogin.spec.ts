import { Builder, By, WebDriver, until } from "selenium-webdriver";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";

const BASE_URL = "http://www.automationpractice.pl/index.php";
const VALID_EMAIL = "testuser@example.com";
const VALID_PASSWORD = "Password123";
const INVALID_EMAIL = "invaliduser@example.com";
const INVALID_PASSWORD = "WrongPassword";

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

  beforeEach(async () => {
    await homePage.open(BASE_URL);
    await homePage.clickSignIn();
  });

  test("Login with valid credentials", async () => {
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
    const accountPageHeader = await driver.wait(until.elementLocated(By.css(".page-heading")), 5000).getText();
    expect(accountPageHeader).toBe("MY ACCOUNT");
  });

  test("Login with invalid credentials", async () => {
    await loginPage.login(INVALID_EMAIL, INVALID_PASSWORD);
    const errorMessage = await driver.wait(until.elementLocated(By.css(".alert-danger")), 5000).getText();
    expect(errorMessage).toContain("Authentication failed.");
  });
});
