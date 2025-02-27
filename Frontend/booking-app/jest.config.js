module.exports = {
    testEnvironment: 'jsdom', // Simulates a browser environment for DOM testing
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Points to the setup file
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock styles
        '^@/(.*)$': '<rootDir>/src/$1', // Alias for cleaner imports
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore build files
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use Babel for JS/TS files
    },
};