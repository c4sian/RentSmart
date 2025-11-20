import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Search from "@mui/icons-material/Search";

export default function HomePage() {
    const [value, setValue] = useState("");

    return (
        <Paper sx={{ mt: "5vh", px: "2vw", pt: "4vh" }}>
            <Box display={"flex"} flexDirection={"column"} justifyContent={"space-around"} alignItems={"center"} sx={{
                minWidth: "95vw", height: "75vh",
                backgroundImage: "url('home-photo.jpg')",
                backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
                borderRadius: 5, boxShadow: 10
            }} >
                <Box maxWidth={"40%"}>
                    <Typography variant="h2" color="primary.main" fontWeight={"600"} fontSize={"4.5vw"} align="center">Find your favorite place here!</Typography>
                    <Typography color="primary.main" fontWeight={"400"} align="center">The best prices for over 2 million properties worldwide</Typography>
                </Box>
                <Box display={"flex"} flexDirection={"row"} justifyContent={"space-evenly"}
                    position={"relative"} py={1}
                    sx={{ width: "70%", height: "30%", bgcolor: "primary.main", borderRadius: 5 }}>
                    <Box>
                        <Typography variant="subtitle2">Location</Typography>
                        <TextField value={value} onChange={(event) => setValue(event.target.value)}
                            placeholder="Type the destination" size="small"
                            sx={{ "& .MuiOutlinedInput-notchedOutline": { borderRadius: 7 } }} />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2">Check In</Typography>
                        <TextField value={value} onChange={(event) => setValue(event.target.value)}
                            placeholder="Add date" size="small"
                            sx={{ "& .MuiOutlinedInput-notchedOutline": { borderRadius: 7 } }} />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2">Check Out</Typography>
                        <TextField value={value} onChange={(event) => setValue(event.target.value)}
                            placeholder="Add date" size="small"
                            sx={{ "& .MuiOutlinedInput-notchedOutline": { borderRadius: 7 } }} />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2">Guests</Typography>
                        <TextField value={value} onChange={(event) => setValue(event.target.value)}
                            placeholder="Add guests" size="small"
                            sx={{ "& .MuiOutlinedInput-notchedOutline": { borderRadius: 7 } }} />
                    </Box>
                    <Button variant="contained" color="secondary"
                        sx={{ position: "absolute", right: "1vh", bottom: "1vh", borderRadius: 5, textTransform: "none" }}
                    >
                        <Search />
                        Search Accommodation
                    </Button>
                </Box>

            </Box>

        </ Paper>
    )
}