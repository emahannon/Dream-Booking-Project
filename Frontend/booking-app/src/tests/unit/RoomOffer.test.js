// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { RoomOffer } from '../../components/RoomOffer/RoomOffer'; // Named import
//
//
// // Mocking useNavigate
// jest.mock('react-router-dom', () => ({
//     useNavigate: jest.fn(),
// }));
//
// describe('RoomOffer', () => {
//     const props = {
//         buttonText: "Book Now",
//         date1: "2025-01-10",
//         date2: "2025-01-15",
//         hotelId: "123",
//         roomId: "456",
//         name: "Deluxe Room",
//         facilities: "Free Wifi, Pool",
//         price: "100",
//         capacity: "2",
//         type: "Single",
//         booking: true,
//     };
//
//     // Test 1: Render component with correct props
//     test('renders component with correct props', async () => {
//         render(
//             <MemoryRouter>
//                 <RoomOffer {...props} />
//             </MemoryRouter>
//         );
//
//         // Use `waitFor` to ensure that everything is rendered asynchronously
//         await waitFor(() => {
//             expect(screen.getByText('Deluxe Room 100 €')).toBeInTheDocument();
//             expect(screen.getByText('Single')).toBeInTheDocument();
//             expect(screen.getByText('Capacity: 2')).toBeInTheDocument();
//             expect(screen.getByText('Free Wifi, Pool')).toBeInTheDocument();
//             expect(screen.getByText('Book Now')).toBeInTheDocument();
//         });
//     });
// });
