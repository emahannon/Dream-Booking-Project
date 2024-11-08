import React from 'react';
import {Stack, Box} from '@mui/material';
import Offer from '../../components/Offer/Offer'


function MyTrips() {

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
                    <h1>Current and Upcoming Trips &#9992;</h1>
                </Stack>
                <h2>Current</h2>
                <Offer buttonText="View"></Offer>
                <h2>Upcoming</h2>
                <Offer buttonText="Modify"></Offer>
                <Offer buttonText="Modify"></Offer>
                <Offer buttonText="Modify"></Offer>
            </Box>
        </>
    );
}

export default MyTrips;