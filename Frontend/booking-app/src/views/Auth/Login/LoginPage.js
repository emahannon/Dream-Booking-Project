import React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
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
import {FormHelperText} from "@mui/material";
import CreateProfile from "../CreateProfile/CreateProfile";


function LoginPage({booking}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [showSignUp, setShowSignUp] = React.useState(false);

    const navigate = useNavigate();

    const [errors, setErrors] = React.useState({});

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,63}\.[a-zA-Z]{2,6}$/;
        if (!email) return "Email is required";
        if (!emailRegex.test(email)) return "Invalid email format";
        return "";
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleLoginClick = async () => {
        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:8085/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);

                // Save email and password as authToken
                const authToken = btoa(`${email}:${password}`); // Encode email and password
                localStorage.setItem('authToken', authToken);

                // Save username to localStorage
                localStorage.setItem('username', `${data.name} ${data.surname}`);

                if (booking) {
                    alert('You have been logged in successfully!');
                } else {
                    navigate('/');
                    window.location.reload();
                }
            } else {
                console.error('Login failed:', response.statusText);
                alert('Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };


    const handleSignUpClick = () => {
        if (booking === true)
        {
            setShowSignUp(true);
        }
        else
        {
            navigate('/signup')
        }
    }

    return (
        <>
            {showSignUp ? (
                <>
                    <CreateProfile booking={true}></CreateProfile>
                    <Stack direction="column" spacing={2} sx={{ pt: 2 }}>
                        <Stack className="boxes-box" direction="column" spacing={3}>
                            <Stack direction="column" spacing={2}>
                                <Button variant="outlined" onClick={() => setShowSignUp(false)}>Back to Login</Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </>
            ) :(

                <Box
                    component="form"
                    sx={{'& .MuiTextField-root': {m: booking ? 0: 1, width: '25ch'}}}
                    noValidate
                    autoComplete="off"
                    className={booking ? "" : "center-box"}
                >
                    <Stack direction="column" spacing={2}>
                        <h1 className="heading" style={{ margin: 0 }}>Welcome to the Dream Booking System &#9992;</h1>
                        <Stack className="boxes-box" direction="column" spacing={3}>
                            <Stack direction="column" spacing={2}>
                                <FormControl variant="outlined" fullWidth error={!!errors.email}>
                                    <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email"
                                        label="Email"
                                        value={email}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setEmail(value);
                                            setErrors((prev) => ({
                                                ...prev,
                                                email: validateEmail(value),
                                            }));
                                        }}
                                        fullWidth
                                    />
                                    {errors.email && <FormHelperText>{errors.email}</FormHelperText>}

                                </FormControl>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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
                                <Button
                                    variant="contained"
                                    onClick={handleLoginClick}
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </Button>
                                <Button variant="outlined" onClick={handleSignUpClick}>Sign Up</Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>

            )}

        </>




    );
}

export default LoginPage;