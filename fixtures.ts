
import { test as base, expect, type Page } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

// Define the custom fixture type.
type Fixtures = {
    loggedInPage: Page;
};

// Extend the built-in Playwright test.
export const test = base.extend<Fixtures>({
    loggedInPage: async ({ page }, use) => {
        // SETUP: create the LoginPage object.
        const loginPage = new LoginPage(page);

        // Navigate to the login page.
        await loginPage.goto();

        // Log in with the test customer account.
        await loginPage.login(
            'customer@practicesoftwaretesting.com',
            'welcome01'
        );

        // Provide the authenticated page to the test.
        await use(page);

        // TEARDOWN: no manual cleanup is needed.
        // Playwright automatically closes the page.
    },
});

export { expect };
