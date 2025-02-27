import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Offer from '../../components/Offer/Offer';

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Offer', () => {
    const props = {
        buttonText: "Book Now",
        date1: "2025-01-10",
        date2: "2025-01-15",
        id: "1",
        name: "Test Hotel",
        address: "123 Street",
        city: "Test City",
        phone: "123456789",
        email: "test@test.com",
        website: "https://example.com",
        rating: 4,
        minTotal: 100,
        maxTotal: 200,
        search: "test-search",
        past: false,
    };

    // test 1 component rendering
    test('renders correctly', () => {
        render(
            <MemoryRouter>
                <Offer {...props} />
            </MemoryRouter>
        );

        // check for correct rendering
        expect(screen.getByText('Test Hotel')).toBeInTheDocument();
        expect(screen.getByText('(100€ - 200€)')).toBeInTheDocument();
        expect(screen.getByText('123 Street, Test City')).toBeInTheDocument();
        expect(screen.getByText('test@test.com')).toBeInTheDocument();
        expect(screen.getByText('123456789')).toBeInTheDocument();
        expect(screen.getByText('https://example.com')).toBeInTheDocument();
        expect(screen.getByText('Book Now')).toBeInTheDocument();
    });

    // test 2 event handling - button click and navigation
    test('navigates to booking page when button clicked', () => {
        const navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);

        render(
            <MemoryRouter>
                <Offer {...props} />
            </MemoryRouter>
        );

        // click button
        const button = screen.getByText('Book Now');
        fireEvent.click(button);

        // ensure navigate  called with the correct path
        expect(navigate).toHaveBeenCalledWith('/booking/1/2025-01-10/2025-01-15');
    });


    // test 3 missing button text
    test('displays default text when buttonText not provided', () => {
        render(
            <MemoryRouter>
                <Offer
                    date1="2025-01-10"
                    date2="2025-01-15"
                    id="1"
                    name="Test Hotel"
                    address="123 Street"
                    city="Test City"
                    phone="123456789"
                    email="test@test.com"
                    website="https://example.com"
                    rating={4}
                    minTotal={100}
                    maxTotal={200}
                    search="test-search"
                />
            </MemoryRouter>
        );

        expect(screen.getByText('Book')).toBeInTheDocument();
    });
});
