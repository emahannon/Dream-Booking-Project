import React from 'react';

import { FormGroup, FormControlLabel, Typography, Popover } from '@mui/material';
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Grid from '@mui/material/Grid2';

import './HotelFilter.css'
import Rating from "@mui/material/Rating";

function HotelFilter({id, anchorEl, open, onClose, minPrice, maxPrice, guests, rating, handleMinPriceChange, handleMaxPriceChange, handleGuestsChange, handleRatingChange}) {

    const restrictInputToNumbers = (event) => {
        const { key } = event;

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
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-username">Min Price</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-username"
                                label="Min Price"
                                onKeyDown={restrictInputToNumbers}
                                inputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                }}
                                value={minPrice}
                                onChange={handleMinPriceChange}
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-max-price">Max Price</InputLabel>
                            <OutlinedInput
                                id="outlined-max-price"
                                label="Max Price"
                                onKeyDown={restrictInputToNumbers}
                                inputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                }}
                                value={maxPrice}
                                onChange={handleMaxPriceChange}
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
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                }}
                                value={guests}
                                onChange={handleGuestsChange}
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
                            value={rating}
                            onChange={handleRatingChange}
                        />
                    </Grid>
                </Grid>
            </FormGroup>
        </Popover>
    );
}
export default HotelFilter;