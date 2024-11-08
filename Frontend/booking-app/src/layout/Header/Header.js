import {AppBar, Tab, Tabs, Drawer, List, ListItem, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import React, { useState } from "react";

function Header() {

    // State to manage the drawer's open/close state
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Function to toggle the drawer
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <AppBar position="static">
            <Tabs>
                <Tab style={{ color: 'white' }}
                    label=""
                    icon={<MenuIcon />}
                     onClick={toggleDrawer(true)}
                />
                {/* Drawer component */}
                <Drawer
                    anchor="left" // You can change the anchor to "left", "top", or "bottom" as well
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                >
                    <div
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        {/* Content of the drawer */}
                        <List>
                            <ListItem button component={Link} to="/current">
                                <ListItemText primary="Current & Upcoming Trips" />
                            </ListItem>
                            <ListItem button component={Link} to="/past">
                                <ListItemText primary="Past Trips" />
                            </ListItem>
                            <ListItem button component={Link} to="/saved">
                                <ListItemText primary="Saved Bookings" />
                            </ListItem>
                            <ListItem button component={Link} to="/">
                                <ListItemText primary="Login/Logout" />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>


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
            </Tabs>
        </AppBar>
    );
}
export default Header;