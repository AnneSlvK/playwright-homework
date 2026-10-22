import { test, expect } from '../fixtures';
import fs from 'node:fs';
import { LoginPage } from '../pages/LoginPage';

test('Account page is open', async ({ loggedInPage }) => {
  await expect(loggedInPage).toHaveURL(/\/account(?:[/?#]|$)/);
});


test.describe('catalog hooks', () => {
  test.beforeAll(() => {
    console.log('Catalog suite started:', new Date().toISOString());
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
      const screenshot = await page.screenshot();

      await testInfo.attach('failure-screenshot', {
        body: screenshot,
        contentType: 'image/png',
      });
    }
  });

  test.afterAll(() => {
    console.log('Catalog suite finished');
  });

  test('Catalog page loads', async ({ page }) => {
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/');
  });
});


const csvContent = fs.readFileSync(
  'test-data/login-cases.csv',
  'utf-8'
);

const lines = csvContent.trim().split(/\r?\n/);


const records = lines.slice(1).map((line) => {
  const [name, email, password, expectedResult] = line.split(',');

  return {
    name,
    email,
    password,
    expectedResult,
  };
});

for (const record of records) {
  test(`Login: ${record.name}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(record.email, record.password);

    if (record.expectedResult === 'success') {
      await expect(page).toHaveURL(/\/account/);
    } else {
      await expect(
        page.getByText('Invalid email or password')
      ).toBeVisible();
    }
  });
}