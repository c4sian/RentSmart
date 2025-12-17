import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Search from "@mui/icons-material/Search";
import FilterListIcon from '@mui/icons-material/FilterList';
import { Link } from "react-router";

export default function HomePage() {

    return (
        <Box sx={{
            display: "flex", flexDirection: "column",
            justifyContent: "center", px: "2vw", minHeight: "calc(100vh - 4rem)"
        }}>
            <Box display={"flex"} flexDirection={"column"}
                justifyContent={"space-around"} alignItems={"center"}
                sx={{
                    height: "75vh",
                    backgroundImage: "url('home-photo3.jpg')",
                    backgroundSize: "cover", backgroundPosition: "50% 53%", backgroundRepeat: "no-repeat",
                    borderRadius: 5, boxShadow: 10
                }} >
                <Box maxWidth={"40%"}>
                    <Typography variant="h2" color="primary" fontWeight={"600"} fontSize={"4.5vw"} align="center">Find your favorite place here!</Typography>
                    <Typography color="primary" fontWeight={"400"} align="center">The best prices for over 2 million properties worldwide</Typography>
                </Box>
                <Stack sx={{ bgcolor: "primary.main", borderRadius: 5, p: 2, gap: 2 }}>
                    <Box display={"flex"} sx={{ gap: 2 }}>
                        <Box>
                            <Typography variant="subtitle2">Location</Typography>
                            <TextField
                                placeholder="Type the destination" size="small"
                                sx={{ "& .MuiOutlinedInput-notchedOutline": { borderRadius: 7 } }} />
                        </Box>
                        <Box>
                            <Typography variant="subtitle2">Check-in</Typography>
                            <TextField
                                placeholder="Add date" size="small"
                                sx={{ "& .MuiOutlinedInput-notchedOutline": { borderRadius: 7 } }} />
                        </Box>
                        <Box>
                            <Typography variant="subtitle2">Check-out</Typography>
                            <TextField
                                placeholder="Add date" size="small"
                                sx={{ "& .MuiOutlinedInput-notchedOutline": { borderRadius: 7 } }} />
                        </Box>
                        <Box>
                            <Typography variant="subtitle2">Guests</Typography>
                            <TextField
                                placeholder="Add guests" size="small"
                                sx={{ "& .MuiOutlinedInput-notchedOutline": { borderRadius: 7 } }} />
                        </Box>
                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Button variant="contained" color="secondary"
                            sx={{ borderRadius: 5, textTransform: "none" }}>
                            Filters
                            <FilterListIcon />
                        </Button>
                        <Button variant="contained" color="secondary" component={Link} to='accommodations'
                            sx={{ borderRadius: 5, textTransform: "none" }}
                        >
                            <Search />
                            Search Accommodation
                        </Button>
                    </Box>


                </Stack>
            </Box >
        </ Box >
    )
}