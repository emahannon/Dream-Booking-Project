import React from 'react';
import {render, screen, fireEvent, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Book from '../../views/Book/Book';
import { MemoryRouter } from 'react-router-dom';
import { format, subYears } from 'date-fns';
import * as fireevent from "react-dom/test-utils";
import { ThemeProvider, createTheme } from '@mui/material/styles';


describe('Book Component - Name', () => {

    test('should display an error when the full name is less than 3 characters', async () => {
        render(
            <MemoryRouter>  {/* Wrap the component in MemoryRouter */}
                <Book />
            </MemoryRouter>
        );

        // Find the name input field by role and name
        const nameInput = screen.getByRole('textbox', { name: /Name/i });

        // Type an invalid name (less than 3 characters)
        userEvent.type(nameInput, 'Jo');

        // Check if the error is displayed in the helperText
        const errorMessage = await screen.findByText(/Invalid Name/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test('should not display an error when the full name is valid', () => {
        render(
            <MemoryRouter>  {/* Wrap the component in MemoryRouter */}
                <Book />
            </MemoryRouter>
        );

        // Find the name input field by role and name
        const nameInput = screen.getByRole('textbox', { name: /Name/i });

        // Type a valid name
        userEvent.type(nameInput, 'John');

        // Check that no error message is shown
        const errorMessage = screen.queryByText(/Invalid Name/i);
        expect(errorMessage).not.toBeInTheDocument();
    });

    test('should display an error when the name contains non-alphabetic characters', async () => {
        render(
            <MemoryRouter>  {/* Wrap the component in MemoryRouter */}
                <Book />
            </MemoryRouter>
        );

        // Find the name input field by role and name
        const nameInput = screen.getByRole('textbox', { name: /Name/i });

        // Type an invalid name with non-alphabetic characters
        userEvent.type(nameInput, 'John123');

        // Check for the error message in the helperText
        const errorMessage = await screen.findByText(/Invalid Name/i);
        expect(errorMessage).toBeInTheDocument();
    });
});

describe('Book Component - Date of Birth', () => {

    const getCurrentDate = () => format(new Date(), 'yyyy-MM-dd'); // Returns current date in YYYY-MM-DD
    const get120YearsAgoDate = () => format(subYears(new Date(), 120), 'yyyy-MM-dd'); // Returns the date 120 years ago in YYYY-MM-DD
    const get121YearsAgoDate = () => format(subYears(new Date(), 121), 'yyyy-MM-dd'); // Returns the date 121 years ago in YYYY-MM-DD

    test('should display an error when the date is in the future', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        const dobInput = screen.getByLabelText(/Date of Birth/i);

        // Type a future date (e.g., tomorrow)
        const futureDate = format(new Date().setFullYear(new Date().getFullYear() + 1), 'yyyy-MM-dd');
        userEvent.type(dobInput, futureDate);

        // Check for error message related to the date
        const errorMessage = await screen.findByText(/Invalid Date/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test('should display an error when the date is more than 120 years ago', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        // Find the Date of Birth input field
        const dobInput = screen.getByLabelText(/Date of Birth/i);

        // Type a date more than 120 years ago
        const oldDate = get121YearsAgoDate();
        userEvent.type(dobInput, oldDate);

        // Check for error message related to the date
        const errorMessage = await screen.findByText(/Invalid Date/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test('should not display an error when the date is exactly 120 years ago', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        // Find the Date of Birth input field
        const dobInput = screen.getByLabelText(/Date of Birth/i);

        // Type a date exactly 120 years ago
        const boundaryDate = get120YearsAgoDate();
        userEvent.type(dobInput, boundaryDate);

        // Ensure no error message appears
        const errorMessage = screen.queryByText(/Invalid Date/i);
        expect(errorMessage).not.toBeInTheDocument();
    });

    test('should not display an error when the date is today', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        // Find the Date of Birth input field
        const dobInput = screen.getByLabelText(/Date of Birth/i);

        // Type today's date
        const todayDate = getCurrentDate();
        userEvent.type(dobInput, todayDate);

        // Ensure no error message appears
        const errorMessage = screen.queryByText(/Invalid Date/i);
        expect(errorMessage).not.toBeInTheDocument();
    });

    test('should display an error when the date is in the wrong format (MM/DD/YYYY)', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        // Find the Date of Birth input field
        const dobInput = screen.getByLabelText(/Date of Birth/i);

        // Type a date in MM/DD/YYYY format
        userEvent.type(dobInput, '12/25/1990');  // Incorrect format

        // Check for error message related to the date
        const errorMessage = await screen.findByText(/Invalid Date/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test('should display an error when the date is not a valid date (e.g., 31/02/1990)', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        // Find the Date of Birth input field
        const dobInput = screen.getByLabelText(/Date of Birth/i);

        // Type an invalid date (e.g., February 31)
        userEvent.type(dobInput, '1990-02-31');  // Invalid date

        // Check for error message related to the date
        const errorMessage = await screen.findByText('Invalid Date');
        expect(errorMessage).toBeInTheDocument();
    });

});

describe('Book Component - Gender', () => {

    test('renders gender form', async () => {
       render(
           <MemoryRouter>
               <Book />
           </MemoryRouter>
       );

       expect(screen.getByText(/Gender/i)).toBeInTheDocument();

       // check if male and female option present
        expect(screen.getByRole('radio', { name: /Male/i, checked: false })).toBeInTheDocument();
        expect(screen.getByLabelText(/Female/i)).toBeInTheDocument();
    });

    test('check for correct default values', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );
        expect(screen.getByRole('radio', { name: /Male/i, checked: false })).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: /Female/i, checked: true })).toBeInTheDocument();

    });

    test('update state when Male is selected', () => {
        // const setIsMaleMock = jest.fn();
        // jest.spyOn(React, 'useState').mockImplementationOnce(() => [false, setIsMaleMock]);

        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        const maleradio = screen.getByRole('radio', { name: /Male/i, checked: false });
        fireEvent.click(maleradio);
        expect(maleradio.value).toBe('true');

    });

    test('renders male and female radio buttons with correct initial state', () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        const maleRadio = screen.getByRole('radio', { name: /Male/i, checked: false });
        const femaleRadio = screen.getByRole('radio', { name: /Female/i, checked: true });

        screen.getAllByRole('radio', { name: /Male/i }).forEach((element) => {
            console.log(element);
        });


        expect(maleRadio).toBeInTheDocument();
        expect(maleRadio).not.toBeChecked(); // Ensure Male is unchecked initially

        expect(femaleRadio).toBeInTheDocument();
        expect(femaleRadio).toBeChecked(); // Ensure Female is checked initially
    });
});


describe('Phone Number Validation in Book Component', () => {
    test('should accept a valid phone number with exactly 9 digits', () => {
        render(<MemoryRouter>
            <Book />
        </MemoryRouter>);

        const input = screen.getByLabelText(/Phone/i); // Assuming the input has a role of textbox
        fireEvent.change(input, { target: { value: '100000000' } });
        expect(input.value).toBe('100000000'); // Mask applied


    });

    test('should accept a valid phone number with max value', () => {
        render(<MemoryRouter>
            <Book />
        </MemoryRouter>);

        const input = screen.getByLabelText(/Phone/i); // Assuming the input has a role of textbox
        fireEvent.change(input, { target: { value: '999999999' } });
        expect(input.value).toBe('999999999'); // Mask applied


    });

    test('should accept a valid phone number with max value', async () => {
        render(<MemoryRouter>
            <Book />
        </MemoryRouter>);

        const input = screen.getByLabelText(/Phone/i); // Assuming the input has a role of textbox
        fireEvent.change(input, { target: { value: '12345678976543' } });
        const errorMessage = await screen.findByText(/Invalid Name/i);
        expect(errorMessage).toBeInTheDocument();

    });

    test('should accept a valid phone number with max value', async () => {
        render(<MemoryRouter>
            <Book />
        </MemoryRouter>);

        const input = screen.getByLabelText(/Phone/i); // Assuming the input has a role of textbox
        fireEvent.change(input, { target: { value: '-111111111' } });
        const errorMessage = await screen.findByText(/Invalid Name/i);
        expect(errorMessage).toBeInTheDocument();

    });




    test('should display valid phone number format with mask in place', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        const input = screen.getByLabelText(/Phone/i);
        fireEvent.change(input, { target: { value: '+999 000000000' } });

        // Assuming you expect a specific phone format to be displayed
        expect(input.value).toBe('+999 000000000'); // Mask applied
    });
});


