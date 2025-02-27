// Process tests for search and filter

import { test, expect } from '@playwright/test';
import User from "../user/User";
import Search from "../task/Search";
import SearchNoResult from "../task/SearchNoResult";
import SearchBlank from "../task/SearchBlank";
import SearchNoStartEndDate from "../task/SearchNoStartEnd";

// TDL=1
// 1, 2, 3, 4, 2, 3, 5
// 1. User submits search/filtering criteria
// 2. Input invalid, instruct user to rectify
// 3. Query database for search results
// 4. Search returns no result, submit new search
// 2. Input invalid, instruct user to rectify
// 3. Query database for search results
// 5. Prepare and display results
test('TDL=1 #1 Search process flow in Search component', async ({ page }) => {
    // Navigate to the app's search page
    await page.goto('http://localhost:3000'); // Update URL as necessary
    const actor = new User(page);


    // Step 1: Verify the page title is set correctly
    await expect(page).toHaveTitle('Search DBS');

    // Step 2: User submits search with invalid input
    await actor.performs(SearchBlank.withInvalidCredentials());
    actor.page.removeAllListeners('dialog');
    await actor.page.reload();


    // Step 3: Rectify input and submit again (no results scenario)
    await actor.performs(SearchNoResult.withInvalidCredentials('NonExistentCity', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');

    await actor.page.reload();
    // await expect(page.locator('#noResultsMessage')).toHaveText('No results found'); // Replace with actual selector and message

    // Step 4: Valid search query (query database)
    await actor.performs(Search.withValidCredentials('Rome', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');

});


// TDL=2
// 1, 2, 2, 3, 4, 2, 2, 3, 5
// 1. User submits search/filtering criteria
// 2. Input invalid, instruct user to rectify
// 2. Input invalid, instruct user to rectify
// 3. Query database for search results
// 4. Search returns no result, submit new search
// 2. Input invalid, instruct user to rectify
// 2. Input invalid, instruct user to rectify
// 3. Query database for search results
// 5. Prepare and display results
test('TDL=2 #1 Search process flow in Search component', async ({ page }) => {
    // Navigate to the app's search page
    await page.goto('http://localhost:3000'); // Update URL as necessary
    const actor = new User(page);


    // Step 1: Verify the page title is set correctly
    await expect(page).toHaveTitle('Search DBS');

    // Step 2: User submits search with invalid input
    await actor.performs(SearchBlank.withInvalidCredentials());
    actor.page.removeAllListeners('dialog');
    await actor.page.reload();

    // Step 2: User submits search with invalid input
    await actor.performs(SearchNoStartEndDate.withInvalidCredentials('Rome'));
    actor.page.removeAllListeners('dialog');
    await actor.page.reload();

    // Step 3: Rectify input and submit again (no results scenario)
    await actor.performs(SearchNoResult.withInvalidCredentials('NonExistentCity', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');

    await actor.page.reload();
    // Step 2: User submits search with invalid input
    await actor.performs(SearchNoResult.withInvalidCredentials('Rome', '01/01/2025', '01/07/2025'));
    actor.page.removeAllListeners('dialog');

    await actor.page.reload();

    await page.reload();


    // Step 2: User submits search with invalid input
    await actor.performs(SearchNoStartEndDate.withInvalidCredentials('Rome'));
    actor.page.removeAllListeners('dialog');
    await actor.page.reload();


    await page.reload();



    // Step 4: Valid search query (query database)
    await actor.performs(Search.withValidCredentials('Rome', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');

});


// 1, 3, 4, 3, 5
// 1. User submits search/filtering criteria
// 3. Query database for search results
// 4. Search returns no result, submit new search
// 3. Query database for search results
// 5. Prepare and display results
test('TDL=2 #3 Search process flow in Search component', async ({ page }) => {
    // Navigate to the app's search page
    await page.goto('http://localhost:3000'); // Update URL as necessary
    const actor = new User(page);


    // Step 1: Verify the page title is set correctly
    await expect(page).toHaveTitle('Search DBS');


    // Step 3: Rectify input and submit again (no results scenario)
    await actor.performs(SearchNoResult.withInvalidCredentials('NonExistentCity', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');

    await actor.page.reload();



    // Step 4: Valid search query (query database)
    await actor.performs(Search.withValidCredentials('Rome', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');

});




// TDL=3
// 1, 2, 2, 2, 3, 4, 2, 2, 2, 3, 5
// 1. User submits search/filtering criteria
// 2. Input invalid, instruct user to rectify
// 2. Input invalid, instruct user to rectify
// 2. Input invalid, instruct user to rectify
// 3. Query database for search results
// 4. Search returns no result, submit new search
// 2. Input invalid, instruct user to rectify
// 2. Input invalid, instruct user to rectify
// 2. Input invalid, instruct user to rectify
// 3. Query database for search results
// 5. Prepare and display results
test('TDL=3 #1 Search process flow in Search component', async ({ page }) => {
    // Navigate to the app's search page
    await page.goto('http://localhost:3000'); // Update URL as necessary
    const actor = new User(page);


    // Step 1: Verify the page title is set correctly
    await expect(page).toHaveTitle('Search DBS');

    // Step 2: User submits search with invalid input
    await actor.performs(SearchBlank.withInvalidCredentials());
    actor.page.removeAllListeners('dialog');
    await actor.page.reload();

    // Step 2: User submits search with invalid input
    await actor.performs(SearchNoResult.withInvalidCredentials('E', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');

    await actor.page.reload();




    // Step 2: User submits search with invalid input
    await actor.performs(SearchNoStartEndDate.withInvalidCredentials('Rome'));
    actor.page.removeAllListeners('dialog');
    await actor.page.reload();

    // Step 3: Rectify input and submit again (no results scenario)
    await actor.performs(SearchNoResult.withInvalidCredentials('NonExistentCity', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');

    await actor.page.reload();

    // Step 2: User submits search with invalid input
    await actor.performs(SearchNoResult.withInvalidCredentials('Rome', '01/01/2025', '01/07/2025'));
    actor.page.removeAllListeners('dialog');

    await actor.page.reload();

    // Step 2: User submits search with invalid input
    await actor.performs(SearchNoResult.withInvalidCredentials('E', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');

    await actor.page.reload();





    // Step 2: User submits search with invalid input
    await actor.performs(SearchNoStartEndDate.withInvalidCredentials('Rome'));
    actor.page.removeAllListeners('dialog');
    await actor.page.reload();


    await page.reload();



    // Step 4: Valid search query (query database)
    await actor.performs(Search.withValidCredentials('Rome', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');

});



// 1, 2, 3, 4, 3, 4, 2, 3, 5
// 1. User submits search/filtering criteria
// 2. Input invalid, instruct user to rectify
// 3. Query database for search results
// 4. Search returns no result, submit new search
// 3. Query database for search results
// 4. Search returns no result, submit new search
// 2. Input invalid, instruct user to rectify
// 3. Query database for search results
// 5. Prepare and display results
test('TDL=3 #2 Search process flow in Search component', async ({ page }) => {
    // Navigate to the app's search page
    await page.goto('http://localhost:3000'); // Update URL as necessary
    const actor = new User(page);


    // Step 1: Verify the page title is set correctly
    await expect(page).toHaveTitle('Search DBS');

    // Step 2: User submits search with invalid input
    await actor.performs(SearchBlank.withInvalidCredentials());
    actor.page.removeAllListeners('dialog');
    await actor.page.reload();


    // Step 3: Rectify input and submit again (no results scenario)
    await actor.performs(SearchNoResult.withInvalidCredentials('NonExistentCity', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');
    await actor.page.reload();


    await page.reload();

    // Step 3: Rectify input and submit again (no results scenario)
    await actor.performs(SearchNoResult.withInvalidCredentials('Orlando', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');
    await actor.page.reload();


    await page.reload();

    // Step 2: User submits search with invalid input
    await actor.performs(SearchNoResult.withInvalidCredentials('Rome', '01/01/2025', '01/07/2025'));
    actor.page.removeAllListeners('dialog');

    await actor.page.reload();



    // Step 4: Valid search query (query database)
    await actor.performs(Search.withValidCredentials('Rome', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');

});



// 1, 3, 4, 2, 2, 2, 3, 4, 3, 5
// 1. User submits search/filtering criteria
// 3. Query database for search results
// 4. Search returns no result, submit new search
// 2. Input invalid, instruct user to rectify
// 2. Input invalid, instruct user to rectify
// 2. Input invalid, instruct user to rectify
// 3. Query database for search results
// 4. Search returns no result, submit new search
// 5. Prepare and display results
test('TDL=3 #3 Search process flow in Search component', async ({ page }) => {
    // Navigate to the app's search page
    const actor = new User(page);
    await page.goto('http://localhost:3000'); // Update URL as necessary

    // Step 1: Verify the page title is set correctly
    await expect(page).toHaveTitle('Search DBS');

    const searchInput = page.locator('input[placeholder="Search For Hotels by Destination City"]');


    // Step 3: Rectify input and submit again (no results scenario)
    await actor.performs(SearchNoResult.withInvalidCredentials('NonExistentCity', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');

    await actor.page.reload();

    // Step 2: User submits search with invalid input
    await actor.performs(SearchNoResult.withInvalidCredentials('Rome', '01/01/2025', '01/07/2025'));
    actor.page.removeAllListeners('dialog');

    await actor.page.reload();



    // Step 2: User submits search with invalid input
    await actor.performs(SearchNoResult.withInvalidCredentials('E', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');

    await actor.page.reload();


    // Step 2: User submits search with invalid input
    await actor.performs(SearchNoStartEndDate.withInvalidCredentials('Rome'));
    actor.page.removeAllListeners('dialog');
    await actor.page.reload();


    await page.reload();

    // // Step 3: Rectify input and submit again (no results scenario)
    actor.page.removeAllListeners('dialog');

    await actor.performs(SearchNoResult.withInvalidCredentials('Orlando', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');
    await actor.page.reload();


    // Step 4: Valid search query (query database)
    await actor.performs(Search.withValidCredentials('Rome', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');

});



// 1, 3, 5
// 1. User submits search/filtering criteria
// 3. Query database for search results
// 5. Prepare and display results
test('TDL=3 #4 Search process flow in Search component', async ({ page }) => {
    // Navigate to the app's search page
    const actor = new User(page);
    await page.goto('http://localhost:3000'); // Update URL as necessary

    await actor.performs(Search.withValidCredentials('Rome', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');

});
