import Task from './Task';
import {test, expect} from "@playwright/test"; // Import the base Task class

class ReviewFail extends Task {
    static withQuery(query, stars) {
        return new ReviewFail(query, stars);
    }

    constructor(query, stars) {
        super();
        this.query = query;
        this.stars = stars;
    }

    async performAs(user) {



        // Step 2: Test Invalid Email Format
        // Fill in an invalid review
        // Wait for the label elements representing the stars
        await user.page.waitForSelector('label[for^="simple-uncontrolled-"]');

        // Locate the labels for the stars
        const ratingLabels = user.page.locator('label[for^="simple-uncontrolled-"]');

        // Click on the label for the 4th star (index 3 for 4 stars)
        await ratingLabels.nth(this.stars).click(); // Click the corresponding label

        // Verify the rating value has been updated
        const checkedInput = await user.page.locator('input[name="simple-uncontrolled"]:checked');
        const ratingValue = await checkedInput.getAttribute('value');
        expect(ratingValue).toBe(String(this.stars+1));
        await user.page.fill('#outlined-multiline-static', this.query);
        user.page.click('button:has-text("Submit")'); // Trigger the dialog

        const [dialog] = await Promise.all([
            user.page.waitForEvent('dialog') // Wait for the dialog to appear
        ]);

        const message = dialog.message();
        if (message === 'Comment must be more than three characters long.') {
            expect(message).toBe('Comment must be more than three characters long.');
        } else if (message === 'Comment cannot be empty.') {
            expect(message).toBe('Comment cannot be empty.');
        } else {
            throw new Error(`Unexpected dialog message: ${message}`);
        }
        await dialog.dismiss();


    }
}

export default ReviewFail;
