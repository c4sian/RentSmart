import { Avatar, Box, ButtonBase, Typography } from "@mui/material";
import { useProfile } from "../../lib/hooks/useProfile";
import { useState } from "react";
import ListedAccommodations from "./ListedAccommodations";
import FavoriteAccommodations from "./FavoriteAccommodations";
import UserBookings from "./UserBookings";

export default function ProfilePage() {
    const { userProfile, loadingUserProfile } = useProfile();

    const [display, setDisplay] = useState("Bookings");

    if (loadingUserProfile) return <Typography>Loading...</Typography>

    if (!userProfile) return <Typography>Could not get user profile.</Typography>

    return (
        <Box sx={{ maxWidth: 1300, mx: "auto", mt: 3, minHeight: "calc(100vh - 88px)" }}>
            <Box display={"flex"} sx={{
                alignItems: "center", backgroundColor: "white",
                borderRadius: 5, gap: 4, p: 3
            }}>
                <Avatar src="" alt="User avatar" sx={{ height: 100, width: 100 }} />
                <Box>
                    <Typography variant="h5">{userProfile.displayName}</Typography>
                    <Typography>{userProfile.email}</Typography>
                </Box>
            </Box>
            <Box>
                <Box display={"flex"} sx={{ mt: 3, gap: 3 }}>
                    <ButtonBase onClick={() => setDisplay("Bookings")} disableRipple>
                        <Box sx={{
                            backgroundColor: display === "Bookings" ? "grey.300" : "white",
                            borderRadius: "12px 12px 0 0", p: 2
                        }}>
                            <Typography variant="h6">Your bookings</Typography>
                        </Box>
                    </ButtonBase>

                    <ButtonBase onClick={() => setDisplay("Accommodations")} disableRipple>
                        <Box sx={{
                            backgroundColor: display === "Accommodations" ? "grey.300" : "white",
                            borderRadius: "12px 12px 0 0", p: 2
                        }}>
                            <Typography variant="h6">Your accommodations</Typography>
                        </Box>
                    </ButtonBase>

                    <ButtonBase onClick={() => setDisplay("Favorites")} disableRipple>
                        <Box sx={{
                            backgroundColor: display === "Favorites" ? "grey.300" : "white",
                            borderRadius: "12px 12px 0 0", p: 2
                        }}>
                            <Typography variant="h6">Your favorites</Typography>
                        </Box>
                    </ButtonBase>
                </Box>

                {display === "Accommodations" && (
                    <ListedAccommodations listedAccommodations={userProfile.listedAccommodations} />
                )}

                {display === "Favorites" && (
                    <FavoriteAccommodations favoriteAccommodations={userProfile.favoriteAccommodations} />
                )}

                {display === "Bookings" && (
                    <UserBookings userBookings={userProfile.userBookings} />
                )}

            </Box>
        </Box>
    )
}