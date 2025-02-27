// end to end test for login and write a review
import { test, expect } from '@playwright/test';
import User from '../user/User'; // Import the User class
import Login from '../task/Login'; // Import the Login task class
import Review from '../task/Review'; // Import the SearchForHotels task class

test('End to End Test - Login, Search, Create Review Successfully', async ({ page }) => {
    // Step 1: Create an Actor and perform tasks
    const actor = new User(page);
    await page.goto('http://localhost:3000/login'); // Replace with your app's URL

    await actor.performs(Login.withValidCredentials());
    await actor.performs(Review.withQuery('Great time here!'));

    // Verify title for search
    await expect(page).toHaveTitle('Review DBS');
});
