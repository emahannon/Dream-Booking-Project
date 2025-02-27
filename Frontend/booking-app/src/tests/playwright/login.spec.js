// Process tests for Login
import { test, expect } from '@playwright/test';
import User from "../user/User";
import Login from "../task/Login";
import Review from "../task/Review";
import LoginBadEmail from "../task/LoginBadEmail";
import LoginNoInput from "../task/LoginNoInput";
import LoginBad from "../task/LoginBad";
import LoginNoEmail from "../task/LoginNoEmail";

test('TDL=1 #1 Login page - validate form submission and login process', async ({ page }) => {
    // Step 1: Navigate to the login page
    const actor = new User(page);
    await page.goto('http://localhost:3000/login'); // Replace with your app's URL

    // Step 2: Test Invalid Email Format
    await actor.performs(LoginBadEmail.withInvalidCredentials('invalidemail', 'invalidpass'));
    actor.page.removeAllListeners('dialog');

    // Step 3: Test Empty Email and Password
    await actor.performs(LoginNoInput.withInvalidCredentials());
    actor.page.removeAllListeners('dialog');


    // Step 4: Test valid credentials but incorrect login
    await actor.performs(LoginBad.withInvalidCredentials('johndoe@gmail.com', 'wrongpassword'));
    actor.page.removeAllListeners('dialog');

    // Step 5: Test valid credentials and successful login
    // Step 1: Create an Actor and perform tasks

    await actor.performs(Login.withValidCredentials());
    // Verify title for search
    await expect(page).toHaveTitle('Search DBS');
    // Step 5: Verify user session or welcome message (optional)
    const welcomeMessage = page.locator('h1'); // Assuming your page has a welcome message after login
    await expect(welcomeMessage).toContainText('Dream Booking System ✈');
    actor.page.removeAllListeners('dialog');

});


// 1. User submits form
// 2. Invalid input, instruct user to resubmit valid form
// 2. Invalid input, instruct user to resubmit valid form
// 3. Valid Input, query DB for user credentials
// 4. Input user/pass to the DB is invalid, user instructed to resubmit form
// 2. Invalid input, instruct user to resubmit valid form
// 2. Invalid input, instruct user to resubmit valid form
// 3. Valid Input, query DB for user credentials
// 5. Password is valid, create new logged in session for user.
test('TDL=2 #1 Login page - validate form submission and login process', async ({ page }) => {
    // Step 1: User submits form
    await page.goto('http://localhost:3000/login'); // Replace with your app's URL

    // Step 2: Test Invalid Email Format
    const actor = new User(page);
    await actor.performs(LoginBadEmail.withInvalidCredentials('invalidemail', 'invalidpass'));
    actor.page.removeAllListeners('dialog');


    // Step 2: Test Empty Email and Password
    await actor.performs(LoginNoInput.withInvalidCredentials());
    actor.page.removeAllListeners('dialog');


    // Step 4: Test valid credentials but incorrect login
    // Trigger login with invalid credentials
    await actor.performs(LoginBad.withInvalidCredentials('johndoe@gmail.com', 'wrongpassword'));
    actor.page.removeAllListeners('dialog');


    // Step 2: Test Invalid Email Format
    // Fill in an invalid email
    await actor.performs(LoginBadEmail.withInvalidCredentials('invalidemail@1', 'ValidPassword123'));
    actor.page.removeAllListeners('dialog');


    // Step 2: Test Invalid Email Format
    // Fill in an invalid email
    await actor.performs(LoginBad.withInvalidCredentials('email@emailcom', '1'));
    actor.page.removeAllListeners('dialog');


    // Step 3: Test valid credentials and successful login
    await actor.performs(Login.withValidCredentials());
    // Verify title for search
    await expect(page).toHaveTitle('Search DBS');
    // Step 5: Verify user session or welcome message (optional)
    const welcomeMessage = page.locator('h1'); // Assuming your page has a welcome message after login
    await expect(welcomeMessage).toContainText('Dream Booking System ✈');
    actor.page.removeAllListeners('dialog');

});

