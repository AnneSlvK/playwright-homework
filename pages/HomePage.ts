import { type Page, type Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly productLinks: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartLink = page.getByRole('link', { name: 'cart' });
    this.cartBadge = this.cartLink.locator('[data-test="cart-quantity"]');
    this.sortDropdown = page.getByRole('combobox', { name: 'sort' });
    this.productLinks = page.locator('a.card');
    this.productPrices = page.locator('[data-test="product-price"]');
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/');
  }

  async addItemToCart(productName: string) {
    await this.goto();

    await this.productLinks.filter({
      has: this.page.getByRole('heading', {
        name: productName,
        exact: true
      })
    }).click();

    // TEMPORARY WORKAROUND: Product details sometimes fail to load after navigation.
    // TODO: Investigate whether this is an application bug.
    await this.page.reload();

    await this.page.getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeItemFromCart(productName: string) {
    await this.cartLink.click();

    const productRow = this.page.locator('tr').filter({
      has: this.page.getByText(productName, { exact: true })
    });

    await productRow.locator('a.btn-danger').click();
  }


}