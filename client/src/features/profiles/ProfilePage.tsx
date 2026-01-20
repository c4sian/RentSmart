import { Avatar, Box, Button, Typography } from "@mui/material";
import { useProfile } from "../../lib/hooks/useProfile";
import { useNavigate } from "react-router";

export default function ProfilePage() {
    const { userData } = useProfile();
    const navigate = useNavigate();

    return (
        <Box sx={{ maxWidth: 1300, mx: "auto", mt: 3 }}>
            <Box display={"flex"} sx={{
                alignItems: "center", backgroundColor: "white",
                borderRadius: 5, gap: 4, p: 3
            }}>
                <Avatar src="" alt="User avatar" sx={{ height: 100, width: 100 }} />
                <Box>
                    <Typography variant="h5">{userData?.displayName}</Typography>
                    <Typography>{userData?.email}</Typography>
                </Box>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: { md: "2fr 8fr" } }}>

                {userData &&
                    userData.listedAccommodations.map((accommodation) => (
                        <Box key={accommodation.id}>
                            <Typography variant="body1">{accommodation.title}</Typography>
                            <Typography variant="body1">{accommodation.description}</Typography>
                            <Button variant="contained" onClick={() => { navigate(`/accommodation-images/${accommodation.id}`) }}>
                                Edit images
                            </Button>
                        </Box>
                    ))}
            </Box>
        </Box>
    )
}