// Login.js
import Task from './Task';
import {expect} from "@playwright/test";
import LoginInteraction from '../interaction/LoginClick'; // Import the reusable interaction

class LoginNoInput extends Task {
    static withInvalidCredentials() {
        return new LoginNoInput();
    }

    constructor() {
        super();
        this.email = '';
        this.password = '';
    }

    async performAs(user) {
        await LoginInteraction.perform(user, '', ''); // Reuse the interaction


    }
}

export default LoginNoInput;
