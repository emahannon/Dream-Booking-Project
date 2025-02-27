// end to end test for login search, no results
import { test, expect } from '@playwright/test';
import User from '../user/User'; // Import the User class
import Login from '../task/Login'; // Import the Login task class
import NoResSearch from '../task/NoResSearch'; // Import the SearchForHotels task class

test('End to End Test - Login, Search, Create Booking (No Results)', async ({ page }) => {
    // Step 1: Create an Actor and perform tasks
    const actor = new User(page);
    await page.goto('http://localhost:3000/login'); // Replace with your app's URL


    await actor.performs(Login.withValidCredentials());
    await actor.performs(NoResSearch.withQuery('Nome'));

    // Verify title for search
    await expect(page).toHaveTitle('Search DBS');
});
