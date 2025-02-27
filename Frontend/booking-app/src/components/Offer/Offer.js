import React from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import ChevronRightSharpIcon from '@mui/icons-material/ChevronRightSharp';

import PlaceholderImg from '../../assets/plane_placeholder.jpeg';
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack"

function Offer({ buttonText, date1, date2, id, name, address, city, phone, email, website, rating, minTotal, maxTotal, search, past}) {

    const navigate = useNavigate();

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
                <Paper elevation={6} sx={{padding: 5, borderRadius: 2}}>
                    <Grid container spacing={2}>
                        <Grid size={2}>
                            <Box
                                component="img"
                                src={PlaceholderImg}
                                alt="Example Image"
                                sx={{
                                    width: '100%',
                                    maxWidth: 300,
                                    borderRadius: 2,
                                    boxShadow: 0,
                                }}
                            />
                        </Grid>
                        <Grid size={5}>
                            <h3 style={{margin: 0}}>{name} </h3>
                            <h3 style={{margin: 0}}>({minTotal}€ - {maxTotal}€)</h3>
                            <h4 style={{margin: 0}}>{address}, {city}</h4>
                            <p style={{margin: 0}}>{email}</p>
                            <p style={{margin: 0}}>{phone}</p>
                            <p style={{margin: 0}}>{website}</p>
                            {/*<p style={{margin: 0}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do*/}
                            {/*    deserunt mollit anim id est laborum.</p>*/}
                        </Grid>
                        <Grid size={1}>
                        </Grid>
                        <Grid size={4} display="flex" justifyContent="flex-end" alignItems="flex-start" sx={{pr: 5}}>
                            <Stack direction="column" spacing={2} sx={{alignItems: 'center'}}>
                                <Button
                                    variant="contained"
                                    endIcon={<ChevronRightSharpIcon />}
                                    onClick={() => {
                                        navigate(`/booking/${id}/${date1}/${date2}`);
                                    }}
                                >
                                    {buttonText || 'Book'}
                                </Button>

                                <Rating name="size-large" value={rating} size="large" readOnly/>
                            </Stack>
                        </Grid>

                    </Grid>
                </Paper>
            </Box>
        </>
    );
}

export default Offer;