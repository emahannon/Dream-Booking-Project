import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import './UserProfile.css';

function UserProfile() {
    useEffect(() => {
        document.title = "Profile DBS"; // Set the title for the search page
    }, []);

    const [editing, setEditing] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [userId, setUserId] = useState(null);  // To store the user ID
    const [errors, setErrors] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
    });

    // Fetch user data from the server
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');

                const response = await fetch('http://localhost:8085/api/user/getInfo', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${authToken}`, // Add Basic Auth header
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                // Store the user data including the user ID in state
                setUserId(data.id);  // Store user ID from the response
                setName(data.name || '');
                setSurname(data.surname || '');
                setEmail(data.email || '');
                setPhone(data.phone || '');
                setBirthday(data.birthday ? dayjs(data.birthday) : null);

            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleSave = () => {
        const nameError = validateName(name);
        const surnameError = validateName(surname);
        const emailError = validateEmail(email);
        const phoneError = validatePhone(phone);

        if (nameError || surnameError || emailError || phoneError) {
            setErrors({ name: nameError, surname: surnameError, email: emailError, phone: phoneError });
        } else {
            setEditing(false);
            handleSaveToServer(); // Save to server
        }
    };

    // Save user data to the server
    const handleSaveToServer = async () => {
        try {
            console.log("Sending request to save data");
            const authToken = localStorage.getItem('authToken');

            const response = await fetch('http://localhost:8085/api/user/update', { // Replace with your API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${authToken}`,
                },
                body: JSON.stringify({
                    id: userId,  // Add user ID to the request body
                    name,
                    surname,
                    email,
                    phone,
                    birthday: birthday ? birthday.toISOString() : null,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save data");
            }

            const result = await response.json();
            console.log("Data saved successfully:", result);
        } catch (error) {
            console.error("Failed to save user data:", error);
        }
    };

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

    const validatePhone = (value) => {
        if (!value) return '';
        const cleanPhone = value.replace(/[^0-9+]/g, '');
        const internationalPhoneRegex = /^\+[1-9]\d{1,14}$/;
        return internationalPhoneRegex.test(cleanPhone)
            ? ''
            : 'Invalid phone number. Must be in international format (e.g., +1234567890)';
    };

    return (
        <Box className="center">
            <Stack className="main">
                <h1 className="heading">{name} Profile                   </h1>

                {editing ? (
                    <Stack className="content">
                        <TextField
                            label="Name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            size="small"
                            margin="normal"
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        <TextField
                            label="Surname"
                            name="surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            size="small"
                            margin="normal"
                            error={!!errors.surname}
                            helperText={errors.surname}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            size="small"
                            margin="normal"
                            error={!!errors.email}
                            helperText={errors.email}
                            disabled
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            size="small"
                            margin="normal"
                            error={!!errors.phone}
                            helperText={errors.phone}
                        />
                        <DatePicker
                            label="Birthday"
                            value={birthday}
                            onChange={setBirthday}
                            maxDate={dayjs()}
                            renderInput={(params) => <TextField {...params} size="small" margin="normal" />}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: '1em' }}>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{ width: '10em' }}
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                        </Box>
                    </Stack>
                ) : (
                    <Stack className="content">
                        <p><b>Name:</b> {name} </p>
                        <p><b>Surname:</b> {surname} </p>
                        <p><b>Email:</b> {email} </p>
                        <p><b>Phone:</b> {phone} </p>
                        <p><b>Birthday:</b> {birthday ? birthday.toISOString().split('T')[0] : ''} </p>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button
                                variant="outlined"
                                size="small"
                                sx={{ width: '10em' }}
                                onClick={() => setEditing(true)}
                            >
                                Edit
                            </Button>
                        </Box>
                    </Stack>
                )}
            </Stack>
        </Box>
    )
}

export default UserProfile;
