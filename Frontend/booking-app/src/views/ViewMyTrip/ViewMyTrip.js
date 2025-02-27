import React, { useEffect } from 'react';
import {
    Box
} from '@mui/material';


import Grid from "@mui/material/Grid2";
import PlaceholderImg from "../../assets/plane_placeholder.jpeg";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";



function ViewMyTrip({ name, address, city, phone, email, website, rating, minTotal, maxTotal, past}) {
    useEffect(() => {
        document.title = "Book DBS"; // Set the title for the search page
    }, []);

    const [price, setPrice] = React.useState(0);
    const [type, setType] = React.useState("");
    const [capacity, setCapacity] = React.useState(0);
    const [facilities, setFacilities] = React.useState("");




    return (
        <>
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
                    // height: 128,
                },
            }}>
                {/*<Paper elevation={6} sx={{padding: 5, borderRadius: 2}}>*/}
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
                    <Grid size={10}>
                        <h3 style={{margin: 0}}>{name} ({minTotal}-{maxTotal})</h3>
                        <h4 style={{margin: 0}}>{address}, {city}</h4>
                        <h5 style={{margin: 0}}>{email}</h5>
                        <h5 style={{margin: 0}}>{phone}</h5>
                        <h5 style={{margin: 0}}>{website}</h5>
                    </Grid>

                    {/*<Grid size={4} display="flex" justifyContent="flex-end" alignItems="flex-start" sx={{pr: 5}}>*/}
                    {/*    <Stack direction="column" spacing={2} sx={{alignItems: 'center'}}>*/}
                    {/*        /!*<Button variant="contained" endIcon={<ChevronRightSharpIcon/>}>*!/*/}
                    {/*        /!*    {buttonText || 'Book'}*!/*/}
                    {/*        /!*</Button>*!/*/}
                    {/*        /!*<Rating name="size-large" defaultValue={0} size="large"/>*!/*/}
                    {/*    </Stack>*/}
                    {/*</Grid>*/}

                </Grid>
                <Paper elevation={6} sx={{padding: 5, borderRadius: 2}}>
                    <Grid container spacing={2}>
                        {/*<Grid size={2}>*/}
                        {/*    <Box*/}
                        {/*        component="img"*/}
                        {/*        src={PlaceholderImg}*/}
                        {/*        alt="Example Image"*/}
                        {/*        sx={{*/}
                        {/*            width: '100%',*/}
                        {/*            maxWidth: 300,*/}
                        {/*            borderRadius: 2,*/}
                        {/*            boxShadow: 0,*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                        <Grid size={7}>
                            <h3 style={{margin: 0}}>{name} {price} €</h3>
                            <h4 style={{margin: 0}}>{type}</h4>
                            <h5 style={{margin: 0}}>Capacity: {capacity}</h5>
                            <p style={{margin:0}}>{facilities}</p>
                            {/*<p style={{margin: 0}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do*/}
                            {/*    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,*/}
                            {/*    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis*/}
                            {/*    aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla*/}
                            {/*    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia*/}
                            {/*    deserunt mollit anim id est laborum.</p>*/}
                        </Grid>
                        <Grid size={1}>
                        </Grid>
                        {/*<Grid size={4} display="flex" justifyContent="flex-end" alignItems="flex-start" sx={{pr: 5}}>*/}
                        {/*    <Stack direction="column" spacing={2} sx={{alignItems: 'center'}}>*/}
                        {/*        */}
                        {/*        /!*<Rating name="size-large" value={rating} size="large" readOnly/>*!/*/}
                        {/*    </Stack>*/}
                        {/*</Grid>*/}

                    </Grid>
                </Paper>

            </Box>
        </>

    );
}

export default ViewMyTrip;