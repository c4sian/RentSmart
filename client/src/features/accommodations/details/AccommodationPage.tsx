import { Box, Divider, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useAccommodations } from "../../../lib/hooks/useAccommodations";
import AccommodationHeader from "./AccommodationHeader";
import ImageGallery from "./ImageGallery";
import AmenityList from "./AmenityList";
import BookingForm from "./BookingForm";
import Map from "./Map";
import ReviewsSection from "./ReviewsSection";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import { queryClient } from "../../../lib/api/queryClient";

export default function AccommodationPage() {
    const { id } = useParams();
    const { accommodation, loadingAccommodationDetails } = useAccommodations(id);

    if (loadingAccommodationDetails) return <Typography>Loading...</Typography>

    if (!accommodation) return <Typography>Accommodation not found</Typography>

    const user = queryClient.getQueryData(['user']);
    const isLoggedIn = !!user;

    return (
        <Box sx={{
            maxWidth: 1300, mx: "auto",
            px: 2, py: 2, mt: 1,
            bgcolor: "white", borderRadius: 2
        }}>
            <AccommodationHeader
                id={accommodation.id}
                title={accommodation.title}
                country={accommodation.country}
                stateOrCounty={accommodation.stateOrCounty}
                city={accommodation.city}
                isFavorite={accommodation.isFavorite}
                isLoggedIn={isLoggedIn}
            />

            <ImageGallery images={accommodation.images} />

            <Box sx={{
                display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr minmax(0, 1fr)" },
                gap: 4, alignItems: "start", mt: 3
            }}>
                <Box>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h2" fontSize={24}>{accommodation.title}</Typography>
                        <Typography sx={{ mt: 1, whiteSpace: "pre-line" }}>{accommodation.description}</Typography>
                    </Box>

                    <Divider sx={{ backgroundColor: "grey.100" }} />

                    <AmenityList amenityIds={accommodation.amenityIds} />

                    <Divider sx={{ backgroundColor: "grey.100" }} />

                    <Box sx={{ my: 3 }}>
                        <Typography variant="h2" fontSize={24}>House Rules</Typography>

                        <Box sx={{
                            display: "grid", gridTemplateColumns: { md: "1fr 1fr 1fr" },
                            gap: 4, mt: 1
                        }}>
                            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                <AccessTimeIcon />
                                <Typography>Check in after: {accommodation.checkIn}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                <AccessTimeIcon />
                                <Typography>Check out before: {accommodation.checkOut}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                <PersonIcon />
                                <Typography>Max guests: {accommodation.guestsNumber}</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Divider sx={{ backgroundColor: "grey.100" }} />

                    <Box sx={{ my: 3 }}>
                        <Typography variant="h2" fontSize={24}>Map</Typography>

                        <Box sx={{ height: 400, display: "block", mt: 2 }}>
                            <Map
                                title={accommodation.title}
                                position={[accommodation.latitude, accommodation.longitude]}
                            />
                        </Box>
                    </Box>

                    <Divider sx={{ backgroundColor: "grey.100" }} />

                    <Box sx={{ my: 3 }}>
                        <Typography variant="h2" fontSize={24}>Reviews</Typography>

                        <ReviewsSection accommodationId={accommodation.id} />
                    </Box>

                </Box>

                <Box sx={{ position: "sticky", top: 16, alignSelf: "start" }}>
                    <BookingForm
                        accommodationId={accommodation.id}
                        accommodationPrice={accommodation.pricePerNight}
                        averageRating={accommodation.averageRating}
                        reviewsCount={accommodation.reviewsCount}
                        ownerId={accommodation.ownerId}
                        isLoggedIn={isLoggedIn}
                    />
                </Box>

            </Box>
        </Box >
    )
}