// end to end test for login, search, and booking

import { test, expect } from '@playwright/test';
import User from "../user/User";
import MakeBooking from "../task/MakeBooking";
import Login from "../task/Login";
import Search from "../task/Search";


test('Integration Test - Login, Search, Create Booking', async ({ page }) => {
    // Step 1: Navigate to the login page
    test.setTimeout(50000);

    await page.goto('http://localhost:3000/login'); // Replace with your app's URL

    const actor = new User(page);

    // LOGIN
    await actor.performs(Login.withValidCredentials());

    // SEARCH
    await actor.performs(Search.withValidCredentials('Rome', '10/01/2025', '10/07/2025'));
    actor.page.removeAllListeners('dialog');


    // CREATE BOOKING

    await actor.performs(MakeBooking.book());



});