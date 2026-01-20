import { SearchOff } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router";

export default function NotFound() {
    return (
        <Stack
            sx={{
                height: 400,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                p: 6,
            }}
        >
            <SearchOff sx={{ fontSize: 100 }} color="secondary" />
            <Typography gutterBottom variant="h3">
                Oops - we could not find what you are looking for.
            </Typography>
            <Button fullWidth component={Link} to='/' color="secondary" variant="contained">
                Return to home page.
            </Button>
        </Stack>
    )
}