// LoginInteraction.js
export default class LoginInteraction {
    static async perform(user, email, password) {
        await user.page.fill('#outlined-adornment-email', email);
        await user.page.fill('#outlined-adornment-password', password);
        await user.page.click('button:has-text("Login")');
    }
}