// 1, 3, 4, 3, 5
// 1. User submits form
// 3. Valid Input, query DB for user credentials
// 4. Input user/pass to the DB is invalid, user instructed to resubmit form
// 3. Valid Input, query DB for user credentials
// 5. Password is valid, create new logged in session for user.
test('TDL=2 #3 Login page - validate form submission and login process', async ({ page }) => {
    // Step 1: User submits form
    await page.goto('http://localhost:3000/login'); // Replace with your app's URL
    const actor = new User(page);


    // Step 4: Test valid credentials but incorrect login
    // Trigger login with invalid credentials
    await actor.performs(LoginBad.withInvalidCredentials('johndoe@gmail.com', 'wrongpassword'));
    actor.page.removeAllListeners('dialog');

    // Step 3: Test valid credentials and successful login
    // Step 1: Create an Actor and perform tasks

    await actor.performs(Login.withValidCredentials());
    // Verify title for search
    await expect(page).toHaveTitle('Search DBS');
    // Step 5: Verify user session or welcome message (optional)
    const welcomeMessage = page.locator('h1'); // Assuming your page has a welcome message after login
    await expect(welcomeMessage).toContainText('Dream Booking System ✈');
});



// TDL=3
// 1, 2, 2, 2, 3, 4, 2, 2, 2, 3, 5
// 1. User submits form
// 2. Invalid input, instruct user to resubmit valid form
// 2. Invalid input, instruct user to resubmit valid form
// 2. Invalid input, instruct user to resubmit valid form
// 3. Valid Input, query DB for user credentials
// 4. Input user/pass to the DB is invalid, user instructed to resubmit form
// 2. Invalid input, instruct user to resubmit valid form
// 2. Invalid input, instruct user to resubmit valid form
// 2. Invalid input, instruct user to resubmit valid form
// 3. Valid Input, query DB for user credentials
// 5. Password is valid, create new logged in session for user.
test('TDL=3 #1 Login page - validate form submission and login process', async ({ page }) => {
    // Step 1: User submits form
    const actor = new User(page);

    await page.goto('http://localhost:3000/login'); // Replace with your app's URL

    // Step 2: Test Invalid Email Format
    // Fill in an invalid email
    await actor.performs(LoginBadEmail.withInvalidCredentials('invalidemail@1', 'ValidPassword123'));
    actor.page.removeAllListeners('dialog');


    // Step 2: Test Invalid Email Format
    // Fill in an invalid email
    await actor.performs(LoginBadEmail.withInvalidCredentials('invalidemail.1.com', 'ValidPassword123'));
    actor.page.removeAllListeners('dialog');


    // Step 2: Test Invalid Email Format
    // Fill in an invalid email

    await actor.performs(LoginBadEmail.withInvalidCredentials('i', 'ValidPassword123'));
    actor.page.removeAllListeners('dialog');


    // Step 3+4: Test valid credentials but incorrect login
    // Trigger login with invalid credentials
    await actor.performs(LoginBad.withInvalidCredentials('johndoe@gmail.com', 'wrongpassword'));
    actor.page.removeAllListeners('dialog');

    // Step 2: Test Invalid Email Format
    // Fill in an invalid email
    await actor.performs(LoginBadEmail.withInvalidCredentials('@gmail.com', 'ValidPassword123'));


    // Step 2: Test Invalid Email Format
    // Fill in an invalid email
    await actor.performs(LoginBadEmail.withInvalidCredentials('invalidaemail.com', 'ValidPassword123'));
    actor.page.removeAllListeners('dialog');

    // Step 2: Test Invalid Email Format
    // Fill in an invalid email
    await actor.performs(LoginNoEmail.withInvalidCredentials( 'ValidPassword123'));
    actor.page.removeAllListeners('dialog');

    // Step 3: Test valid credentials and successful login
    // Step 1: Create an Actor and perform tasks

    await actor.performs(Login.withValidCredentials());
    // Verify title for search
    await expect(page).toHaveTitle('Search DBS');
    // Step 5: Verify user session or welcome message (optional)
    const welcomeMessage = page.locator('h1'); // Assuming your page has a welcome message after login
    await expect(welcomeMessage).toContainText('Dream Booking System ✈');
});



