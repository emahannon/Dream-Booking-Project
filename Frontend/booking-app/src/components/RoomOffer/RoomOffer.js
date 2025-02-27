import React from 'react';
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import ChevronRightSharpIcon from '@mui/icons-material/ChevronRightSharp';
import Stack from "@mui/material/Stack"
import {useNavigate} from "react-router-dom";

function RoomOffer({ buttonText, date1, date2, hotelId, roomId, name, facilities, price, capacity, type, booking, past}) {
    const navigate = useNavigate();


    return (
        <>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 3,
                    width: '100%',
                },
            }}>
                <Paper elevation={6} sx={{padding: 5, borderRadius: 2}}>
                    <Grid container spacing={2}>

                        <Grid size={7}>
                            <h3 style={{margin: 0}}>{name} {price} €</h3>
                            <h4 style={{margin: 0}}>{type}</h4>
                            <h5 style={{margin: 0}}>Capacity: {capacity}</h5>
                            <p style={{margin:0}}>{facilities}</p>
                        </Grid>
                        <Grid size={1}>
                        </Grid>
                        <Grid size={4} display="flex" justifyContent="flex-end" alignItems="flex-start" sx={{pr: 5}}>
                            <Stack direction="column" spacing={2} sx={{alignItems: 'center'}}>
                                <Button variant="contained"
                                        endIcon={<ChevronRightSharpIcon />}

                                        onClick={() => {
                                            if (booking) {
                                                navigate(`/book/${hotelId}/${roomId}/${date1}/${date2}`)
                                            } else {
                                                return;
                                            }
                                        }}
                                >
                                    {buttonText || 'Book'}
                                </Button>
                                {/*<Rating name="size-large" value={rating} size="large" readOnly/>*/}
                            </Stack>
                        </Grid>

                    </Grid>
                </Paper>
            </Box>
        </>
    );
}
export default RoomOffer;