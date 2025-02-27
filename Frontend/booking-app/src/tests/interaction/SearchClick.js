// SearchClick.js
export default class SearchInteraction {
    static async perform(user, query, day1, day2) {
        const searchInput = user.page.locator('input[placeholder="Search For Hotels by Destination City"]');

        // Step 4: Valid search query (query database)
        await searchInput.fill(query); // Replace with a valid test city name


        // Open the date picker popover
        const dateRangeButton2 = user.page.locator('button[aria-label="select date range"]');
        await dateRangeButton2.click(); // Click the IconButton to open the date selector popover

        // Wait for the date picker popover to appear
        await user.page.waitForSelector('role=dialog'); // Ensure the popover is visible

        // Locate the date picker inputs using their placeholder or CSS classes
        const startDateInput2 = user.page.locator('input[placeholder="MM/DD/YYYY"]').first(); // First input for start date
        const endDateInput2 = user.page.locator('input[placeholder="MM/DD/YYYY"]').nth(1); // Second input for end date

        // Fill the start and end dates
        await startDateInput2.fill(day1); // Example start date
        await endDateInput2.fill(day2); // Example end date

        // Close the popover (optional)
        const body2 = user.page.locator('body');
        await body2.click(); // Click outside to close the popover

        await user.page.click('button[aria-label="search"]'); // Trigger the dialog
        // Wait
    }
}
