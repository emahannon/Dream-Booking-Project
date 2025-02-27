import '@testing-library/jest-dom'; // Extends Jest with custom matchers
import { server } from './src/tests/mocks/server'; // Optional: For mocking API calls

// Start the server before all tests if using MSW (Mock Service Worker)
beforeAll(() => server?.listen());
// Reset handlers after each test
afterEach(() => server?.resetHandlers());
// Close the server after all tests
afterAll(() => server?.close());
