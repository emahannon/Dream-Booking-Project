import * as React from 'react';
import InputMask from 'react-input-mask';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import LoginPage from "../Auth/Login/LoginPage";
import {useParams} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from 'react-router-dom';

const steps = ['Login/Signup', 'Create Booking', 'Submit Payment', 'Complete Booking'];

export default function Book() {
    const {hotelId} = useParams();
    const {roomId} = useParams();
    const {date1} = useParams();
    const {date2} = useParams();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLoggedIn, setIsLoggedIn] = React.useState(true);
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [isMale, setIsMale] = React.useState(false); // gender
    const [dateOfBirth, setDateOfBirth] = React.useState('');
    const [roomType, setRoomType] = React.useState('');
    const [breakfastIncluded, setBreakfastIncluded] = React.useState(false);
    const [smoking, setSmoking] = React.useState(false);
    const [accessibility, setAccessibility] = React.useState(false);
    const [extraBed, setExtraBed] = React.useState(false);
    const [guests, setGuests] = React.useState(1);
    const [cardNum, setCardNum] = React.useState('');
    const [expiration, setExpiration] = React.useState('');
    const [cardName, setCardName] = React.useState('');
    const [cvv, setCvv] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [errors, setErrors] = React.useState({});
    const [formValid, setFormValid] = React.useState(false);

    React.useEffect(() => {
        if (isLoggedIn) {
            setActiveStep(1);
        }
    }, [isLoggedIn]);

    const validateFullName = (fullName) => {
        const regex = /^[A-Za-z]+$/;  // Matches only letters (latin alphabet)

        // Check if the name length is between 3 and 50
        if (fullName.length < 3 || fullName.length > 50) {
            return "Invalid Name";
        }

        // Check if the name contains only alphabetic characters
        if (!regex.test(fullName)) {
            return "Invalid Name";
        }

        return "";
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,63}\.[a-zA-Z]{2,6}$/;
        if (!email) return "Email is required";
        if (!emailRegex.test(email)) return "Invalid email";
        return "";
    };

    const validatePhone = (value) => {
        const cleanPhone = value.replace(/[^0-9+]/g, '');
        const internationalPhoneRegex = /^\+[1-9]\d{1,9}$/;
        return internationalPhoneRegex.test(cleanPhone)
            ? ''
            : 'Invalid phone';
    };


    const validateCardNum = (value) => {
        const cardRegex = /^[0-9]{16}$/;
        return cardRegex.test(value) ? '' : 'Invalid card number. Must be 16 digits.';
    };

    const validateExpiration = (value) => {
        const expirationRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Format MM/YY
        return expirationRegex.test(value) ? '' : 'Invalid expiration date. Use MM/YY format.';
    };

    const validateCardName = (value) => {
        return /^[a-zA-Z\s]+$/.test(value) ? '' : 'Cardholder name must contain only letters and spaces.';
    };

    const validateCvv = (value) => {
        const cvvRegex = /^[0-9]{3,4}$/;
        return cvvRegex.test(value) ? '' : 'Invalid CVV. Must be 3 or 4 digits.';
    };

    const validateAddress = (value) => {
        return value.trim() ? '' : 'Address is required.';
    };

    const validateCity = (value) => {
        return /^[a-zA-Z\s]+$/.test(value) ? '' : 'City must contain only letters and spaces.';
    };

    const validateZip = (value) => {
        const zipRegex = /^[0-9]{5}(-[0-9]{4})?$/;
        return zipRegex.test(value) ? '' : 'Invalid zip code. Use 5-digit or 9-digit format.';
    };

    const validateCountry = (value) => {
        return /^[a-zA-Z\s]+$/.test(value) ? '' : 'Country must contain only letters and spaces.';
    };

    // Function to restrict input to numbers only
    const restrictInputToNumbers = (event) => {
        const { key } = event;

        // Allow only numbers (0-9) and control keys (Backspace, Tab, Enter)
        if (!/^[0-9]$/.test(key) && key !== 'Backspace' && key !== 'Tab' && key !== 'Enter') {
            event.preventDefault();
        }
    };

    const handleGuestsChange = (event) => {
        const value = event.target.value;
        console.log('Guests:', guests, value);
        if (/^\d{0,1}$/.test(value)) {  // Only allow digits
            setGuests(value);
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = () => {
        // THIS ONLY RESETS THE FORM RIGHT NOW
        const newErrors = {
            name: validateFullName(name),
            email: validateEmail(email),
            phone: validatePhone(phone),
            cardNum: validateCardNum(cardNum),
            expiration: validateExpiration(expiration),
            cardName: validateCardName(cardName),
            cvv: validateCvv(cvv),
            address: validateAddress(address),
            city: validateCity(city),
            zip: validateZip(zip),
            country: validateCountry(country),
        };

        setErrors(newErrors);
        const isValid = Object.values(newErrors).every((error) => error === "");
        if (!isValid)
        {
            alert("Please fill the form completely and correctly before submitting.");
            return;
        }

        setActiveStep(0);
    };

    const handleAddBooking = async () => {
        const url = `http://localhost:8085/api/booking/${hotelId}/${roomId}/${date1}/${date2}`;


        const authToken = localStorage.getItem('authToken');


        const newErrors = {
            email: validateEmail(email),
            phone: validatePhone(phone),
            cardNum: validateCardNum(cardNum),
            expiration: validateExpiration(expiration),
            cardName: validateCardName(cardName),
            cvv: validateCvv(cvv),
            address: validateAddress(address),
            city: validateCity(city),
            zip: validateZip(zip),
            country: validateCountry(country),
        };

        setErrors(newErrors);
        const isValid = Object.values(newErrors).every((error) => error === "");
        if (!isValid)
        {
            alert("Please fill the form completely and correctly before submitting.");
            return;
        }


        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Basic ${authToken}`, // Add Basic Auth header

                },
                body: JSON.stringify({name, dateOfBirth, isMale, phone, email, guests, roomType, breakfastIncluded, smoking, accessibility, extraBed}),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Booking added:", result);
            navigate('/current');
        } catch (error) {
            console.error("Error adding booking:", error);
        }
    };

    return (
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
                p: 0,  // Set padding to 0 to reduce extra space
            }}
            noValidate
            autoComplete="off"
            className="center-box"
        >
        {/*<Box sx={{ width: '100%' }}>*/}
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0 || activeStep === 1}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleAddBooking}>Submit</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>

                    {activeStep === 0 && isLoggedIn === false && (
                        <>
                        <Box>
                            <LoginPage booking={true}></LoginPage>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />

                    <Button onClick={handleNext} disabled={isLoggedIn === false}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>
                </>
                    )
                    }
                    {
                        activeStep === 1 && (
                            <>
                            <Box style={{ width: '50em' }}>
                                <TextField
                                    required
                                    id="Name"
                                    label="Name"
                                    value={name}
                                    // onChange={e => setName(e.target.value)}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        setErrors((prev) => ({
                                            ...prev,
                                            name: validateFullName(e.target.value),
                                        }));
                                    }}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    sx={{ m: 2 }}
                                />


                                {/*/!*PHONE*!/*/}
                                <InputMask
                                    mask="+999-999-999-9999"
                                    id="Phone"
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                        setErrors((prev) => ({
                                            ...prev,
                                            phone: validatePhone(e.target.value),
                                        }));
                                    }}
                                >
                                    {(inputProps) => (
                                        <TextField
                                            {...inputProps}
                                            required
                                            id="Phone"
                                            label="Phone"
                                            error={!!errors.phone}
                                            helperText={errors.phone}
                                            sx={{ m: 2, width: .2}}
                                        />
                                    )}
                                </InputMask>

                                {/*/!*EMAIL*!/*/}
                                <TextField
                                    required
                                    id="Email"
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    sx={{ m: 2, width: .3}}
                                />

                                {/*Date of Birth*/}
                                <TextField
                                    required
                                    id="date-of-birth"
                                    label="Date of Birth"
                                    type="date"
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true, // Ensures the label doesn't overlap the input
                                    }}
                                    sx={{ m: 2, width: '100%' }} // Matches style of other fields
                                />
                                {/*Number of Guests*/}
                                <TextField
                                    required
                                    id="NumberGuests"
                                    label="Number of Guests"
                                    value={guests}
                                    onChange={handleGuestsChange}
                                    onKeyDown={restrictInputToNumbers}
                                    inputProps={{
                                        inputMode: 'numeric', // Allows only numeric input on mobile devices
                                        pattern: '[0-9]*',    // Ensures only numbers are allowed
                                    }}
                                    sx={{ m: 2 }} // Matches style of other fields
                                />
                                {/*Room Type*/}
                                <TextField
                                    select
                                    required
                                    id="RoomType"
                                    label="Room Type"
                                    value={roomType}
                                    onChange={(e) => setRoomType(e.target.value)}
                                    sx={{ m: 2, width: '50%' }} // Matches style of other fields
                                >
                                    <MenuItem value="single">Single</MenuItem>
                                    <MenuItem value="double">Double</MenuItem>
                                    <MenuItem value="suite">Suite</MenuItem>
                                </TextField>
                                <FormControl sx={{ m: 2 }}>
                                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="true"
                                        value={isMale}
                                        onChange={e => setIsMale(e.target.value === "true")}
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="true" control={<Radio />} label="Male" />
                                        <FormControlLabel value="false" control={<Radio />} label="Female" />
                                    </RadioGroup>
                                </FormControl>


                                <FormControl sx={{ m: 2 }}>
                                    <FormLabel id="demo-radio-buttons-group-label">Breakfast Included</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="false"
                                        value={breakfastIncluded}
                                        onChange={e => setBreakfastIncluded(e.target.value === "true")}
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="false" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>

                                <FormControl sx={{ m: 2 }}>
                                    <FormLabel id="demo-radio-buttons-group-label">Smoking Preference</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="false"
                                        value={smoking}
                                        onChange={e => setSmoking(e.target.value === "true")}
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="true" control={<Radio />} label="Smoking" />
                                        <FormControlLabel value="false" control={<Radio />} label="Non-smoking" />
                                    </RadioGroup>
                                </FormControl>

                                <FormControl sx={{ m: 2 }}>
                                    <FormLabel id="demo-radio-buttons-group-label">Accessibility Features Required</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="false"
                                        value={accessibility}
                                        onChange={e => setAccessibility(e.target.value === "true")}
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="false" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>



                                <FormControl sx={{ m: 2 }}>
                                    <FormLabel id="demo-radio-buttons-group-label">Extra Bed/Cot</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="false"
                                        value={extraBed}
                                        onChange={e => setExtraBed(e.target.value === "true")}
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="false" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>



                            </Box>
                </>
                        )
                    }

                    {
                        activeStep === 2 && (
                            <Box style={{ width: '50em' }}>
                                <TextField
                                    required
                                    id="CardNum"
                                    value={cardNum}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setCardNum(value);
                                        setErrors((prev) => ({
                                            ...prev,
                                            cardNum: validateCardNum(value),
                                        }));
                                    }}
                                    error={!!errors.cardNum}
                                    helperText={errors.cardNum}
                                    label="Credit Card Number"
                                    sx={{ m: 2 }}
                                />
                                <TextField
                                    required
                                    id="Expiration"
                                    value={expiration}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setExpiration(value);
                                        setErrors((prev) => ({
                                            ...prev,
                                            expiration: validateExpiration(value),
                                        }));
                                    }}
                                    error={!!errors.expiration}
                                    helperText={errors.expiration}
                                    label="Expiration (MM/YY)"
                                    sx={{ m: 2 }}
                                />
                                <TextField
                                    required
                                    id="CardName"
                                    value={cardName}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setCardName(value);
                                        setErrors((prev) => ({
                                            ...prev,
                                            cardName: validateCardName(value),
                                        }));
                                    }}
                                    error={!!errors.cardName}
                                    helperText={errors.cardName}
                                    label="Cardholder Name"
                                    sx={{ m: 2 }}
                                />
                                <TextField
                                    required
                                    id="CVV"
                                    value={cvv}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setCvv(value);
                                        setErrors((prev) => ({
                                            ...prev,
                                            cvv: validateCvv(value),
                                        }));
                                    }}
                                    error={!!errors.cvv}
                                    helperText={errors.cvv}
                                    label="Security Code (CVV)"
                                    sx={{ m: 2 }}
                                />
                                <TextField
                                    required
                                    id="Addy"
                                    value={address}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setAddress(value);
                                        setErrors((prev) => ({
                                            ...prev,
                                            address: validateAddress(value),
                                        }));
                                    }}
                                    error={!!errors.address}
                                    helperText={errors.address}
                                    label="Address"
                                    sx={{ m: 2 }}
                                />
                                <TextField
                                    required
                                    id="City"
                                    value={city}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setCity(value);
                                        setErrors((prev) => ({
                                            ...prev,
                                            city: validateCity(value),
                                        }));
                                    }}
                                    error={!!errors.city}
                                    helperText={errors.city}
                                    label="City"
                                    sx={{ m: 2 }}
                                />
                                <TextField
                                    required
                                    id="Zip"
                                    value={zip}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setZip(value);
                                        setErrors((prev) => ({
                                            ...prev,
                                            zip: validateZip(value),
                                        }));
                                    }}
                                    error={!!errors.zip}
                                    helperText={errors.zip}
                                    label="Zip Code"
                                    sx={{ m: 2 }}
                                />
                                <TextField
                                    required
                                    id="Country"
                                    value={country}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setCountry(value);
                                        setErrors((prev) => ({
                                            ...prev,
                                            country: validateCountry(value),
                                        }));
                                    }}
                                    error={!!errors.country}
                                    helperText={errors.country}
                                    label="Country"
                                    sx={{ m: 2 }}
                                />
                            </Box>

                        )
                    }

                    {
                        activeStep === 3 && (
                            <Box>
                                <Typography>Please verify information is correct.</Typography>
                                <Typography>If any options are incorrect please navigate back to edit.</Typography>
                                <p><b>Name: </b>{name}</p>
                                <p><b>Email: </b>{email}</p>
                                <p><b>Phone: </b>{phone}</p>
                                <p><b>Date of Birth: </b>{dateOfBirth}</p>
                                <p><b>Gender: </b>{isMale ? "Male" : "Female"}</p>
                                <p><b>Number of Guests: </b>{guests}</p>
                                <p><b>Room Type: </b>{roomType}</p>
                                <p><b>Hotel Stay Dates: </b> {date1} - {date2} </p>
                                <p><b>Breakfast Included:</b> {breakfastIncluded ? "Yes" : "No"}</p>
                                <p><b>Smoking Preference: </b>{smoking ? "Smoking" : "Non-smoking"}</p>
                                <p><b>Accessibility Features Required: </b>{accessibility ? "Yes" : "No"}</p>
                                <p><b>Extra Bed/Cot: </b>{extraBed ? "Yes" : "No"}</p>
                                <br/>
                                <p><b>Credit Card Number: </b>{cardNum}</p>
                                <p><b>Expiration: </b>{expiration}</p>
                                <p><b>Cardholder Name: </b>{cardName}</p>
                                <p><b>Security Code (CVV): </b>{cvv}</p>
                                <p><b>Address: </b>{address}</p>
                                <p><b>City: </b>{city}</p>
                                <p><b>Zip Code: </b>{zip}</p>
                                <p><b>Country: </b>{country}</p>

                            </Box>
                        )
                    }
                    {activeStep > 0 && activeStep < steps.length && (
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0 || activeStep === 1}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />

                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    )}

                </React.Fragment>
            )}
        </Box>
    );
}