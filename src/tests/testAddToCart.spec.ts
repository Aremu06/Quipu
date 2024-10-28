import { Builder, WebDriver, By } from "selenium-webdriver";
import { HomePage } from "../pages/hopePage";
import { SearchResultsPage } from "../pages/searchPage";
import { ProductPage } from "../pages/productsPage";

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

  test("Add product to cart", async () => {
    await homePage.open("http://www.automationpractice.pl/index.php");
    await homePage.searchForProduct("dress");

    if (await searchResultsPage.hasResults()) {
      const firstProduct = await driver.findElement(By.css(".product_list .product-container"));
      await firstProduct.click();
      await productPage.addToCart();

      const isConfirmationVisible = await productPage.isProductAddedConfirmationVisible();
      expect(isConfirmationVisible).toBe(true);
    }
  });
});
