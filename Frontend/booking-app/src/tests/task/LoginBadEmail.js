// Login.js
import Task from './Task';
import {expect} from "@playwright/test";
import LoginInteraction from '../interaction/LoginClick'; // Import the reusable interaction

class LoginBadEmail extends Task {
    static withInvalidCredentials(email, password) {
        return new LoginBadEmail(email, password);
    }

    constructor(email, password) {
        super();
        this.email = email;
        this.password = password;
    }

    async performAs(user) {
        await LoginInteraction.perform(user, this.email, this.password); // Reuse the interaction
        await expect(user.page.locator('form .MuiFormHelperText-root')).toHaveText('Invalid email format');
    }
}

export default LoginBadEmail;
