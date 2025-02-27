// Login.js
import Task from './Task';
import {expect} from "@playwright/test";
import LoginInteraction from '../interaction/LoginClick'; // Import the reusable interaction

class LoginNoEmail extends Task {
    static withInvalidCredentials(password) {
        return new LoginNoEmail(password);
    }

    constructor(password) {
        super();
        this.email = '';
        this.password = password;
    }

    async performAs(user) {
        await LoginInteraction.perform(user, this.email, this.password); // Reuse the interaction
        await expect(user.page.locator('form .MuiFormHelperText-root')).toHaveText('Email is required');
    }
}

export default LoginNoEmail;
