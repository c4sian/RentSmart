import { Box, Grid, Stack, Typography } from "@mui/material";
import { useAccount } from "../../../lib/hooks/useAccount";
import { useAccommodations } from "../../../lib/hooks/useAccommodations";
import AccommodationCard from "./AccommodationCard";

export default function AccommodationsView() {
    const { userData } = useAccount();
    const { accommodations } = useAccommodations();

    // if (userData === undefined) return <Typography>User Undefined</Typography>

    return (
        <Box sx={{ display: "flex", justifyContent: "center", minHeight: "calc(100vh - 4rem)" }}>
            <Grid container sx={{ width: 1110 }}>
                <Stack sx={{ width: 260, bgcolor: "white" }} >
                    <Typography>
                        asdasd
                    </Typography>
                </Stack>
                <Stack sx={{ width: 815, pl: 2, bgcolor: "white" }}>
                    <AccommodationCard />
                    <AccommodationCard />
                    <AccommodationCard />
                </Stack>
            </Grid>
        </Box>
    )
}