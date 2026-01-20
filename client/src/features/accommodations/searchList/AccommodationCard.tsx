import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { Link } from "react-router";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import NearMeRoundedIcon from '@mui/icons-material/NearMeRounded';
import NightShelterRoundedIcon from '@mui/icons-material/NightShelterRounded';

type Props = {
    accommodation: AccommodationShortData
};

export default function AccommodationCard({ accommodation }: Props) {
    return (
        <Card sx={{ display: "flex", position: "relative", borderRadius: 2, my: 2, p: 2 }}>
            <img src={accommodation.mainImageUrl} alt="Accommodation card image"
                style={{ width: 240, height: 240, objectFit: "cover", borderRadius: 10 }}
            />

            <Stack sx={{ width: "100%", justifyContent: "space-between", ml: 2 }}>

                <Box>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography variant="h6">
                            {accommodation.title}
                        </Typography>

                        <Box display={"flex"} sx={{ alignItems: "center", color: "grey.800", gap: 0.5, }}>
                            <StarBorderRoundedIcon fontSize="medium" />
                            <Typography variant="body1">
                                {accommodation.averageRating.toFixed(1)} Rating
                            </Typography>
                        </Box>
                    </Box>

                    <Box display={"flex"} sx={{ alignItems: "center", color: "grey.800", gap: 0.5, mt: 1 }}>
                        <NearMeRoundedIcon fontSize="small" />
                        <Typography variant="body2">
                            {accommodation.city}, {accommodation.street}
                        </Typography>
                    </Box>

                    <Box display={"flex"} sx={{ alignItems: "center", color: "grey.800", gap: 0.5, mt: 2 }}>
                        <NightShelterRoundedIcon fontSize="small" />
                        <Typography variant="body2" textTransform={"capitalize"}>
                            {accommodation.type}
                        </Typography>
                    </Box>
                </Box>

                <Box display={"flex"} justifyContent={"space-between"}>
                    <Box>
                        <Box display={"flex"} sx={{ alignItems: "center", gap: 0.5 }}>
                            <Typography variant="h3" fontSize={26}>
                                ${accommodation.pricePerNight}
                            </Typography>
                            <Typography variant="body1" fontSize={16} color="grey.800">
                                / Night
                            </Typography>
                        </Box>

                        <Typography fontSize={14} color="grey.800">Including taxes and fees</Typography>
                    </Box>

                    <Box alignSelf={"end"}>
                        <Button component={Link} to={`/accommodations/${accommodation.id}`}
                            variant="contained" color="secondary" sx={{ borderRadius: 5 }}
                        >
                            View Rooms
                        </Button>
                    </Box>
                </Box>
            </Stack>

        </Card>
    )
}