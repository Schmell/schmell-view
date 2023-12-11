import { expect, test } from '@playwright/test'

// test('index page has expected h1', async ({ page }) => {
// 	await page.goto('/');
// 	await expect(page.getByRole('heading', { name: 'Welcome to SvelteKit' })).toBeVisible();
// });
test('Check for login form', async ({ page }) => {
	await page.goto('/')
	await expect(page.getByLabel('email')).toBeVisible()
	await expect(page.getByLabel('password')).toBeVisible()
})

test('Login', async ({ page }) => {
	await page.goto('/')
	await page.getByLabel('email').fill('schmell.mafeet@gmail.com')
	await page.getByLabel('password').fill('Beatbr0s')
	await page.getByRole('button').click()
})
