import { Box, Divider, Typography } from "@mui/material";
import { Link, useParams } from "react-router";
import { useAccommodations } from "../../../lib/hooks/useAccommodations";
import ImageGallery from "./ImageGallery";
import AmenityList from "./AmenityList";
import BookingForm from "./BookingForm";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Map from "./Map";
import ReviewsSection from "./ReviewsSection";

export default function AccommodationPage() {
    const { id } = useParams();
    const { accommodation } = useAccommodations(id);

    if (!accommodation) return <Typography>Accommodation not found</Typography>

    return (
        <Box sx={{
            maxWidth: 1300, mx: "auto",
            px: 2, py: 2, mt: 1,
            bgcolor: "white", borderRadius: 2
        }}>
            <Typography variant="h1" fontSize={28}>{accommodation.title}</Typography>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
                {accommodation.city}, {accommodation.stateOrCounty}, {accommodation.country}
            </Typography>

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
                            display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr" },
                            mt: 1
                        }}>
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <AccessTimeIcon />
                                <Typography>Check in after: {accommodation.checkIn}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <AccessTimeIcon />
                                <Typography>Check out before: {accommodation.checkOut}</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Divider sx={{ backgroundColor: "grey.100" }} />

                    <Box sx={{ my: 3 }}>
                        <Typography variant="h2" fontSize={24}>Policies</Typography>

                        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr" }, mt: 1 }}>
                            <Box>
                                <Typography variant="h3" fontSize={20} color="secondary">Cancellation Policy</Typography>
                                <Typography sx={{ mt: 1 }}>Bookings at this property are non-refundable.</Typography>
                            </Box>
                            <Box>
                                <Typography sx={{ mb: 1 }}>If you have upcoming trips, you can manage or cancel your booking in your traveler account.</Typography>
                                <Typography component={Link} to={`/profile`}
                                    variant="h4" fontSize={18} color="secondary"
                                >
                                    View upcoming trip
                                </Typography>
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
                        ownerId={accommodation.ownerId}
                    />
                </Box>

            </Box>
        </Box >
    )
}