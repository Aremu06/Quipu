import { Builder, WebDriver, By } from "selenium-webdriver";
import { HomePage } from "../pages/homePage";
import { SearchResultsPage } from "../pages/searchPage";
import { ProductPage } from "../pages/productsPage";

const BASE_URL = "http://www.automationpractice.pl/index.php";

describe("Add to Cart Tests", () => {
  let driver: WebDriver;
  let homePage: HomePage;
  let searchResultsPage: SearchResultsPage;
  let productPage: ProductPage;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    homePage = new HomePage(driver);
    searchResultsPage = new SearchResultsPage(driver);
    productPage = new ProductPage(driver);
  });

  afterAll(async () => {
    await driver.quit();
  });

  beforeEach(async ()=>{
    await homePage.open(BASE_URL);
  })

  test("Add product to cart", async () => {
    await homePage.searchForProduct("dress");

    if (await searchResultsPage.hasResults()) {
      await productPage.addToCart();

      const isConfirmationVisible = await productPage.isProductAddedConfirmationVisible();
      expect(isConfirmationVisible).toBe(true);
    }
  });
});
