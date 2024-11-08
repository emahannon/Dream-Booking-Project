import React, {useState} from 'react';

import { FormGroup, FormControlLabel, Checkbox, Typography, Slider, Popover } from '@mui/material';
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid2';

import './HotelFilter.css'
import Rating from "@mui/material/Rating";


// STILL NEED TO MAKE THIS RESPONSIVE
// SHOW ONE QUESTION PER LINE IF THE WINDOW IS TOO SMALL

function HotelFilter({id, anchorEl, open, onClose, filters, onFilterChange, onPriceChange}) {
    const handleFilterChange = (event) => {
        const { name, value, type, checked } = event.target;

        // Handle multiple selections for flightClass
        if (name === "flightClass") {
            const updatedClasses = checked
                ? [...filters.flightClass, value] // Add the selected class
                : filters.flightClass.filter((cls) => cls !== value); // Remove the unselected class

            onFilterChange({ flightClass: updatedClasses });
        } else {
            onFilterChange({
                [name]: type === "checkbox" ? checked : value,
            });
        }
    };

    const handlePriceChange = (event, newValue) => {
        onPriceChange(newValue);
    };


    // Function to restrict input to numbers only
    const restrictInputToNumbers = (event) => {
        const { key } = event;

        // Allow only numbers (0-9) and control keys (Backspace, Tab, Enter)
        if (!/^[0-9]$/.test(key) && key !== 'Backspace' && key !== 'Tab' && key !== 'Enter') {
            event.preventDefault();
        }
    };

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            sx={{ width: "100%" }}
        >

            <Typography variant="h5" sx={{ textAlign: 'center', pt:3, pb: 2}}>
                Hotel Filter Options
            </Typography>

            <FormGroup sx={{ margin: 5, width: 500, marginTop:0, p:1}}>
                <Grid container spacing={4} alignItems="flex-start" justifyContent="flex-start">
                    <Grid size={12}>
                        <Typography variant="subtitle1">Price in Euro (€)</Typography>
                        {/*STILL NEED TO FINISH THE STYLES FOR THIS*/}
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-username">Min Price</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-username"
                                label="Min Price"
                                onKeyDown={restrictInputToNumbers}
                                inputProps={{
                                    inputMode: 'numeric', // Allows only numeric input on mobile devices
                                    pattern: '[0-9]*',    // Ensures only numbers are allowed
                                }}
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-username">Max Price</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-username"
                                label="Max Price"
                                onKeyDown={restrictInputToNumbers}
                                inputProps={{
                                    inputMode: 'numeric', // Allows only numeric input on mobile devices
                                    pattern: '[0-9]*',    // Ensures only numbers are allowed
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="subtitle1">Number of Guests</Typography>
                        <FormControl variant="outlined">
                            <OutlinedInput
                                id="outlined-adornment-username"
                                placeholder={"Number of Guests"}
                                onKeyDown={restrictInputToNumbers}
                                inputProps={{
                                    inputMode: 'numeric', // Allows only numeric input on mobile devices
                                    pattern: '[0-9]*',    // Ensures only numbers are allowed
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="subtitle1">Rating</Typography>
                        <FormControlLabel
                            control={
                                <Rating name="size-large" defaultValue={0} size="large" />
                            }
                            label=""
                        />
                    </Grid>
                </Grid>
            </FormGroup>
        </Popover>
    );
}
export default HotelFilter;