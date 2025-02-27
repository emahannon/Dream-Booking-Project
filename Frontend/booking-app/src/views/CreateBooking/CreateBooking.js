import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import PlaceholderImg from "../../assets/plane_placeholder.jpeg"; // Placeholder image
import RoomOffer from "../../components/RoomOffer/RoomOffer";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import SavedReview from "../../components/SavedReview/SavedReview"; // Import RoomOffer component

function CreateBooking() {
    const { id } = useParams(); // Get the hotel ID from URL params
    const {date1} = useParams();
    const {date2} = useParams();
    const [hotelData, setHotelData] = useState(null); // Store the hotel data
    const [reviews, setReviews] = useState([]); // Store the reviews
    const [loading, setLoading] = useState(true); // Loading state
    const [reviewsLoading, setReviewsLoading] = useState(true); // Reviews loading state

    useEffect(() => {
        document.title = "Hotel Page"; // Set the title for the hotel page

        // Fetch the hotel details by ID
        fetch(`http://localhost:8085/api/main/hotel_info/${id}`)
            .then(response => response.json())
            .then(data => {
                setHotelData(data); // Store the fetched data in state
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(error => {
                console.error('Error fetching hotel data:', error);
                setLoading(false); // Set loading to false even in case of error
            });

        // Fetch reviews for the hotel
        fetch(`http://localhost:8086/api/hotel-detail/${id}`)
            .then(response => response.json())
            .then(data => {
                setReviews(data.reviews); // Store reviews in state
                setReviewsLoading(false); // Set reviews loading to false
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                setReviewsLoading(false); // Handle error for reviews
            });
    }, [id]);

    if (loading) {
        return <div>Loading hotel details...</div>; // Show loading while hotel data is being fetched
    }

    if (!hotelData) {
        return <div>Error loading hotel details</div>; // Show error if no hotel data is fetched
    }

    // Extract the hotel data from the state
    const { name, address, city, phone, email, website, rating, roomDtoList, photos } = hotelData;

    // Method to render reviews
    const renderReviews = () => {
        if (reviewsLoading) {
            return <p>Loading reviews...</p>;
        }

        if (!reviews || reviews.length === 0) {
            return <p>No reviews available for this hotel.</p>;
        }

        return reviews.map((review, index) => (

        <>
            <SavedReview name={review.username}
                    rating={rating}
                    comment={review.comment}
            ></SavedReview>
            {/*<Box sx={{*/}
            {/*    display: 'flex',*/}
            {/*    flexWrap: 'wrap',*/}
            {/*    '& > :not(style)': {*/}
            {/*        m: 3,*/}
            {/*        width: '100%',*/}
            {/*        // height: 128,*/}
            {/*    },*/}
            {/*}}>*/}
            {/*    <Paper elevation={6} sx={{padding: 4, borderRadius: 2}}>*/}
            {/*        <Grid container spacing={2}>*/}
            {/*            <Grid size={10}>*/}
            {/*                <h3 style={{ margin: 0 }}>{review.username}</h3>*/}
            {/*                /!*<h4 style={{ margin: 0 }}>Created at: {"date"}</h4>*!/*/}
            {/*                <Rating name="size-large" value={rating} size="large" readOnly/>*/}
            {/*                <p style={{ margin: 0 }}>{review.comment}</p>*/}
            {/*            </Grid>*/}
            {/*            <Grid size={1}>*/}
            {/*            </Grid>*/}

            {/*        </Grid>*/}
            {/*    </Paper>*/}
            {/*</Box>*/}
        </>
        ));
    };

    // Method to get the photo URL
    // Method to extract the photo URL from the photos array
    const getReviewPhotoUrl = () => {
        if (reviews.photos && reviews.photos[0]) {
            // Parse the stringified JSON object
            const photoData = JSON.parse(reviews.photos[0]);
            // Return the photo URL if it exists, otherwise return a placeholder
            return photoData.photoUrl || PlaceholderImg;
        }
        // Return the placeholder image if no photo is available
        return PlaceholderImg;
    };

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            pl: 40,
            pr: 40,
            pt: 15,
            '& > :not(style)': {
                m: 3,
                width: '100%',
                pl: 0,
                pr: 0,
                pt: 0,
            },
        }}>
            <Paper elevation={6} sx={{ padding: 5, borderRadius: 2, boxShadow: 3 }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Hotel Information</h2>
                <Grid container spacing={4}>
                    {/* Hotel Image */}
                    <Grid item xs={12} md={4} sx={{ marginLeft: 3, paddingRight: 10 }}>
                        <Box
                            component="img"
                            src={getReviewPhotoUrl()} // Dynamically set photo URL here
                            alt="Hotel Image"
                            sx={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: 2,
                                boxShadow: 3,
                            }}
                        />
                    </Grid>

                    {/* Hotel Details */}
                    <Grid item xs={12} md={5}>
                        <Stack spacing={2}>
                            <h3 style={{ margin: 0 }}>{name}</h3>
                            <h4 style={{ margin: 0 }}>{address}, {city.city}</h4>
                            <p style={{ margin: 0 }}><strong>Email:</strong> {email}</p>
                            <p style={{ margin: 0 }}><strong>Phone:</strong> {phone}</p>
                            <p style={{ margin: 0 }}><strong>Website:</strong> <a href={website} target="_blank" rel="noopener noreferrer">{website}</a></p>
                        </Stack>
                    </Grid>

                    {/* Rating Section */}
                    <Grid item xs={12} md={3} sx={{ display: 'left', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 2 }}>
                        <Stack direction="column" spacing={2} sx={{ alignItems: 'center' }}>
                            <Rating name="size-large" value={rating} size="large" readOnly />
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>

            <h2>Room Offers</h2>
            <div>
                {roomDtoList && roomDtoList.map((room) => (
                    <div key={room.id}>
                        <RoomOffer
                            date1={date1}
                            date2={date2}
                            hotelId={id}
                            roomId={String(room.id)}
                            name={room.name}
                            facilities={room.facilities}
                            price={room.total_price}
                            capacity={room.capacity}
                            booking={true}
                        ></RoomOffer>
                    </div>
                ))}
            </div>

            <h2>Reviews</h2>
            <Paper elevation={6} sx={{ padding: 5, borderRadius: 2, boxShadow: 3 }}>
                {renderReviews()}
            </Paper>
        </Box>
    );
}

export default CreateBooking;
