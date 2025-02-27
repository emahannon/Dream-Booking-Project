// User.js
import Task from '../task/Task.js'; // Import the base Task class

class User {
    constructor(page) {
        this.page = page;
    }

    performs(task) {
        return task.performAs(this);
    }
}

export default User;