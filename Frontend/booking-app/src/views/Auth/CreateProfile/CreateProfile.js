import React, { useState, useEffect } from 'react';
import { Stack, Typography, Box } from '@mui/material';

function CreateProfile() {

    return (
        <>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // Center content horizontally
                    justifyContent: 'flex-start', // Align items at the top
                    my: 5,  // Set top and bottom margin to 0
                    mx: 'auto', // Center the box horizontally
                    width: '100%', // Adjust width as needed
                    p: 0, // Set padding to 0 to reduce extra space
                }}
                noValidate
                autoComplete="off"
                className="center-box"
            >
                <Stack direction="column" spacing={0} sx={{alignItems: 'center'}}>
                    <h1>Create Profile &#9992;</h1>
                </Stack>
            </Box>
        </>
    );
}

export default CreateProfile;