describe('Number of Guests Validation', () => {
    test('should validate number of guests 1', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );


        const nameInput = screen.getByRole('textbox', { name: /Number of Guests/i });
        // Type a valid name
        userEvent.type(nameInput, '1');
        expect(nameInput.value).toBe('1');
    });

    test('should validate number of guests 5', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );


        const nameInput = screen.getByRole('textbox', { name: /Number of Guests/i });
        // Type a valid name
        userEvent.type(nameInput, '5');
        expect(nameInput.value).toBe('5');
    });

    test('should validate number of guests 0', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );


        const nameInput = screen.getByRole('textbox', { name: /Number of Guests/i });
        // Type a valid name
        userEvent.type(nameInput, '0');
        expect(nameInput.value).not.toBe('0');
    });

    test('should validate number of guests 5', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );


        const nameInput = screen.getByRole('textbox', { name: /Number of Guests/i });
        // Type a valid name
        userEvent.type(nameInput, '6');
        expect(nameInput.value).not.toBe('6');
    });

    test('should validate number of guests invalid 10', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );


        const nameInput = screen.getByRole('textbox', { name: /Number of Guests/i });
        // Simulate keyDown for '1' and '0'
        fireEvent.keyDown(nameInput, { key: '1' });  // '1' should be allowed

        // Manually trigger the input event to update the value
        fireEvent.input(nameInput, { target: { value: '1' } });

        // Verify after typing '1', the input value is '1'
        expect(nameInput.value).toBe('1');

        fireEvent.keyDown(nameInput, { key: '0' });  // '0' should be blocked

        // Manually trigger the input event again, but the value should remain '1'
        fireEvent.input(nameInput, { target: { value: '1' } });

        // The value should still be '1', as '0' is blocked
        expect(nameInput.value).toBe('1');
    });

    test('should validate number of guests invalid -1', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );


        const nameInput = screen.getByRole('textbox', { name: /Number of Guests/i });
        // Simulate keyDown for '1' and '0'
        fireEvent.keyDown(nameInput, { key: '-' });  // '1' should be allowed

        // Manually trigger the input event to update the value
        fireEvent.input(nameInput, { target: { value: '-' } });


        fireEvent.keyDown(nameInput, { key: '1' });  // '0' should be blocked

        // Manually trigger the input event again, but the value should remain '1'
        fireEvent.input(nameInput, { target: { value: '1' } });

        // The value should still be '1', as '0' is blocked
        expect(nameInput.value).toBe('1');
    });

});

