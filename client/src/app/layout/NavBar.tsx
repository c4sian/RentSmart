import { Box, AppBar, Toolbar, Typography, Button, MenuItem } from "@mui/material";
import { Link, NavLink } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount";
import UserMenu from "./UserMenu";

export default function NavBar() {
    const { user } = useAccount();

    return (
        <AppBar position="static" elevation={0}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

                <MenuItem component={NavLink} to='/' disableRipple
                    sx={{ "&:hover": { bgcolor: "transparent" } }}>
                    <Typography variant="h6">RentSmart</Typography>
                </MenuItem>

                <Box display={"flex"} sx={{ gap: 'clamp(0.5rem, 2vw, 2rem)' }}>
                    <Typography>
                        Best Rated
                    </Typography>
                    <Typography >
                        About Us
                    </Typography>
                </Box>

                {user ? (
                    <UserMenu user={user} />
                ) : (
                    <Box display={"flex"} sx={{ gap: 'clamp(0.25rem, 0.75vw, 1rem)' }}>
                        <Button color="secondary" variant="contained" disableRipple
                            component={Link} to='login'
                            sx={{ borderRadius: 5, boxShadow: 2, textTransform: "none" }} disableElevation
                        >Sign In</Button>
                        <Button color="primary" variant="contained" disableRipple
                            component={Link} to='register'
                            sx={{ borderRadius: 5, boxShadow: 2, textTransform: "none" }} disableElevation
                        >Sign Up</Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    )
}