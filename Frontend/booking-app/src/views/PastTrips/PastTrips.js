import React, { useState, useEffect } from 'react';
import { Stack, Box, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import {useNavigate} from "react-router-dom";

function PastTrips() {
    const [pastTrips, setPastTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    useEffect(() => {
        async function fetchPastTrips() {
            try {

                const authToken = localStorage.getItem('authToken');

                const response = await fetch('http://localhost:8085/api/booking/view-past', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${authToken}`, // Add Basic Auth header
                    },
                });
                const data = await response.json();
                setPastTrips(data);
            } catch (error) {
                console.error('Error fetching past trips:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchPastTrips();
    }, []);

    return (
        <Box
            component="div"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                my: 10,
                mx: 'auto',
                width: '100%',
                p: 2,
            }}
        >
            <Stack direction="column" spacing={2} sx={{ alignItems: 'center', width: '100%' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Past Trips &#9992;
                </Typography>
                {loading ? (
                    <CircularProgress />
                ) : (
                    pastTrips.map((trip) => (
                        <Card key={trip.bookingId} sx={{ width: '100%', maxWidth: 600, mb: 2 }}>
                            <CardContent>
                                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                    {trip.hotelName}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {trip.cityName}, {trip.countryName}
                                </Typography>
                                <Typography variant="body2">Room: {trip.roomName}</Typography>
                                <Typography variant="body2">Facilities: {trip.facilities}</Typography>
                                <Typography variant="body2">Capacity: {trip.capacity}</Typography>
                                <Typography variant="body2">Type: {trip.roomType}</Typography>
                                <Typography variant="body2">
                                    Check-In: {trip.checkIn} | Check-Out: {trip.checkOut}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    Total Price: ${trip.totalPrice}
                                </Typography>
                                <Button variant="contained" sx={{ mt: 2 }}
                                        onClick={() => {
                                            navigate(`/review/${trip.hotelId}/${trip.userId}`);
                                        }}

                                >
                                    Review
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Stack>
        </Box>
    );
}

export default PastTrips;
