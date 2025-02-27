// SearchForHotels.js
import Task from './Task';
import {test, expect} from "@playwright/test"; // Import the base Task class

class Review extends Task {
    static withQuery(query) {
        return new Review(query);
    }

    constructor(query) {
        super();
        this.query = query;
    }

    async performAs(user) {

        await expect(user.page).toHaveURL('http://localhost:3000/', { timeout: 10000 }); // Adjust the expected URL after login

        // Step 6: Verify user session or welcome message (optional)
        // You could also check for cookies, local storage, or session state
        const welcomeMessage = user.page.locator('h1'); // Assuming your page has a welcome message after login
        await expect(welcomeMessage).toContainText('Dream Booking System ✈');



        // navigate to review
        await user.page.locator('button[role="tab"] svg[data-testid="MenuIcon"]').click();

        // Click the "Past Trips" link
        await user.page.locator('a[href="/past"]').click();


        await expect(user.page).toHaveURL('http://localhost:3000/past');


        await user.page.locator('button:has-text("Review")').first().click();

        // Step 2: Test Invalid Email Format
        // Fill in an invalid review
        // Wait for the label elements representing the stars
        await user.page.waitForSelector('label[for^="simple-uncontrolled-"]');

        // Locate the labels for the stars
        const ratingLabels = user.page.locator('label[for^="simple-uncontrolled-"]');

        // Click on the label for the 4th star (index 3 for 4 stars)
        await ratingLabels.nth(3).click(); // Click the corresponding label

        // Verify the rating value has been updated
        const checkedInput = await user.page.locator('input[name="simple-uncontrolled"]:checked');
        const ratingValue = await checkedInput.getAttribute('value');
        expect(ratingValue).toBe('4');
        await user.page.fill('#outlined-multiline-static', this.query);
        await user.page.click('button:has-text("Submit")');

        // Check for the alert message
        user.page.on('dialog', async (dialog) => {
            expect(dialog.message()).toBe('Review submitted successfully!');
            await dialog.dismiss();
        });


        // await user.page.fill('input[placeholder="Search For Hotels by Destination City"]', this.query);
        // await user.page.click('button[aria-label="select date range"]');
        // await user.page.waitForSelector('role=dialog');
        // const startDateInput2 = user.page.locator('input[placeholder="MM/DD/YYYY"]').first();
        // const endDateInput2 = user.page.locator('input[placeholder="MM/DD/YYYY"]').nth(1);
        // await startDateInput2.fill('10/01/2025');
        // await endDateInput2.fill('10/07/2025');
        // await user.page.click('body');
        // await Promise.all([
        //     user.page.click('button[aria-label="search"]'), // Trigger the dialog
        //     user.page.waitForEvent('dialog').then(async (dialog) => {
        //         expect(dialog.message()).toBe('No results found for your search.');
        //         await dialog.dismiss();
        //     }),
        // ]);
    }
}

export default Review;
