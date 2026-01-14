import { Box, Button, Typography } from "@mui/material";
import { useProfile } from "../../lib/hooks/useProfile";
import { useNavigate } from "react-router";

export default function ProfilePage() {
    const { userData } = useProfile();
    const navigate = useNavigate();

    return (
        <Box>
            {userData &&
                userData.listedAccommodations.map((accommodation) => (
                    <Box key={accommodation.id}>
                        <Typography variant="body1">{accommodation.title}</Typography>
                        <Typography variant="body1">{accommodation.description}</Typography>
                        <Button variant="contained" onClick={() => { navigate(`/accommodationImages/${accommodation.id}`) }}>
                            Edit images
                        </Button>
                    </Box>
                ))}
        </Box>
    )
}