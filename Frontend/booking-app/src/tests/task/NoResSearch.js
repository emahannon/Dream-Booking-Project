// SearchForHotels.js
import Task from './Task';
import {test, expect} from "@playwright/test"; // Import the base Task class

class NoResSearch extends Task {
    static withQuery(query) {
        return new NoResSearch(query);
    }

    constructor(query) {
        super();
        this.query = query;
    }

    async performAs(user) {
        await user.page.fill('input[placeholder="Search For Hotels by Destination City"]', this.query);
        await user.page.click('button[aria-label="select date range"]');
        await user.page.waitForSelector('role=dialog');
        const startDateInput2 = user.page.locator('input[placeholder="MM/DD/YYYY"]').first();
        const endDateInput2 = user.page.locator('input[placeholder="MM/DD/YYYY"]').nth(1);
        await startDateInput2.fill('10/01/2025');
        await endDateInput2.fill('10/07/2025');
        await user.page.click('body');
        await Promise.all([
            user.page.click('button[aria-label="search"]'), // Trigger the dialog
            user.page.waitForEvent('dialog').then(async (dialog) => {
                expect(dialog.message()).toBe('No results found for your search.');
                await dialog.dismiss();
            }),
        ]);
    }
}

export default NoResSearch;
