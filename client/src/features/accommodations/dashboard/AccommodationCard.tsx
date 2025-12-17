import { Box, Button, Card, Stack, Typography } from "@mui/material";

export default function AccommodationCard() {
    return (
        <Card sx={{ borderRadius: 2, my: 2, p: 2 }}>
            <Box display={"flex"} position={"relative"}>
                <Box component={"img"} src="" alt="" sx={{ width: 240, height: 240 }} />
                <Box sx={{ ml: 2 }}>
                    <Stack>
                        <Typography variant="h6">
                            Accommodation title
                        </Typography>
                        <Typography variant="body2">
                            Accommodation description
                        </Typography>
                    </Stack>
                    <Stack position={"absolute"} sx={{ right: 0, top: 0 }}>
                        <Typography>
                            Nota 10
                        </Typography>
                        <Button variant="contained" sx={{ bgcolor: "secondary.main", color: "primary.main" }}>
                            View Prices
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Card>
    )
}