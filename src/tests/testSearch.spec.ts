import { Builder, WebDriver } from "selenium-webdriver";
import { HomePage } from "../pages/hopePage";
import { SearchResultsPage } from "../pages/searchPage";

describe("Search Tests", () => {
  let driver: WebDriver;
  let homePage: HomePage;
  let searchResultsPage: SearchResultsPage;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    homePage = new HomePage(driver);
    searchResultsPage = new SearchResultsPage(driver);
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("Search for an existing product", async () => {
    await homePage.open("http://www.automationpractice.pl/index.php");
    await homePage.searchForProduct("dress");

    const hasResults = await searchResultsPage.hasResults();
    expect(hasResults).toBe(true);
  });

  test("Search for a non-existent product", async () => {
    await homePage.open("http://www.automationpractice.pl/index.php");
    await homePage.searchForProduct("xyz123");

    const noResultsMessage = await searchResultsPage.getNoResultsMessage();
    expect(noResultsMessage).toBe("No results were found for your search \"xyz123\"");
  });
});
