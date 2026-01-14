import { Box, Typography } from "@mui/material";
import { useAccommodations } from "../../../lib/hooks/useAccommodations";
import AccommodationCard from "./AccommodationCard";

export default function AccommodationsView() {
    const { accommodations } = useAccommodations();

    return (
        <Box sx={{
            maxWidth: 1200, mx: "auto",
            display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 4fr" },
            gap: 4, alignItems: "start", mt: 2
        }}>
            <Box sx={{
                position: "sticky", top: 12, alignSelf: "start",
                bgcolor: "white"
            }}>
                <Typography>
                    Filters go here
                </Typography>
            </Box>

            <Box sx={{ bgcolor: "white", px: 2 }}>
                {accommodations.map((acc) => (
                    <AccommodationCard accommodation={acc} />
                ))}
            </Box>

        </Box>
    )
}