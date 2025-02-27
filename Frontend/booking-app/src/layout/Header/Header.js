import { AppBar, Tab, Tabs, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import React, { useEffect, useState } from 'react';

function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    // Function to toggle the drawer
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    // Handle user logout using basic authentication
    const handleLogout = async () => {
        const authToken = localStorage.getItem('authToken');// Assuming token is stored in localStorage

        if (!authToken) {
            console.error("No token found");
            return;
        }

        try {
            const response = await fetch('http://localhost:8085/api/auth/logout', {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${authToken}`,
                }
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            // Clear localStorage data
            localStorage.removeItem('username');
            localStorage.removeItem('authToken');
            setUsername(null);

            // Redirect to login page
            navigate('/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    useEffect(() => {
        // Get username from localStorage
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <AppBar position="static">
            <Tabs>
                <Tab style={{ color: 'white' }}
                     label=""
                     icon={<MenuIcon />}
                     onClick={toggleDrawer(true)}
                />

                {/* Conditionally render the Drawer */}
                {username && (
                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                    >
                        <div
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <List>
                                <ListItem button component={Link} to="/current">
                                    <ListItemText primary="Current & Upcoming Trips" />
                                </ListItem>
                                <ListItem button component={Link} to="/past">
                                    <ListItemText primary="Past Trips" />
                                </ListItem>
                                {/*<ListItem button component={Link} to="/saved">*/}
                                {/*    <ListItemText primary="Saved Bookings" />*/}
                                {/*</ListItem>*/}
                                <ListItem button onClick={handleLogout}>
                                    <ListItemText primary="Logout" />
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                )}

                <Tab style={{ color: 'white' }}
                     component={Link}
                     to="/"
                     label=""
                     icon={<SearchIcon />}
                />

                <Tab style={{ color: 'white' }}
                     component={Link}
                     to="/profile"
                     label=""
                     icon={<AccountCircleRoundedIcon />}
                />

                {/* Display a welcome message if username is present */}
                {username ? <p>Welcome, {username}!</p> : <p>Please log in</p>}
            </Tabs>
        </AppBar>
    );
}

export default Header;
