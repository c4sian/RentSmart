import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

type Props = {
    accommodation: AccommodationShortData
};

export default function AccommodationCard({ accommodation }: Props) {
    const navigate = useNavigate();

    return (
        <Card sx={{ borderRadius: 2, my: 2, p: 2 }}>
            <Box display={"flex"} position={"relative"}>
                <Box component={"img"} src={accommodation.mainImageUrl} alt="" sx={{ width: 240, height: 240, objectFit: "cover", borderRadius: 1 }} />
                <Box sx={{ ml: 2 }}>
                    <Stack>
                        <Typography variant="h6">
                            {accommodation.title}
                        </Typography>
                    </Stack>
                    <Stack position={"absolute"} sx={{ right: 0, top: 0 }}>
                        <Typography>
                            Nota 10
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => { navigate(`/accommodations/${accommodation.id}`) }}
                            sx={{ bgcolor: "secondary.main", color: "primary.main" }}>
                            View Prices
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Card>
    )
}