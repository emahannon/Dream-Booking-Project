// Integration test for the login and search processes
import { test, expect } from '@playwright/test';
import User from "../user/User";
import Login from "../task/Login"
import Search from "../task/Search";

test('Integration test for login and search processes', async ({ page }) => {
    // Step 1: Navigate to the login page
    const actor = new User(page);
    await page.goto('http://localhost:3000/login'); // Replace with your app's URL


    // Test valid credentials and successful login
    await actor.performs(Login.withValidCredentials());
    // Verify title for search
    await expect(page).toHaveTitle('Search DBS');

    const welcomeMessage = page.locator('h1'); // Assuming your page has a welcome message after login
    await expect(welcomeMessage).toContainText('Dream Booking System ✈');
    actor.page.removeAllListeners('dialog');

    await actor.performs(Search.withValidCredentials('Rome', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');
});