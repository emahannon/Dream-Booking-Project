// MakeBooking.js
import Task from './Task';
import {test, expect} from "@playwright/test"; // Import the base Task class

class MakeBooking extends Task {
    static book() {
        return new MakeBooking();
    }

    constructor() {
        super();
    }

    async performAs(user) {
        const bookingButtons = user.page.locator('.result-item >> button:has-text("Book")');
        await bookingButtons.nth(0).click();
        await expect(user.page.locator('button:has-text("Book")')).toBeVisible();
        await user.page.click('button:has-text("Book")');

        const step = user.page.locator('p', { hasText: 'Step 2' });
        await expect(step).toContainText('Step 2');

        const inputField = user.page.locator('#outlined-required');

// Fill the input field with your desired text
        await user.page.locator('#Email').fill('your-email@example.com');
        await user.page.locator('#Name').fill('John Doe');
        await user.page.locator("#Phone").fill('123-456-7890');
        await user.page.locator('#date-of-birth').fill('01-01-2001');
        await user.page.locator('#NumberGuests').fill('2');

        // text field assertions:
        await expect(user.page.locator('#Email')).toHaveValue('your-email@example.com');
        await expect(user.page.locator('#Name')).toHaveValue('John Doe');
        await expect(user.page.locator("#Phone")).toHaveValue('+123-456-789-0___');
        await expect(user.page.locator('#date-of-birth')).toHaveValue('01-01-2001');
        await expect(user.page.locator('#NumberGuests')).toHaveValue('2');


        // Open the dropdown (click the TextField)
        await user.page.locator('#RoomType').click();

        // Select "Double" from the dropdown (click the menu item)
        await user.page.getByRole('option', { name: 'Double' }).click();

        // Assert that the selected value is correct
        await expect(user.page.locator('#RoomType')).toHaveText('Double');

        await user.page.locator('button', { hasText: 'Next' }).click();


        await user.page.locator('#CardNum').fill('1111111111111111');
        await user.page.locator('#Expiration').fill('01/01');
        await user.page.locator("#CardName").fill('John Doe');
        await user.page.locator('#CVV').fill('001');
        await user.page.locator('#Addy').fill('412 Ruby Heights Street');
        await user.page.locator('#City').fill('Charlotte');
        await user.page.locator('#Zip').fill('22201');
        await user.page.locator('#Country').fill('United States of America');


        await expect(user.page.locator('#CardNum')).toHaveValue('1111111111111111');
        await expect(user.page.locator('#Expiration')).toHaveValue('01/01');
        await expect(user.page.locator("#CardName")).toHaveValue('John Doe');
        await expect(user.page.locator('#CVV')).toHaveValue('001');
        await expect(user.page.locator('#Addy')).toHaveValue('412 Ruby Heights Street');
        await expect(user.page.locator('#City')).toHaveValue('Charlotte');
        await expect(user.page.locator('#Zip')).toHaveValue('22201');
        await expect(user.page.locator('#Country')).toHaveValue('United States of America');

        await user.page.locator('button', { hasText: 'Next' }).click();

        const nextButton = user.page.locator('button', { hasText: 'Finish' });
        await nextButton.waitFor({ state: 'visible', timeout: 60000 }); // Wait for it to be visible
        await nextButton.click();

        await user.page.locator('button', { hasText: 'Submit' }).click();

    }
}

export default MakeBooking;
