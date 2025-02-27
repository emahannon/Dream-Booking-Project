// Search.js
import Task from './Task';
import {expect} from "@playwright/test"; // Import the base Task class
import SearchInteraction from '../interaction/SearchClick'; // Import the reusable interaction


class Search extends Task {
    static withValidCredentials(query, day1, day2) {
        return new Search(query, day1, day2);
    }

    constructor(query, day1, day2) {
        super();
        this.query = query;
        this.day1 = day1;
        this.day2 = day2;
    }

    async performAs(user) {
        // await user.page.goto('http://localhost:3000/login');
        await SearchInteraction.perform(user, this.query, this.day1, this.day2); // Reuse the interaction
        await user.page.waitForSelector('.result-item'); // Wait for at least one result

        const results = user.page.locator('.result-item');
        const count = await results.count();
        await expect(count).toBeGreaterThan(0);    }
}

export default Search;
