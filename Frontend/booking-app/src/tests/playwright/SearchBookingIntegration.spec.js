// Integration test to check that a user can
// search for, select a hotel, and proceed to booking without problems


// Integration test for the login and search processes
import { test, expect } from '@playwright/test';
import User from "../user/User";
import Login from "../task/Login"
import Search from "../task/Search";

test('Integration test for search and booking processes', async ({ page }) => {
    // Step 1: Navigate to the login page
    const actor = new User(page);
    await page.goto('http://localhost:3000'); // Replace with your app's URL


    // Test valid credentials and successful login
    // Verify title for search
    await expect(page).toHaveTitle('Search DBS');

    const welcomeMessage = page.locator('h1'); // Assuming your page has a welcome message after login
    await expect(welcomeMessage).toContainText('Dream Booking System ✈');
    actor.page.removeAllListeners('dialog');

    await actor.performs(Search.withValidCredentials('Rome', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');

    const bookingButtons = page.locator('.result-item >> button:has-text("Book")');
    await bookingButtons.nth(0).click();
    await expect(page.locator('button:has-text("Book")')).toBeVisible();
    await page.click('button:has-text("Book")');

    const step = page.locator('p', { hasText: 'Step 2' });
    await expect(step).toContainText('Step 2');
});