// Process tests for review creation
import { test, expect } from '@playwright/test';


// TDL=1
// 1, 3, 6
// 1. User submits form and we validate it
// 3. Form is valid. Save to database.
// 6. Valid, send confirmation to user.
import User from '../user/User'; // Import the User class
import ReviewSuccess from '../task/ReviewSuccess'; // Import the SearchForHotels task class
import ReviewFail from '../task/ReviewFail';

test('End to End Test - Login, Search, Create Review Successfully', async ({ page }) => {
    // Step 1: Create an Actor and perform tasks
    const actor = new User(page);

    await page.goto('http://localhost:3000/review/1/1');


    await actor.performs(ReviewSuccess.withQuery('Great time here!'));
});


// 1, 3, 4, 5, 2
// 1. User submits form and we validate it
// 3. Form is valid. Save to database.
// 4. Invalid, user needs to correct.
// 5. User submits new form + we validate
// 2. Form is invalid.
test('TDL=1+2+3 #2 Review Creation - validate form submission and review process', async ({ page }) => {

    // Step 1: Create an Actor and perform tasks
    const actor = new User(page);
    await page.goto('http://localhost:3000/review/1/1'); // Replace with your app's URL

    await actor.performs(ReviewFail.withQuery('b', 2));

    await actor.performs(ReviewFail.withQuery('', 3));

});

// 1. User submits form and we validate it
// 2. Form is invalid
test('TDL=1 #1 Review Creation - validate form submission and review process', async ({ page }) => {
    // Step 1: Create an Actor and perform tasks
    const actor = new User(page);

    await page.goto('http://localhost:3000/review/1/1');

    await actor.performs(ReviewFail.withQuery('', 3));
});



// TDL=2
// 1, 2
// 1. User submits form and we validate it
// 2. Form is invalid.
test('TDL=2 #1 Review Creation - validate form submission and review process', async ({ page }) => {
    // Step 1: Create an Actor and perform tasks
    const actor = new User(page);

    await page.goto('http://localhost:3000/review/1/1');

    await actor.performs(ReviewFail.withQuery('eee', 2));
});


// 1, 3, 4, 5, 3, 6
// for TDL 2 + 3
// 1. User submits form and we validate it
// 3. Form is valid. Save to database.
// 4. Invalid, user needs to correct.
// 5. User submits new form + we validate
// 3. Form is valid. Save to database.
// 6. Valid, send confirmation to user.
test('TDL=2+3 #2 Review Creation - validate form submission and review process', async ({ page }) => {


    // Step 1: Create an Actor and perform tasks
    const actor = new User(page);
    await page.goto('http://localhost:3000/review/1/1'); // Replace with your app's URL

    await actor.performs(ReviewFail.withQuery('b', 2));

    await actor.performs(ReviewFail.withQuery('', 3));
    await page.reload();

    await actor.performs(ReviewSuccess.withQuery('Great time here!'));

});




// TDL=3
// 1, 3, 4, 5, 3, 4, 5, 2
// 1. User submits form and we validate it
// 3. Form is valid. Save to database.
// 4. Invalid, user needs to correct.
// 5. User submits new form + we validate
// 3. Form is valid. Save to database.
// 4. Invalid, user needs to correct
// 5. User submits new form + we validate
// 2. Form is invalid
test('TDL=3 #3 Review Creation - validate form submission and review process', async ({ page }) => {
    // Step 1: Create an Actor and perform tasks
    const actor = new User(page);
    await page.goto('http://localhost:3000/review/1/1'); // Replace with your app's URL


    await actor.performs(ReviewFail.withQuery('b', 2));
    await page.reload();

    await actor.performs(ReviewFail.withQuery('', 3));
    await page.reload();


    await actor.performs(ReviewFail.withQuery('ee', 3));

    await page.reload();

});


