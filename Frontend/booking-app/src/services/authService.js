// Not sure if this code will work it's from chatgpt

// API calls for login and signup????
export const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
        // Mock user validation
        if (email === 'test@test.com' && password === 'password') {
            resolve({ email });
        } else {
            reject(new Error('Invalid email or password'));
        }
    });
};

export const signupUser = (email, password) => {
    return new Promise((resolve, reject) => {
        // Simulate successful signup
        if (email && password.length >= 6) {
            resolve({ email });
        } else {
            reject(new Error('Signup failed, ensure the email is valid and password is at least 6 characters long.'));
        }
    });
};