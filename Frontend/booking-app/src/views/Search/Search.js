import React, { useState, useEffect } from 'react';
import { Paper, InputBase, Divider, IconButton, Stack, Box } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';

import HotelFilter from '../../components/HotelFilter/HotelFilter'
import DateSelector from '../../components/DateSelector/DateSelector'
import Offer from '../../components/Offer/Offer'
import dayjs from "dayjs";


function Search() {
    useEffect(() => {
        document.title = "Search DBS"; // Set the title for the search page
    }, []);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [stringDate1, setStringDate1] = useState('');
    const [stringDate2, setStringDate2] = useState('');

    const [filterMenu, setFilterMenu] = useState(null);
    const [city, setCity] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [guests, setGuests] = useState('');
    const [rating, setRating] = useState(0);
    const [results, setResults] = useState([]);

    const [searched, setSearched] = useState(false);

    // const [isFlightSearch, setIsFlightSearch] = useState(false); // New state for search type


    const handleFilterClick = (event) => {
        setFilterMenu(event.currentTarget);
    };

    const handleFilterClose = () => {
        setFilterMenu(null);
    };

    const handleSearchChange = (event) => {
        setCity(event.target.value);
    };

    const getRecommended = async () => {
        // set result using setResult
    };

    const handleSearch = async () => {
        const queryParams = new URLSearchParams();


        if (city === "") {
            alert("Search field must be filled.");
            return;
        }
        if (!startDate && !endDate) {
            alert("Both start date and end date must be filled.");
            return;
        }

        // Add required parameters
        queryParams.append('city', city);
        if (startDate) queryParams.append('checkInDate', startDate.toISOString().split('T')[0]);
        if (endDate) queryParams.append('checkOutDate', endDate.toISOString().split('T')[0]);

        console.log(typeof startDate.toISOString().split('T')[0]);
        setStringDate1(startDate.toISOString().split('T')[0]);
        setStringDate2(endDate.toISOString().split('T')[0]);
        console.log(stringDate1);


        // Add optional parameters if provided
        if (minPrice) queryParams.append('minPrice', minPrice);
        if (maxPrice) queryParams.append('maxPrice', maxPrice);
        if (rating) queryParams.append('minRating', rating);
        if (guests) queryParams.append('maxGuests', guests);


        setSearched(true);

        try {
            const response = await fetch(`http://localhost:8085/api/main/search?${queryParams.toString()}`, {
                method: 'GET',
            });
            if (!response.ok) {
                alert("No results found for your search.");
                throw new Error('Search request failed');
            }

            const data = await response.json();

            if (!data || (Array.isArray(data) && data.length === 0) || Object.keys(data).length === 0) {
                alert("No results found for your search.");
                return;
            }

            console.log('Search Results:', data);
            // Update state with the search results (if needed)
            setResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleMinPriceChange = (event) => {
        const value = event.target.value;
        console.log('Min:', minPrice, value);
        if (/^\d*$/.test(value)) {  // Only allow digits
            if (maxPrice && parseInt(value, 10) > parseInt(maxPrice, 10)) {
                alert("Min price cannot be greater than Max price");
                return;
            }
            setMinPrice(value);
        }
    }

    const handleMaxPriceChange = (event) => {
        const value = event.target.value;
        console.log('Max:', maxPrice, value);
        if (minPrice && parseInt(value, 10) < parseInt(minPrice, 10)) {
            alert("Max price cannot be less than Min price");
            return;
        }
        setMaxPrice(value);
    }

    const handleGuestsChange = (event) => {
        const value = event.target.value;
        console.log('Guests:', guests, value);
        if (/^\d{0,1}$/.test(value)) {  // Only allow digits
            setGuests(value);
        }
    }

    const handleRatingChange = (event) => {
        const value = event.target.value;
        console.log('Rating:', rating, value);
        if (/^\d{0,1}$/.test(value)) {  // Only allow digits
            setRating(value);
        }
    }

    const handleStartDateChange = (date) => {
        console.log(date);
        if (endDate && date >= endDate) {
            alert("Start date must be earlier than the end date.");
            return;
        }
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        if (startDate && date <= startDate) {
            alert("End date must be later than the start date.");
            return;
        }
        setEndDate(date);
    };

    const formatDate = (date) => (date ? dayjs(date).format('YYYY-MM-DD') : '');




    // const handleSwitchChange = (event) => {
    //     setIsFlightSearch(event.target.checked); // Switch between hotel and flight search
    // };

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
                            placeholder="Search For Hotels by Destination City"
                            // placeholder={isFlightSearch ? "Search For Hotels by Destination City" : "Search For Hotels by Destination City"}
                            // inputProps={{ 'aria-label': isFlightSearch ? 'search for hotels' : 'search for hotels' }}
                            inputProps= 'search for hotels'
                            onChange={handleSearchChange}
                        />

                        <DateSelector
                            startDate={startDate}
                            endDate={endDate}
                            onStartDateChange={handleStartDateChange}
                            onEndDateChange={handleEndDateChange}
                        />

                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                            <SearchIcon />
                        </IconButton>

                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={handleFilterClick}>
                            <MenuIcon />
                        </IconButton>
                        <HotelFilter id={id} anchorEl={filterMenu} open={open} onClose={handleFilterClose}
                                     minPrice={minPrice}
                                     maxPrice={maxPrice}
                                     guests={guests}
                                     rating={rating}
                                     handleMinPriceChange={handleMinPriceChange}
                                     handleMaxPriceChange={handleMaxPriceChange}
                                     handleGuestsChange={handleGuestsChange}
                                     handleRatingChange={handleRatingChange}
                        />

                        {/*    if the hotel filter is switched on then call hotel filter*/}
                        {/*{isFlightSearch ? (*/}
                        {/*    <FlightFilter id={id} anchorEl={filterMenu} open={open} onClose={handleFilterClose} filters={filters} onFilterChange={handleFilterChange} onPriceChange={handlePriceChange} />*/}

                        {/*) : (*/}
                        {/*    <HotelFilter id={id} anchorEl={filterMenu} open={open} onClose={handleFilterClose} filters={filters} onFilterChange={handleFilterChange} />*/}
                        {/*)}*/}

                    </Paper>
                    {/*<FormGroup>*/}
                    {/*    <Stack direction="row" spacing={1} sx={{alignItems:'center'}}>*/}
                    {/*        <Typography>Hotels</Typography>*/}
                    {/*        <FormControlLabel control={<Switch checked={isFlightSearch} onChange={handleSwitchChange} />} label="" />*/}
                    {/*        <Typography>Flights</Typography>*/}
                    {/*    </Stack>*/}
                    {/*</FormGroup>*/}

                    {searched === false ? (
                        <>
                            {/*<h2>Recommended Offers</h2>*/}
                        </>
                    ) : null}




                </Stack>

                {searched === false ? (
                    <>
                        {results.map((result, index) => (
                            <div key={index} className="result-item">
                                <Offer
                                    name={result.name}
                                    address={result.address}
                                    city={result.city}
                                    phone={result.phone}
                                    email={result.email}
                                    website={result.website}
                                    rating={result.rating}
                                    minTotal={result.minTotalPrice}
                                    maxTotal={result.maxTotalPrice}
                                />
                            </div>
                        ))}
                    </>
                ) : null}

                {searched === true ? (
                    <>
                        {results.map((result, index) => (
                            <div key={index} className="result-item">
                                <Offer
                                    date1={startDate ? startDate.toISOString().split('T')[0] : "N/A"}
                                    date2={endDate ? endDate.toISOString().split('T')[0] : "N/A"}
                                    id={result.id}
                                    name={result.name}
                                    address={result.address}
                                    city={result.city}
                                    phone={result.phone}
                                    email={result.email}
                                    website={result.website}
                                    rating={result.rating}
                                    minTotal={result.minTotalPrice}
                                    maxTotal={result.maxTotalPrice}
                                    search={true}
                                />
                            </div>
                        ))}
                    </>
                ) : null}

            </Box>
        </>
    );
}

export default Search;