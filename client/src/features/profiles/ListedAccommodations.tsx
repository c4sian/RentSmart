import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';

type Props = {
    listedAccommodations: AccommodationShortData[]
};

export default function ListedAccommodations({ listedAccommodations }: Props) {
    return (
        <Box display={"flex"} sx={{ alignItems: "center", backgroundColor: "white", gap: 2, p: 2 }}>
            {listedAccommodations.map((accommodation) => (
                <Box key={accommodation.id}>
                    <img src={accommodation.mainImageUrl} alt="Accommodation card image"
                        style={{ width: "100%", height: 175, objectFit: "cover", borderRadius: 10 }}
                    />

                    <Box display={"flex"} sx={{ justifyContent: "space-between" }}>
                        <Typography variant="h6" fontSize={16}>{accommodation.title}</Typography>

                        <Box display={"flex"} sx={{ alignItems: "center", gap: 0.5 }}>
                            <StarBorderRoundedIcon fontSize="small" />
                            <Typography >
                                {accommodation.averageRating} Rating
                            </Typography>
                        </Box>
                    </Box>

                    <Box display={"flex"} sx={{ justifyContent: "space-between", mt: 1 }}>
                        <Button variant="contained" size="small"
                            component={Link} to={`/accommodation-images/${accommodation.id}`}
                        >
                            Edit images
                        </Button>
                        <Button variant="contained" size="small"
                            component={Link} to={`/accommodation-images/${accommodation.id}`}
                        >
                            Edit details
                        </Button>
                        <Button variant="contained" size="small" color="secondary"
                            component={Link} to={`/accommodations/${accommodation.id}`}
                        >
                            View
                        </Button>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}