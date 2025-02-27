import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import DateSelector from '../../components/DateSelector/DateSelector';

// Mock DatePicker from MUI
// verify how DateSelector interacts with DataPicker
// simplify and focus on DateSelector behavior
// DatePicker already tested by MUI
jest.mock('@mui/x-date-pickers/DatePicker', () => ({
    DatePicker: ({label, value, onChange, renderInput}) => (
        <div>
            <label>{label}</label>
            <input
                data-testid={label.toLowerCase().replace(' ', '-')}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    ),
}));

// beginning of the tests
describe ('DateSelector Component', () => {
    const mockStartDate = '2025-01-01';
    const mockEndDate = '2025-01-01';
    const mockOnStartDateChange = jest.fn();
    const mockOnEndDateChange = jest.fn();

    // test 1 rendering
    test('render the IconButton and Popover', () => {
        render(
            <DateSelector
                startDate={mockStartDate}
                endDate={mockEndDate}
                onStartDateChange={mockOnStartDateChange}
                onEndDateChange={mockOnEndDateChange}
            />
        );

        // check rendering IconButton
        const button = screen.getByRole('button', {name: /select date range/i});
        expect(button).toBeInTheDocument();

        // check popover initially closed
        const popover = screen.queryByRole('dialog');
        expect(popover).not.toBeInTheDocument();
    });

    // test 2 popover function
    test('open popover on click of IconButton', async () => {
        // const ref = React.createRef();
        render(
            <DateSelector
                // ref={ref}
                startDate={mockStartDate}
                endDate={mockEndDate}
                onStartDateChange={mockOnStartDateChange}
                onEndDateChange={mockOnEndDateChange}
            />
        );
        const button = screen.getByRole('button', {name: /select date range/i});

        // open popover
        fireEvent.click(button);
        await waitFor(() => screen.getByRole('dialog'));
        const popover = screen.getByRole('dialog');
        expect(popover).toBeInTheDocument();

    });

    // test 3
    test('calls onStartDateChange and onEndDateChange with correct values', () => {
        render(
            <DateSelector
                startDate={mockStartDate}
                endDate={mockEndDate}
                onStartDateChange={mockOnStartDateChange}
                onEndDateChange={mockOnEndDateChange}
            />
        );


        // open popover
        const button = screen.getByRole('button', {name: /select date range/i});
        fireEvent.click(button);

        // input start date
        const startDateInput = screen.getByTestId('start-date');
        fireEvent.change(startDateInput, {target: {value: '2025-02-01'}});
        expect(mockOnStartDateChange).toHaveBeenCalledTimes(1);

        // input start date
        const endDateInput = screen.getByTestId('end-date');
        fireEvent.change(endDateInput, {target: {value: '2025-02-28'}});
        expect(mockOnEndDateChange).toHaveBeenCalledTimes(1);
    });

});