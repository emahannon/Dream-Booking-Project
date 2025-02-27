// Integration test to check that we can successfully make a search with no results
import { test, expect } from '@playwright/test';
import User from "../user/User";
import SearchNoResult from "../task/SearchNoResult";

test('Integration test to ensure we can successfully make a search with no results', async ({ page }) => {
    // Navigate to the app's search page
    await page.goto('http://localhost:3000');
    const actor = new User(page);


    // Step 1: Verify the page title is set correctly
    await expect(page).toHaveTitle('Search DBS');

    // (no results scenario)
    await actor.performs(SearchNoResult.withInvalidCredentials('Jacksonville', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');

});