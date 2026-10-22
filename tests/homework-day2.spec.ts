import { test, expect } from '@playwright/test';

test('Search for Pliers', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    const searchField = page.getByRole('textbox', { name: 'Search' });

    await searchField.dblclick();
    await searchField.fill('Pliers');
    await expect(searchField).toHaveValue('Pliers');

    await page.locator('[data-test="search-submit"]').click();

    const productTitles = page.locator(
        '[data-test="search_completed"] [data-test="product-name"]'
    );

    await expect(productTitles).toHaveCount(4);
});


test('Filter products by Hammer', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    const hammerCheckbox = page.getByRole('checkbox', { name: 'Hammer' });

    await hammerCheckbox.check();
    await expect(hammerCheckbox).toBeChecked();
    const productTitles = page.locator(
        '[data-test="filter_completed"] [data-test="product-name"]'
    );

    await expect(productTitles).toHaveCount(7);

    await hammerCheckbox.uncheck();
    await expect(hammerCheckbox).not.toBeChecked();
});

test('Sort products by name', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    const sortDropdown = page.getByRole('combobox', { name: 'sort' });

    await sortDropdown.selectOption('name,asc');

    const productTitles = page.locator('.card-title');

    await expect(productTitles).toHaveCount(9);

    await expect(productTitles.first()).toContainText('Adjustable Wrench');

    await expect(productTitles.first()).toHaveClass(/card-title/);
});


test('Add two Combination Pliers to cart', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    const product = page.locator('a.card').filter({
        hasText: 'Combination Pliers'
    });

    await product.click();

    await expect(
        page.getByRole('heading', { name: 'Combination Pliers', level: 1 })
    ).toBeVisible();

    const quantityInput = page.getByRole('spinbutton', { name: 'Quantity' });
    await expect(quantityInput).toHaveValue('1');

    await page.getByRole('button', { name: 'Increase quantity' }).click();
    await expect(quantityInput).toHaveValue('2');

    await page.getByRole('button', { name: 'Add to cart' }).click();
    await expect(
        page.getByRole('alert')
    ).toContainText('Product added to shopping cart');


    const cartLink = page.getByRole('link', { name: 'cart' });

    await expect(cartLink).toBeVisible();
    await expect(
        cartLink.locator('[data-test="cart-quantity"]')
    ).toHaveText('2');
});