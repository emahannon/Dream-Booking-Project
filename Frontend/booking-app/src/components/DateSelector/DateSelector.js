import React, { useState } from 'react';
import { IconButton, Popover, Box, TextField } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';

const DateSelector = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        console.log('Popover closing');
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    // Function to format a date
    const formatDate = (date) => (date ? dayjs(date).format('YYYY-MM-DD') : '');

    return (
        <Box>
            <IconButton
                type="button"
                sx={{ p: '10px' }}
                aria-label="select date range"
                onClick={handleOpen}
            >
                <DateRangeIcon />
            </IconButton>

            <Popover
                open={open}
                role="dialog"
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue) => {
                                onStartDateChange(newValue);
                                console.log(`Formatted Start Date: ${formatDate(newValue)}`);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => {
                                onEndDateChange(newValue);
                                console.log(`Formatted End Date: ${formatDate(newValue)}`);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>
                </Box>
            </Popover>
        </Box>
    );


};

export default DateSelector;
