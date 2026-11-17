import { test, expect } from '@playwright/test';

test('home page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Paperwork/);
  await expect(page.locator('h1')).toBeVisible();
});

test('portfolio list shows seeded items', async ({ page }) => {
  await page.goto('/portfolio');
  await expect(page.locator('h1:has-text("Portfolio")')).toBeVisible();
  await expect(page.locator('text=Selected work and case studies.')).toBeVisible();
});

test('login page renders', async ({ page }) => {
  await page.goto('/login');
  await expect(page).toHaveURL(/login/);
});

test('admin login and CRUD flow', async ({ page }) => {
  const newTitle = `Test Portfolio ${Date.now()}`;

  // Login
  await page.goto('/login');
  await page.fill('input[name="email"]', 'sicareon@gmail.com');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/admin/);

  // Create portfolio
  await page.goto('/admin/portfolio/new');
  await expect(page.locator('text=New Portfolio Item')).toBeVisible();
  await page.fill('input[name="title"]', newTitle);
  await page.fill('input[name="category"]', 'Web');
  await page.fill('input[name="summary"]', 'A test summary.');
  await page.fill('textarea[name="description"]', 'A test description.');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.waitForURL(/admin\/portfolio/);
  await page.goto('/admin/portfolio');
  await expect(page.locator('text=' + newTitle)).toBeVisible();

  // Delete portfolio
  await page.goto('/admin/portfolio');
  await expect(page.locator('text=' + newTitle)).toBeVisible();
  await page.once('dialog', (d) => d.accept());
  await page.locator('text=' + newTitle).locator('xpath=..').getByRole('button', { name: 'Delete' }).click();
  await expect(page.locator('text=' + newTitle)).not.toBeVisible();
});
