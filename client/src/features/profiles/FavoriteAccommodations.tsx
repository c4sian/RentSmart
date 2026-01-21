import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import NearMeRoundedIcon from '@mui/icons-material/NearMeRounded';

type Props = {
    favoriteAccommodations: AccommodationShortData[]
};

export default function FavoriteAccommodations({ favoriteAccommodations }: Props) {
    return (
        <Box display={"flex"} sx={{ alignItems: "center", backgroundColor: "white", gap: 2, p: 2 }}>
            {favoriteAccommodations.map((accommodation) => (
                <Box key={accommodation.id}>
                    <img src={accommodation.mainImageUrl} alt="Accommodation card image"
                        style={{ width: "100%", height: 175, objectFit: "cover", borderRadius: 10 }}
                    />

                    <Typography variant="h6" fontSize={16}>{accommodation.title}</Typography>

                    <Box display={"flex"} sx={{ justifyContent: "space-between" }}>
                        <Box display={"flex"} sx={{ alignItems: "center", gap: 0.5 }}>
                            <StarBorderRoundedIcon fontSize="small" />
                            <Typography variant="subtitle2">
                                {accommodation.averageRating} Rating
                            </Typography>
                        </Box>
                    </Box>

                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Box display={"flex"} sx={{ alignItems: "center", gap: 0.5 }}>
                            <NearMeRoundedIcon fontSize="small" />
                            <Typography variant="subtitle2">
                                {accommodation.city}, {accommodation.street}
                            </Typography>
                        </Box>

                        <Button variant="contained" color="secondary" size="small"
                            component={Link} to={`/accommodation-images/${accommodation.id}`}
                        >
                            View
                        </Button>
                    </Box>

                </Box>
            ))}</Box>
    )
}