describe('Book Component - Breakfast', () => {

    test('renders breakfast form', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        expect(screen.getByText(/Breakfast Included/i)).toBeInTheDocument();
        const breakfastForm = screen.getByText(/Breakfast Included/i).closest('fieldset, div, form');

        // Use `within` to scope the queries
        const { getByRole } = within(breakfastForm);

        // Assert specific radio buttons are rendered
        expect(getByRole('radio', { name: /Yes/i })).toBeInTheDocument();
        expect(getByRole('radio', { name: /No/i })).toBeInTheDocument();
    });

    test('check for correct default values', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        const breakfastForm = screen.getByText(/Breakfast Included/i).closest('fieldset, div, form');

        // Use `within` to scope the queries
        const { getByRole } = within(breakfastForm);

        // Assert specific radio buttons are rendered
        expect(getByRole('radio', { name: /Yes/i, checked: false })).toBeInTheDocument();
        expect(getByRole('radio', { name: /No/i })).toBeInTheDocument();

    });

    test('update state when Yes is selected', () => {
        // const setIsMaleMock = jest.fn();
        // jest.spyOn(React, 'useState').mockImplementationOnce(() => [false, setIsMaleMock]);

        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        const breakfastForm = screen.getByText(/Breakfast Included/i).closest('fieldset, div, form');

        // Use `within` to scope the queries
        const { getByRole } = within(breakfastForm);

        const yesradio = getByRole('radio', { name: /Yes/i, checked: false });
        fireEvent.click(yesradio);
        expect(yesradio.value).toBe('true');

    });

    test('renders yes and no radio buttons with correct initial state', () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        // Locate the form or container with the radios
        const breakfastText = screen.getByText(/Breakfast Included/i);
        expect(breakfastText).toBeInTheDocument();

        // Find the closest container
        const breakfastForm = breakfastText.closest('fieldset') || breakfastText.closest('div');
        expect(breakfastForm).toBeInTheDocument();

        // Scope queries within the container
        const { getByRole } = within(breakfastForm);

        const yesradio = getByRole('radio', { name: /Yes/i });
        const noradio = getByRole('radio', { name: /No/i });

        // Verify states
        expect(yesradio).not.toBeChecked();
        expect(noradio).toBeChecked();
    });
});

