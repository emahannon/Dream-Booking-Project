// Search.js
import Task from './Task';
import {expect} from "@playwright/test"; // Import the base Task class
import SearchInteraction from '../interaction/SearchClick'; // Import the reusable interaction


class SearchBlank extends Task {
    static withInvalidCredentials() {
        return new SearchBlank();
    }

    constructor(query, day1, day2) {
        super();
        this.query = '';
        this.day1 = '';
        this.day2 = '';
    }

    async performAs(user) {
        // await user.page.goto('http://localhost:3000/login');
        await SearchInteraction.perform(user, this.query, this.day1, this.day2); // Reuse the interaction
        // await Promise.all([
        //     user.page.waitForEvent('dialog').then(async (dialog) => {
        //         expect(dialog.message()).toBe('No results found for your search.');
        //         await dialog.dismiss();
        //     }),
        // ]);
        user.page.once('dialog', async (dialog) => {
            // Assert the alert message
            expect(dialog.message()).toBe('Search field must be filled.');
            await dialog.dismiss();  // Close the alert
        });

    }
}

export default SearchBlank;
