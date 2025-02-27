import React from 'react';
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2';

import Rating from "@mui/material/Rating";

function SavedReview({name, comment, rating}) {
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 3,
                    width: '100%',
                    // height: 128,
                },
            }}>
                <Paper elevation={6} sx={{padding: 4, borderRadius: 2}}>
                    <Grid container spacing={2}>
                        <Grid size={10}>
                            <h3 style={{ margin: 0 }}>{name}</h3>
                            <Rating name="size-large" value={rating} size="large" readOnly/>
                            <p style={{ margin: 0 }}>{comment}</p>
                        </Grid>
                        <Grid size={1}>
                        </Grid>

                    </Grid>
                </Paper>
            </Box>
        </>
    );
}

export default SavedReview;