describe('Book Component - Smoking Preference', () => {

    test('renders smoking preference form', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        expect(screen.getByText(/Smoking Preference/i)).toBeInTheDocument();
        const breakfastForm = screen.getByText(/Smoking Preference/i).closest('fieldset, div, form');

        // Use `within` to scope the queries
        const { getByRole } = within(breakfastForm);

        // Assert specific radio buttons are rendered
        expect(getByRole('radio', { name: 'Smoking' })).toBeInTheDocument();
        expect(getByRole('radio', { name: /Non-smoking/i })).toBeInTheDocument();
    });

    test('check for correct default values', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        const breakfastForm = screen.getByText(/Smoking Preference/i).closest('fieldset, div, form');

        // Use `within` to scope the queries
        const { getByRole } = within(breakfastForm);

        // Assert specific radio buttons are rendered
        expect(getByRole('radio', { name: 'Smoking', checked: false })).toBeInTheDocument();
        expect(getByRole('radio', { name: /Non-smoking/i })).toBeInTheDocument();

    });

    test('update state when Yes is selected', () => {
        // const setIsMaleMock = jest.fn();
        // jest.spyOn(React, 'useState').mockImplementationOnce(() => [false, setIsMaleMock]);

        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        const breakfastForm = screen.getByText(/Smoking Preference/i).closest('fieldset, div, form');

        // Use `within` to scope the queries
        const { getByRole } = within(breakfastForm);

        const yesradio = getByRole('radio', { name: 'Smoking', checked: false });
        fireEvent.click(yesradio);
        expect(yesradio.value).toBe('true');

    });

    test('renders yes and no radio buttons with correct initial state', () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        // Locate the form or container with the radios
        const breakfastText = screen.getByText(/Smoking Preference/i);
        expect(breakfastText).toBeInTheDocument();

        // Find the closest container
        const breakfastForm = breakfastText.closest('fieldset') || breakfastText.closest('div');
        expect(breakfastForm).toBeInTheDocument();

        // Scope queries within the container
        const { getByRole } = within(breakfastForm);

        const yesradio = getByRole('radio', { name: 'Smoking' });
        const noradio = getByRole('radio', { name: /Non-smoking/i });

        // Verify states
        expect(yesradio).not.toBeChecked();
        expect(noradio).toBeChecked();
    });
});


