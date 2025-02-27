import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import HotelFilter from '../../components/HotelFilter/HotelFilter';
import userEvent from '@testing-library/user-event';


// tests
describe('HotelFilter', () => {
    const props = {
        id: 'hotel-filter',
        anchorEl: document.body,
        open:true,
        onClose: jest.fn(),
        minPrice: '50',
        maxPrice: '200',
        guests: '2',
        rating: 3,
        handleMinPriceChange: jest.fn(),
        handleMaxPriceChange: jest.fn(),
        handleGuestsChange: jest.fn(),
        handleRatingChange: jest.fn(),
    };

   // test 1 rendering
   test('render HotelFilter component', () => {
       render(<HotelFilter {...props} />);

       // check title
       expect(screen.getByText('Hotel Filter Options')).toBeInTheDocument();

       // check min price input
       expect(screen.getByLabelText('Min Price')).toBeInTheDocument();

       // check max price input
       expect(screen.getByLabelText('Max Price')).toBeInTheDocument();

       // check for guests input
       expect(screen.getByPlaceholderText('Number of Guests')).toBeInTheDocument();

       // check for rating input
       expect(screen.getByText('Rating')).toBeInTheDocument();

   });

   // test 2 input change
    test('handle input change for minPrice, maxPrice, and guests', async () => {
        render(<HotelFilter {...props} />);

        // changing maxprice input
        const maxPriceInput = screen.getByLabelText('Max Price');
        // fireEvent.change(maxPriceInput, {target: {value: '200'}});
        userEvent.type(maxPriceInput, '300');
        await waitFor(() => {
            expect(props.handleMaxPriceChange).toHaveBeenCalledWith(expect.any(Object));
        });

        // changing minprice input
        const minPriceInput = screen.getByLabelText('Min Price');
        // fireEvent.change(minPriceInput, {target: {value: '100'}});
        userEvent.type(minPriceInput, '100');
        expect(props.handleMinPriceChange).toHaveBeenCalledWith(expect.any(Object));


        // changing guests input
        const guestsInput = screen.getByPlaceholderText('Number of Guests');
        fireEvent.change(guestsInput, {target: {value: '3'}});
        expect(props.handleGuestsChange).toHaveBeenCalledTimes(1);


    });

    // test 3 rating change
    test('should handle rating change when a star is clicked', () => {
        render(<HotelFilter {...props} />);
        expect(screen.getByText('Rating')).toBeInTheDocument();

        // get all stars
        const stars = screen.getAllByRole('radio');

        // click on 5th star
        fireEvent.click(stars[4]);

        expect(props.handleRatingChange).toHaveBeenCalledTimes(1);
        expect(props.handleRatingChange).toHaveBeenCalledWith(expect.anything(), 5);
    });

    // test 4 test input for price and guests
    test('should restrict input to numbers for price and guests inputs', () => {
        render(<HotelFilter {...props} />);

        const minPriceInput = screen.getByLabelText('Min Price');
        fireEvent.keyDown(minPriceInput, { key: 'a' });
        expect(minPriceInput.value).toBe('50'); // It should not allow the non-numeric input

        const guestsInput = screen.getByPlaceholderText('Number of Guests');
        fireEvent.keyDown(guestsInput, { key: 'a' });
        expect(guestsInput.value).toBe('2'); // It should not allow the non-numeric input
    });

});
