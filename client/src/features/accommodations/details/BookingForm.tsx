import { FormProvider, useForm, useWatch, type Resolver } from "react-hook-form"
import { bookingSchema, type BookingSchema } from "../../../lib/schemas/bookingSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import ControlledDatePicker from "../../../app/shared/components/ControlledDatePicker";
import ControlledNumberInput from "../../../app/shared/components/ControlledNumberInput";
import StarIcon from '@mui/icons-material/Star';
import { differenceInCalendarDays } from "date-fns";
import { useBookings } from "../../../lib/hooks/useBookings";
import { useProfile } from "../../../lib/hooks/useProfile";
import { useMemo, useState } from "react";
import { Link } from "react-router";

type Props = {
    accommodationId: string
    accommodationPrice: number
    averageRating: number
    reviewsCount: number
    ownerId: string
    isLoggedIn: boolean
};

export default function BookingForm({ accommodationId, accommodationPrice, averageRating, reviewsCount, ownerId, isLoggedIn }: Props) {
    const methods = useForm<BookingSchema>({
        mode: "onSubmit",
        resolver: zodResolver(bookingSchema) as Resolver<BookingSchema>,
    });

    const { handleSubmit, control } = methods;

    const { getOwnerDetails } = useProfile();

    const [showOwner, setShowOwner] = useState(false);
    const [ownerDetails, setOwnerDetails] = useState<OwnerDetails | undefined>(undefined);

    const handleContactOwner = async () => {
        setShowOwner(true);

        if (isLoggedIn) {
            await getOwnerDetails.mutateAsync(ownerId, {
                onSuccess: (data: OwnerDetails) => {
                    setOwnerDetails(data);
                }
            });
        }
    }

    const { bookedDates, createBooking } = useBookings(accommodationId);

    const disabledRanges = useMemo(() => {
        return bookedDates.map(b => ({
            start: new Date(b.checkInDate),
            end: new Date(b.checkOutDate),
        }));
    }, [bookedDates])

    const isDateDisabled = (date: Date) => {
        return disabledRanges.some(range =>
            date >= range.start && date < range.end
        );
    };

    const onSubmit = async (data: BookingSchema) => {
        const { checkInDate, checkOutDate } = data;
        const createBookingDto = { accommodationId, checkInDate, checkOutDate };

        await createBooking.mutateAsync(createBookingDto, {
            onError: (error) => {
                console.log(error);
            }
        });
    }

    const checkIn = useWatch({ control, name: 'checkInDate' });
    const checkOut = useWatch({ control, name: 'checkOutDate' });

    const nights = checkIn && checkOut && (checkOut > checkIn)
        ? differenceInCalendarDays(checkOut, checkIn)
        : 0;

    const totalPrice = nights > 0 ? nights * accommodationPrice : 0;

    return (
        <Box sx={{ border: "1px solid", borderColor: "grey.300", borderRadius: 3, p: 2 }}>

            <Box display={"flex"} justifyContent="space-between">

                <Box display={"flex"}>
                    <Typography variant="h3" fontSize={26}>${accommodationPrice}</Typography>
                    <Typography fontSize={12} color="grey.800" alignSelf={"end"}>/ night</Typography>
                </Box>

                <Box display={"flex"} sx={{ alignItems: "center", gap: 0.5 }}>
                    <StarIcon sx={{ color: "orange" }} />
                    <Typography fontSize={14} color="grey.800">{averageRating.toFixed(1)} ({reviewsCount})</Typography>
                </Box>

            </Box>

            <FormProvider {...methods}>
                <Stack component={"form"} onSubmit={handleSubmit(onSubmit)} sx={{ my: 3 }}>
                    <Box sx={{ display: "flex", mb: 2 }}>
                        <ControlledDatePicker<BookingSchema> name="checkInDate" label="CheckIn" isDateDisabled={isDateDisabled} />
                        <ControlledDatePicker<BookingSchema> name="checkOutDate" label="CheckOut" isDateDisabled={isDateDisabled} />
                    </Box>

                    <ControlledNumberInput<BookingSchema> name="guests" label="Guests" />

                    {totalPrice !== 0 && (
                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                            <Typography color="grey.800">Total</Typography>
                            <Typography variant="h2" fontSize={22} >$ {totalPrice}</Typography>
                        </Box>
                    )}

                    <Button type="submit" variant="contained" size="large"
                        sx={{
                            backgroundColor: "secondary.main", color: "primary.main",
                            height: "65px", mt: 3
                        }}
                    >
                        Book now
                    </Button>
                </Stack>
            </FormProvider>

            <Box sx={{ mt: 4.5 }}>
                <Stack sx={{ justifyContent: "center" }}>
                    <Typography variant="subtitle2" textAlign={"center"}>Owner/property manager</Typography>
                    {!showOwner &&
                        <Button
                            variant="text" color="secondary"
                            onClick={handleContactOwner}
                        >
                            Click to contact owner
                        </Button>
                    }
                </Stack>

                {showOwner && (ownerDetails ? (
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}>
                        <Avatar src={ownerDetails.imageUrl} alt="Owner profile picture" />
                        <Box>
                            <Typography variant="subtitle2">{ownerDetails.displayName}</Typography>
                            <Typography variant="subtitle2">{ownerDetails.email}</Typography>
                        </Box>
                    </Box>
                ) : (
                    <Stack alignItems={"center"} sx={{ mt: 1 }}>
                        <Typography fontSize={14}>
                            You need to be signed in to contact owner.
                        </Typography>
                        <Typography component={Link} to='/login' color="secondary" fontSize={14}>Sign In</Typography>
                    </Stack>
                ))}
            </Box>
        </Box>
    )
}