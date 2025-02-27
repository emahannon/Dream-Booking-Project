import React from 'react';
import {Stack, Box, FormHelperText} from '@mui/material';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

function CreateProfile({booking}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [surname, setSurname] = React.useState('');

    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();

    const [errors, setErrors] = React.useState({});

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,63}\.[a-zA-Z]{2,6}$/;
        if (!email) return "Email is required";
        if (!emailRegex.test(email)) return "Invalid email format";
        return "";
    };

    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z]{2,50}$/;
        if (!name) return "Name is required";
        if (!nameRegex.test(name)) return "Invalid name format";
        return "";
    };

    const handlePasswordChange = (event) => setPassword(event.target.value);


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleSignUpClick = async (userData) => {
        try {
            const response = await fetch('http://localhost:8085/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password, name, surname}),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                navigate('/'); // Navigate to the homepage
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
                alert('Error: ' + JSON.stringify(errorData));
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An unexpected error occurred.');
        }
    };

    return (
        <>
            <Box
                component="form"
                sx={{'& .MuiTextField-root': {m: 1, width: '25ch'}}}
                noValidate
                autoComplete="off"
                className={booking ? "" : "center-box"}
            >
                <Stack direction="column" spacing={2}>
                    <h1 className="heading">Create Profile &#9992;</h1>
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
                            <FormControl variant="outlined" fullWidth error={!!errors.name}>
                                <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-name"
                                    label="Name"
                                    value={name}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setName(value);
                                        setErrors((prev) => ({
                                            ...prev,
                                            name: validateName(value),
                                        }));
                                    }}
                                    fullWidth
                                />
                                {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
                            </FormControl>
                            <FormControl variant="outlined" fullWidth error={!!errors.surname}>
                                <InputLabel htmlFor="outlined-adornment-surname">Surname</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-surname"
                                    label="Surname"
                                    value={surname}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSurname(value);
                                        setErrors((prev) => ({
                                            ...prev,
                                            surname: validateName(value),
                                        }));
                                    }}
                                    fullWidth
                                />
                                {errors.surname && <FormHelperText>{errors.surname}</FormHelperText>}
                            </FormControl>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={handlePasswordChange}
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
                            <Button variant="contained" onClick={handleSignUpClick}>Complete & Begin Search</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </>
    );
}

export default CreateProfile;