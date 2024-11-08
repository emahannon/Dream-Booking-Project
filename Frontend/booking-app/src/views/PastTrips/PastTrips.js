import React from 'react';
import { Stack,  Box } from '@mui/material';
import Offer from '../../components/Offer/Offer'


function PastTrips() {
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
                    <h1>Past Trips &#9992;</h1>
                </Stack>
                <Offer buttonText="View"></Offer>
                <Offer buttonText="View"></Offer>
                <Offer buttonText="View"></Offer>
                <Offer buttonText="View"></Offer>
            </Box>
        </>
    );
}

export default PastTrips;