describe('Book Component - Accessibility Features', () => {

    test('renders accessibility features form', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        expect(screen.getByText(/Accessibility Features Required/i)).toBeInTheDocument();
        const breakfastForm = screen.getByText(/Accessibility Features Required/i).closest('fieldset, div, form');

        // Use `within` to scope the queries
        const { getByRole } = within(breakfastForm);

        // Assert specific radio buttons are rendered
        expect(getByRole('radio', { name: 'Yes' })).toBeInTheDocument();
        expect(getByRole('radio', { name: 'No' })).toBeInTheDocument();
    });

    test('check for correct default values', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        const breakfastForm = screen.getByText(/Accessibility Features Required/i).closest('fieldset, div, form');

        // Use `within` to scope the queries
        const { getByRole } = within(breakfastForm);

        // Assert specific radio buttons are rendered
        expect(getByRole('radio', { name: 'Yes', checked: false })).toBeInTheDocument();
        expect(getByRole('radio', { name: 'No' })).toBeInTheDocument();

    });

    test('update state when Yes is selected', () => {
        // const setIsMaleMock = jest.fn();
        // jest.spyOn(React, 'useState').mockImplementationOnce(() => [false, setIsMaleMock]);

        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        const breakfastForm = screen.getByText(/Accessibility Features Required/i).closest('fieldset, div, form');

        // Use `within` to scope the queries
        const { getByRole } = within(breakfastForm);

        const yesradio = getByRole('radio', { name: 'Yes', checked: false });
        fireEvent.click(yesradio);
        expect(yesradio.value).toBe('true');

    });

    test('renders yes and no radio buttons with correct initial state', () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        // Locate the form or container with the radios
        const breakfastText = screen.getByText(/Accessibility Features Required/i);
        expect(breakfastText).toBeInTheDocument();

        // Find the closest container
        const breakfastForm = breakfastText.closest('fieldset') || breakfastText.closest('div');
        expect(breakfastForm).toBeInTheDocument();

        // Scope queries within the container
        const { getByRole } = within(breakfastForm);

        const yesradio = getByRole('radio', { name: 'Yes' });
        const noradio = getByRole('radio', { name: 'No' });

        // Verify states
        expect(yesradio).not.toBeChecked();
        expect(noradio).toBeChecked();
    });
});

describe('Book Component - Extra Bed', () => {

    test('renders extra bed form', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        expect(screen.getByText(/Extra Bed\/Cot/i)).toBeInTheDocument();
        const breakfastForm = screen.getByText(/Extra Bed\/Cot/i).closest('fieldset, div, form');

        // Use `within` to scope the queries
        const { getByRole } = within(breakfastForm);

        // Assert specific radio buttons are rendered
        expect(getByRole('radio', { name: 'Yes' })).toBeInTheDocument();
        expect(getByRole('radio', { name: 'No' })).toBeInTheDocument();
    });

    test('check for correct default values', async () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        const breakfastForm = screen.getByText(/Extra Bed\/Cot/i).closest('fieldset, div, form');

        // Use `within` to scope the queries
        const { getByRole } = within(breakfastForm);

        // Assert specific radio buttons are rendered
        expect(getByRole('radio', { name: 'Yes', checked: false })).toBeInTheDocument();
        expect(getByRole('radio', { name: 'No' })).toBeInTheDocument();

    });

    test('update state when Yes is selected', () => {
        // const setIsMaleMock = jest.fn();
        // jest.spyOn(React, 'useState').mockImplementationOnce(() => [false, setIsMaleMock]);

        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        const breakfastForm = screen.getByText(/Extra Bed\/Cot/i).closest('fieldset, div, form');

        // Use `within` to scope the queries
        const { getByRole } = within(breakfastForm);

        const yesradio = getByRole('radio', { name: 'Yes', checked: false });
        fireEvent.click(yesradio);
        expect(yesradio.value).toBe('true');

    });

    test('renders yes and no radio buttons with correct initial state', () => {
        render(
            <MemoryRouter>
                <Book />
            </MemoryRouter>
        );

        // Locate the form or container with the radios
        const breakfastText = screen.getByText(/Extra Bed\/Cot/i);
        expect(breakfastText).toBeInTheDocument();

        // Find the closest container
        const breakfastForm = breakfastText.closest('fieldset') || breakfastText.closest('div');
        expect(breakfastForm).toBeInTheDocument();

        // Scope queries within the container
        const { getByRole } = within(breakfastForm);

        const yesradio = getByRole('radio', { name: 'Yes' });
        const noradio = getByRole('radio', { name: 'No' });

        // Verify states
        expect(yesradio).not.toBeChecked();
        expect(noradio).toBeChecked();
    });
});








