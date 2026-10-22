import { test, expect } from '../fixtures/pages.fixture';

test('Add two products to cart', async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.cartBadge).toHaveCount(0);

    await homePage.addItemToCart('Combination Pliers');
    // wait for the cart to update before navigating to the next product.
    await expect(homePage.cartBadge).toHaveText('1');

    await homePage.addItemToCart('Bolt Cutters');

    await expect(homePage.cartBadge).toHaveText('2');

});

test('Remove one product from cart', async ({ homePage }) => {
    await homePage.goto();

    await homePage.addItemToCart('Combination Pliers');
    // wait for the cart to update before navigating to the next product.
    await expect(homePage.cartBadge).toHaveText('1');

    await homePage.addItemToCart('Pliers');

    await expect(homePage.cartBadge).toHaveText('2');


    await homePage.removeItemFromCart('Pliers');

    await expect(homePage.cartBadge).toHaveText('1');
});