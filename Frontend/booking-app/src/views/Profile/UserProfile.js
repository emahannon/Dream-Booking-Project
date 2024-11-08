import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import './UserProfile.css'

function UserProfile() {
    useEffect(() => {
        document.title = "Profile DBS"; // Set the title for the search page
    }, []);

    return (
        <Box
            className="center"
        >
            <Stack className="main">
                <h1 className="heading">User, welcome to Dream Booking System.</h1>
                {/*    Username, edit password, name, email, phone*/}

                <Stack className="content">
                    <p><b>Username:</b> user   <Button variant="outlined" size="small">Edit</Button></p>
                    <p><b>Password:</b>  <Button variant="outlined" size="small">Edit</Button></p>
                    <p><b>Email:</b> user@email.com   <Button variant="outlined" size="small">Edit</Button></p>
                    <p><b>Phone:</b> +420 777 7777 7777   <Button variant="outlined" size="small">Edit</Button></p>
                    <p><b>Email notifications:</b> Opted-in  <Button variant="outlined" size="small">Edit</Button></p>
                </Stack>

            </Stack>
        </Box>
    )
}

export default UserProfile;