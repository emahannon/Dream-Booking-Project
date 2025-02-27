// Integration test to check that the login and review processes are fully integrated
import { test, expect } from '@playwright/test';
import User from "../user/User";
import Login from "../task/Login"
import Review from "../task/Review";

test('Integration test for login and review processes', async ({ page }) => {
    // Step 1: Create an Actor and perform tasks
    const actor = new User(page);
    await page.goto('http://localhost:3000/login');

    await actor.performs(Login.withValidCredentials());
    await actor.performs(Review.withQuery('Great time here!'));

    // Verify title for search
    await expect(page).toHaveTitle('Review DBS');
});
