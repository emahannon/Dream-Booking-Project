import React, { useState, useEffect } from 'react';
import { Stack, Box, Typography, CircularProgress, Button } from '@mui/material';

function MyTrips() {
    const [currentTrips, setCurrentTrips] = useState([]);
    const [upcomingTrips, setUpcomingTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTrips() {
            try {
                const authToken = localStorage.getItem('authToken');

                // Fetch current trips
                const currentTripsResponse = await fetch('http://localhost:8085/api/booking/view-current', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${authToken}`, // Add Basic Auth header
                    },
                });

                const currentData = await currentTripsResponse.json();
                // Ensure the response is an array
                if (Array.isArray(currentData)) {
                    setCurrentTrips(currentData);
                } else {
                    console.error("Expected an array of current trips, but got:", currentData);
                }

                // Fetch upcoming trips
                const upcomingTripsResponse = await fetch('http://localhost:8085/api/booking/view-upcoming', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${authToken}`, // Add Basic Auth header
                    },
                });
                const upcomingData = await upcomingTripsResponse.json();
                // Ensure the response is an array
                if (Array.isArray(upcomingData)) {
                    setUpcomingTrips(upcomingData);
                } else {
                    console.error("Expected an array of upcoming trips, but got:", upcomingData);
                }
            } catch (error) {
                console.error('Error fetching trips:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchTrips();
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
                    Current and Upcoming Trips &#9992;
                </Typography>

                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {/* Current Trips Section */}
                        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                            Current Trips
                        </Typography>
                        {Array.isArray(currentTrips) && currentTrips.length === 0 ? (
                            <Typography variant="h6" color="textSecondary">
                                You don't have any current trips.
                            </Typography>
                        ) : (
                            currentTrips.map(trip => (
                                <Box key={trip.bookingId} sx={{ mb: 2, p: 2, border: '1px solid #ccc', width: '100%', maxWidth: 600 }}>
                                    <Typography variant="h6">{trip.hotelName}</Typography>
                                    <Typography variant="body2">{trip.cityName}, {trip.countryName}</Typography>
                                    <Typography variant="body2">{trip.roomName}</Typography>
                                    <Button variant="contained">View</Button>
                                </Box>
                            ))
                        )}

                        {/* Upcoming Trips Section */}
                        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                            Upcoming Trips
                        </Typography>
                        {Array.isArray(upcomingTrips) && upcomingTrips.length === 0 ? (
                            <Typography variant="h6" color="textSecondary">
                                You don't have any upcoming trips. Let’s book one!
                            </Typography>
                        ) : (
                            upcomingTrips.map(trip => (
                                <Box key={trip.bookingId} sx={{ mb: 2, p: 2, border: '1px solid #ccc', width: '100%', maxWidth: 600 }}>
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
                                </Box>

                            ))
                        )}
                    </>
                )}
            </Stack>
        </Box>
    );
}

export default MyTrips;