// 1, 2, 3, 4, 3, 4, 2, 3, 5
// 1. User submits form
// 2. Invalid input, instruct user to resubmit valid form
// 3. Valid Input, query DB for user credentials
// 4. Input user/pass to the DB is invalid, user instructed to resubmit form
// 3. Valid Input, query DB for user credentials
// 4. Input user/pass to the DB is invalid, user instructed to resubmit form
// 2. Invalid input, instruct user to resubmit valid form
// 3. Valid Input, query DB for user credentials
// 5. Password is valid, create new logged in session for user.
test('TDL=3 #2 Login page - validate form submission and login process', async ({ page }) => {
    // Step 1: User submits form
    await page.goto('http://localhost:3000/login'); // Replace with your app's URL
    const actor = new User(page);


    // Step 2: Test Invalid Email Format
    // Fill in an invalid email
    await actor.performs(LoginBadEmail.withInvalidCredentials('invalidemail@1', 'ValidPassword123'));
    actor.page.removeAllListeners('dialog');

    // Step 3+4: Test valid credentials but incorrect login
    // Trigger login with invalid credentials
    await actor.performs(LoginBad.withInvalidCredentials('johndoe@gmail.com', 'wrong444password'));
    actor.page.removeAllListeners('dialog');


    // Step 3+4: Test valid credentials but incorrect login
    // Trigger login with invalid credentials
    await actor.performs(LoginBad.withInvalidCredentials('johndoe@gmail.com', 'wrongpassword'));
    actor.page.removeAllListeners('dialog');


    // Step 2: Test Invalid Email Format
    // Fill in an invalid email
    await actor.performs(LoginBadEmail.withInvalidCredentials('invalidaemail.com', 'ValidPassword123'));
    actor.page.removeAllListeners('dialog');



    // Step 3: Test valid credentials and successful login
    // Step 1: Create an Actor and perform tasks

    await actor.performs(Login.withValidCredentials());
    // Verify title for search
    await expect(page).toHaveTitle('Search DBS');
    // Step 5: Verify user session or welcome message (optional)
    const welcomeMessage = page.locator('h1'); // Assuming your page has a welcome message after login
    await expect(welcomeMessage).toContainText('Dream Booking System ✈');
});





// 1, 3, 4, 2, 2, 2, 3, 4, 3, 5
// 1. User submits form
// 3. Valid Input, query DB for user credentials
// 4. Input user/pass to the DB is invalid, user instructed to resubmit form
// 2. Invalid input, instruct user to resubmit valid form
// 2. Invalid input, instruct user to resubmit valid form
// 2. Invalid input, instruct user to resubmit valid form
// 3. Valid Input, query DB for user credentials
// 4. Input user/pass to the DB is invalid, user instructed to resubmit form
// 3. Valid Input, query DB for user credentials
// 5. Password is valid, create new logged in session for user.
test('TDL=3 #3 Login page - validate form submission and login process', async ({ page }) => {
    // Step 1: User submits form
    await page.goto('http://localhost:3000/login'); // Replace with your app's URL

    const actor = new User(page);


    // Step 3+4: Test valid credentials but incorrect login
    // Trigger login with invalid credentials
    await actor.performs(LoginBad.withInvalidCredentials('johndoe@gmail.com', 'wrongpassword'));
    actor.page.removeAllListeners('dialog');

    // Step 2: Test Invalid Email Format
    // Fill in an invalid email
    await actor.performs(LoginBadEmail.withInvalidCredentials('invalidemail@1', 'ValidPassword123'));
    actor.page.removeAllListeners('dialog');

    // Step 2: Test Invalid Email Format
    // Fill in an invalid email
    await actor.performs(LoginBadEmail.withInvalidCredentials('invalidaemail.com', 'ValidPassword123'));
    actor.page.removeAllListeners('dialog');

    // Step 2: Test Invalid Email Format
    // Fill in an invalid email
    await actor.performs(LoginBadEmail.withInvalidCredentials('i', 'ValidPassword123'));
    actor.page.removeAllListeners('dialog');


    // Step 3+4: Test valid credentials but incorrect login
    // Trigger login with invalid credentials
    // Step 1: Create an Actor and perform tasks

    await actor.performs(Login.withValidCredentials());
    // Verify title for search
    await expect(page).toHaveTitle('Search DBS');
    // Step 5: Verify user session or welcome message (optional)
    const welcomeMessage = page.locator('h1'); // Assuming your page has a welcome message after login
    await expect(welcomeMessage).toContainText('Dream Booking System ✈');
});



// 1, 3, 5
// 1. User submits form
// 3. Valid Input, query DB for user credentials
// 5. Password is valid, create new logged in session for user.
test('TDL=3 #4 Login page - validate form submission and login process', async ({ page }) => {
    // Step 1: User submits form
    await page.goto('http://localhost:3000/login'); // Replace with your app's URL

    // Step 1: Create an Actor and perform tasks
    const actor = new User(page);

    await actor.performs(Login.withValidCredentials());
    // Verify title for search
    await expect(page).toHaveTitle('Search DBS');
    // Step 5: Verify user session or welcome message (optional)
    const welcomeMessage = page.locator('h1'); // Assuming your page has a welcome message after login
    await expect(welcomeMessage).toContainText('Dream Booking System ✈');
});
