// DateRangeSelector.js
import React, { useState } from 'react';
import { IconButton, Popover, Box, TextField } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';

const DateSelector = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const open = Boolean(anchorEl);

    return (
        <Box>
            <IconButton type="button" sx={{ p: '10px' }} aria-label="select date range" onClick={handleOpen}>
                <DateRangeIcon />
            </IconButton>

            <Popover
                open={open}
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
                            onChange={(newValue) => setStartDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>
                </Box>
            </Popover>
        </Box>
    );
};

export default DateSelector;