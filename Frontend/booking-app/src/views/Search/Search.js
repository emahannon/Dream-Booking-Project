import React, { useState, useEffect } from 'react';
import { Paper, InputBase, Divider, IconButton, FormGroup, FormControlLabel, Switch, Stack, Typography, Box } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';

import FlightFilter from '../../components/FlightFilter/FlightFilter'
import HotelFilter from '../../components/HotelFilter/HotelFilter'
import DateSelector from '../../components/DateSelector/DateSelector'
import Offer from '../../components/Offer/Offer'


function Search() {
    useEffect(() => {
        document.title = "Search DBS"; // Set the title for the search page
    }, []);

    const [filterMenu, setFilterMenu] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        flightClass: '',
        luggage: false,
        price: 0,
    });

    const [isFlightSearch, setIsFlightSearch] = useState(true); // New state for search type


    const handleFilterClick = (event) => {
        setFilterMenu(event.currentTarget);
    };

    const handleFilterClose = () => {
        setFilterMenu(null);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        console.log('Search Query:', searchQuery);
        console.log('Filters:', filters);
    };

    const handleFilterChange = (newFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters,
        }));
    };

    const handlePriceChange = (newValue) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            price: newValue,
        }));
    };

    const handleSwitchChange = (event) => {
        setIsFlightSearch(event.target.checked); // Switch between hotel and flight search
    };

    const open = Boolean(filterMenu);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // Center content horizontally
                    justifyContent: 'flex-start', // Align items at the top
                    my: 10,  // Set top and bottom margin to 0
                    mx: 'auto', // Center the box horizontally
                    width: '100%', // Adjust width as needed
                    p: 0, // Set padding to 0 to reduce extra space
                }}
                noValidate
                autoComplete="off"
                className="center-box"
            >
                <Stack direction="column" spacing={0} sx={{alignItems: 'center'}}>
                    <h1>Dream Booking System &#9992;</h1>
                    <Paper
                        component="form"
                        sx={{ p: '3px 5px', borderRadius:'20px', display: 'flex', alignItems: 'center', width: 450 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder={isFlightSearch ? "Search For Flights by Destination City" : "Search For Hotels by Destination City"}
                            inputProps={{ 'aria-label': isFlightSearch ? 'search for flights' : 'search for hotels' }}
                            onChange={handleSearchChange}
                        />

                        <DateSelector />

                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>

                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={handleFilterClick}>
                            <MenuIcon />
                        </IconButton>
                    {/*    if the hotel filter is switched on then call hotel filter*/}
                        {isFlightSearch ? (
                            <FlightFilter id={id} anchorEl={filterMenu} open={open} onClose={handleFilterClose} filters={filters} onFilterChange={handleFilterChange} onPriceChange={handlePriceChange} />

                        ) : (
                            <HotelFilter id={id} anchorEl={filterMenu} open={open} onClose={handleFilterClose} filters={filters} onFilterChange={handleFilterChange} />
                        )}

                    </Paper>
                    <FormGroup>
                        <Stack direction="row" spacing={1} sx={{alignItems:'center'}}>
                            <Typography>Hotels</Typography>
                            <FormControlLabel control={<Switch checked={isFlightSearch} onChange={handleSwitchChange} />} label="" />
                            <Typography>Flights</Typography>
                        </Stack>
                    </FormGroup>
                    <h2>Recommended Offers</h2>
                </Stack>
                <Offer></Offer>
                <Offer></Offer>
                <Offer></Offer>
            </Box>
        </>
    );
}

export default Search;