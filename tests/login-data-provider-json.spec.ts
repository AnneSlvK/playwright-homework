import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../test-data/login.json';

for (const user of loginData) {
  test(`Login: ${user.name}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(user.email, user.password);

    await expect(
      page.getByRole('heading', { name: user.expectedHeading })
    ).toBeVisible();
  });
}