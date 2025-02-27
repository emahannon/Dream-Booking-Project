// Login.js
import Task from './Task';
import {expect} from "@playwright/test"; // Import the base Task class
import LoginInteraction from '../interaction/LoginClick'; // Import the reusable interaction


class Login extends Task {
    static withValidCredentials() {
        return new Login('johndoe@gmail.com', '12345');
    }

    constructor(email, password) {
        super();
        this.email = email;
        this.password = password;
    }

    async performAs(user) {
        await LoginInteraction.perform(user, this.email, this.password); // Reuse the interaction
        await expect(user.page).toHaveURL('http://localhost:3000/', { timeout: 10000 });
    }
}

export default Login;
