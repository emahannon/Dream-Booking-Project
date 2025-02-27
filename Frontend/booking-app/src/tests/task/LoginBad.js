// Login.js
import Task from './Task';
import {expect} from "@playwright/test"; // Import the base Task class
import LoginInteraction from '../interaction/LoginClick'; // Import the reusable interaction


class LoginBad extends Task {
    static withInvalidCredentials(email, password) {
        return new LoginBad(email, password);
    }

    constructor(email, password) {
        super();
        this.email = email;
        this.password = password;
    }

    async performAs(user) {
        // await user.page.goto('http://localhost:3000/login');
        await LoginInteraction.perform(user, this.email, this.password); // Reuse the interaction
        user.page.once('dialog', async (dialog) => {
            // Assert the alert message
            expect(dialog.message()).toBe('Invalid email or password. Please try again.');
            await dialog.dismiss();  // Close the alert
        });
    }
}

export default LoginBad;
