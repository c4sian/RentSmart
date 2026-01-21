import { Box, Button, Typography } from "@mui/material";
import { format } from "date-fns";
import NearMeRoundedIcon from '@mui/icons-material/NearMeRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import { useBookings } from "../../lib/hooks/useBookings";

type Props = {
    userBookings: UserBooking[]
};

export default function UserBookings({ userBookings }: Props) {
    const formatDate = (date: Date) => {
        return format(date, "dd-MM-yyyy");
    };

    const { cancelBooking } = useBookings();

    const onCancelBooking = async (id: string) => {
        await cancelBooking.mutateAsync(id);
    }

    return (
        <Box sx={{ backgroundColor: "white", gap: 2, p: 2 }}>
            {userBookings.map((booking) => {

                const canCancelBooking = (checkInDate: Date, status: string) => {
                    if (new Date(checkInDate) <= new Date() || status === "Cancelled")
                        return false;
                    else
                        return true;
                }

                return (
                    <Box key={booking.id} display={"flex"} sx={{ mt: 2 }}>
                        <img src={booking.accommodation.mainImageUrl} alt="Accommodation card image"
                            style={{ width: 500, height: 175, objectFit: "cover", borderRadius: 10 }}
                        />

                        <Box sx={{ ml: 2 }}>
                            <Typography variant="h4" fontSize={20}>{booking.accommodation.title}</Typography>

                            <Box display={"flex"} sx={{ alignItems: "center", mt: 1, gap: 0.5 }}>
                                <NearMeRoundedIcon fontSize="small" />
                                <Typography>{booking.accommodation.city}, {booking.accommodation.street}</Typography>
                            </Box>

                            <Box display={"flex"} sx={{ alignItems: "center", mt: 1, gap: 0.5 }}>
                                <DateRangeRoundedIcon fontSize="small" />
                                <Typography>{formatDate(booking.checkInDate)}</Typography>
                                <FastForwardRoundedIcon fontSize="small" />
                                <Typography>{formatDate(booking.checkOutDate)}</Typography>
                            </Box>

                            <Button variant="outlined" color="error"
                                onClick={() => onCancelBooking(booking.id)}
                                disabled={!canCancelBooking(booking.checkInDate, booking.status)}
                                sx={{ mt: 1 }}
                            >
                                Cancel booking
                            </Button>
                        </Box>

                    </Box>
                )
            })}
        </Box>
    )
}