// must also still do credit card validation

// must also still do check in check out dates validation

describe ('Room Type Validation', () => {

});

// describe('Email Validation', () => {
//     test('should validate email format', async () => {
//         render(
//             <ThemeProvider theme={createTheme()}>
//                 <MemoryRouter>
//                     <Book/>
//                     <div data-testid="outside-element">Outside Element</div>
//                 </MemoryRouter>
//             </ThemeProvider>
//         );
//
//
//         const nameInput = screen.getByRole('textbox', { name: /Email/i });
//         fireEvent.change(nameInput, { target: { value: 'e.commm' } });
//         // Type a valid name
//         // userEvent.type(nameInput, 'e');
//         expect(nameInput.value).toBe('e.commm'); // Mask applied
//         // userEvent.tab();
//         // fireEvent.blur(nameInput);
//         // fireEvent.click(document.body);
//         fireEvent.click(screen.getByTestId('outside-element'));
//
//         await waitFor(() => {
//             const errorMessage = screen.getByText(/Invalid email/i);
//             expect(errorMessage).toBeInTheDocument();
//         });
//         // const errorMessage = await screen.findByText((content, element) =>
//         //     element.tagName.toLowerCase() === 'p' && content === 'Invalid email'
//         // );
//
//         // const errorMessage = await screen.findByText(/Invalid email/i);
//         // expect(errorMessage).toBeInTheDocument();
//     });
//
//     test('should display an error when the full name is less than 3 characters', async () => {
//         render(
//             <MemoryRouter>  {/* Wrap the component in MemoryRouter */}
//                 <Book />
//             </MemoryRouter>
//         );
//
//         // Find the name input field by role and name
//         const nameInput = screen.getByRole('textbox', { name: /Email/i });
//
//         fireEvent.keyDown(nameInput, { key: 'e' });  // '1' should be allowed
//
//         // Manually trigger the input event to update the value
//         fireEvent.input(nameInput, { target: { value: 'em' } });
//
//         // Verify after typing '1', the input value is '1'
//         expect(nameInput.value).toBe('em');
//
//         // fireEvent.keyDown(nameInput, { key: 'm' });  // '0' should be blocked
//         //
//         // // Manually trigger the input event again, but the value should remain '1'
//         // fireEvent.input(nameInput, { target: { value: 'm' } });
//         //
//         // // The value should still be '1', as '0' is blocked
//         // expect(nameInput.value).toBe('em');
//
//
//         // // Type an invalid name (less than 3 characters)
//         // userEvent.type(nameInput, 'em');
//
//         // Check if the error is displayed in the helperText
//         const errorMessage = await screen.findByText(/Invalid email/i);
//         expect(errorMessage).toBeInTheDocument();
//     });
//
//     // test('check for too short email', async () => {
//     //     render(
//     //         <MemoryRouter>
//     //             <Book />
//     //         </MemoryRouter>
//     //     );
//     //
//     //
//     //     const input = screen.getByLabelText(/Email/i);
//     //     fireEvent.change(input, { target: { value: 'e@a' } });
//     //
//     //     const errorMessage = await screen.findByText(/Invalid email/i);
//     //     expect(errorMessage).toBeInTheDocument();
//     // });
//
//     // test('check for too long email', async () => {
//     //
//     // });
//
// });





