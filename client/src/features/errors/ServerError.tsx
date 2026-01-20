import { Box, Button, Divider, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";

export default function ServerError() {
    const { state } = useLocation();

    return (
        <Box
            sx={{
                backgroundColor: "white",
            }}
        >
            {state.error ? (
                <Box>
                    <Typography gutterBottom variant="h3" color="secondary" sx={{ px: 4, pt: 2 }}>
                        {state.error?.message || "There has been an error."}
                    </Typography>
                    <Divider />
                    <Typography variant="body1" sx={{ p: 4 }}>
                        {state.error?.details || "Internal server error."}
                    </Typography>
                </Box>
            ) : (
                <Typography variant="h5">Server error</Typography>
            )}

            <Button fullWidth component={Link} to='/' color="secondary" variant="contained">
                Return to home page.
            </Button>
        </Box>
    )
}