import { Box, AppBar, Toolbar, Typography, Button, MenuItem } from "@mui/material";

export default function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={0}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        <MenuItem>
                            <Typography variant="h6">RentSmart</Typography>
                        </MenuItem>
                    </Box>
                    <Box display={"flex"} sx={{ gap: 'clamp(0.5rem, 2vw, 2rem)' }}>
                        <Typography >
                            Make Reservations
                        </Typography>
                        <Typography >
                            About Us
                        </Typography>
                        <Typography >
                            Activity
                        </Typography>
                        <Typography >
                            Coupons and Promos
                        </Typography>
                    </Box>
                    <Box display={"flex"} sx={{ gap: 'clamp(0.25rem, 0.75vw, 1rem)' }}>
                        <Button color="secondary" variant="contained"
                            sx={{ borderRadius: 5, boxShadow: 2, textTransform: "none" }} disableElevation
                        >Sign In</Button>
                        <Button color="primary" variant="contained"
                            sx={{ borderRadius: 5, boxShadow: 2, textTransform: "none" }} disableElevation
                        >Sign Up</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}