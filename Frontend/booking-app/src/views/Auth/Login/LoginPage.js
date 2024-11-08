import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import './Login.css';


function LoginPage() {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box
            component="form"
            sx={{'& .MuiTextField-root': {m: 1, width: '25ch'}}}
            noValidate
            autoComplete="off"
            className="center-box"
        >
            <Stack direction="column" spacing={2}>
                <h1 className="heading">Welcome to the Dream Booking System &#9992;</h1>
                <Stack className="boxes-box" direction="column" spacing={3}>
                    <Stack direction="column" spacing={2}>
                        {/*<TextField*/}
                        {/*    id="outlined"*/}
                        {/*    label="Username"*/}
                        {/*/>*/}
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-username"
                                label="Username"
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <Button variant="contained">Login</Button>
                        <Button variant="outlined">Sign Up</Button>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

export default LoginPage;