import React, { useState, useEffect } from 'react';
import {
    Stack,
    Typography,
    Box,
    TextField
} from '@mui/material';

import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";

function Review() {
    // State variables
    const [rating, setRating] = useState(2); // Default rating is 2
    const [comment, setComment] = useState(""); // Default comment is an empty string
    const username = localStorage.getItem('username');
    const {hotelId} = useParams();
    const {userId} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Review DBS"; // Set the title for the search page
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (comment === "") {
            alert("Comment cannot be empty.");

            return;
        }

        if (comment.length <= 3) {
            alert("Comment must be more than three characters long.");
            return; // Stop further execution
        }

        // Construct the request body
        const reviewData = {
            username,
            rating,
            comment,
        };

        try {
            // Send the POST request to the backend
            const response = await fetch(`http://localhost:8086/api/hotel-detail/${hotelId}/${userId}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log("Review submitted successfully:", responseData);
                alert("Review submitted successfully!");
                navigate("/");
            } else {
                const error = await response.text();
                console.error("Failed to submit review:", error);
                alert("Failed to submit review. Please try again.");
            }
        } catch (err) {
            console.error("Error submitting review:", err);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <>
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
                    p: 0, // Set padding to 0 to reduce extra space
                }}
                noValidate
                autoComplete="off"
                className="center-box"
            >
                <Stack direction="column" spacing={0} sx={{ alignItems: 'center' }}>
                    <h1>Write a Review &#9992;</h1>
                    <div>
                        <div>
                            <Typography component="legend">Star Rating</Typography>
                            <Rating
                                name="simple-uncontrolled"
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue); // Update the rating state
                                }}
                            />
                        </div>

                        <div style={{ paddingTop: '1em', paddingBottom: '1em' }}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Comments"
                                multiline
                                rows={4}
                                style={{ width: '500px' }}
                                value={comment}
                                onChange={(event) => setComment(event.target.value)} // Update the comments state
                            />
                        </div>

                        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                    </div>
                </Stack>
            </Box>
        </>
    );
}

export default Review;
