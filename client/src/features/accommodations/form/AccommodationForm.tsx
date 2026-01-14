import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { accommodationSchema, type AccommodationSchema } from "../../../lib/schemas/accommodationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { accommodationCategories } from "./accommodationUtils";
import { useAccommodations } from "../../../lib/hooks/useAccommodations";
import ControlledTextInput from "../../../app/shared/components/ControlledTextInput";
import ControlledSelectInput from "../../../app/shared/components/ControlledSelectInput";
import ControlledNumberInput from "../../../app/shared/components/ControlledNumberInput";
import ControlledCheckboxSelector from "../../../app/shared/components/ControlledCheckboxSelector";
import ControlledTimePicker from "../../../app/shared/components/ControlledTimePicker";
import { format } from "date-fns"
import { useNavigate } from "react-router";

export default function AccommodationForm() {
    const methods = useForm<AccommodationSchema>({
        mode: "onSubmit",
        resolver: zodResolver(accommodationSchema) as Resolver<AccommodationSchema>,
    });
    const navigate = useNavigate();

    const { handleSubmit, formState: { isValid, isSubmitting } } = methods;

    const { createAccommodation } = useAccommodations();

    const onSubmit = async (data: AccommodationSchema) => {
        const { location, checkIn, checkOut, ...rest } = data;

        const formattedData = {
            checkIn: format(checkIn, "HH:mm"),
            checkOut: format(checkOut, "HH:mm")
        }

        const flattenedData = { ...location, ...formattedData, ...rest };

        await createAccommodation.mutateAsync(flattenedData, {
            onSuccess: (accommodationId: string) => {
                navigate(`/accommodationImages/${accommodationId}`);
            },
            onError: (error) => {
                console.log(error);
            }
        })
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>

            <FormProvider {...methods}>
                <Stack component={"form"} onSubmit={handleSubmit(onSubmit)} sx={{ width: "1100px", mt: 2 }} >

                    <Paper sx={{ display: "flex", flexDirection: "column", p: 4, borderRadius: 2 }}>
                        <Box sx={{ mb: 2, width: "50%" }}>
                            <Typography variant="subtitle2">Add a name for the property: </Typography>
                            <ControlledTextInput<AccommodationSchema> name="title" label="Name" variant="standard" fullWidth />
                        </Box>
                        <Box sx={{ width: "100%" }}>
                            <Typography variant="subtitle2">Write a description for your property: </Typography>
                            <ControlledTextInput<AccommodationSchema> name="description" label="Description" variant="standard"
                                multiline minRows={5} maxRows={7} fullWidth />
                        </Box>
                    </Paper>

                    <Paper sx={{ display: "flex", flexDirection: "column", p: 4, mt: 2, borderRadius: 2 }}>
                        <Typography variant="subtitle2">Location information</Typography>
                        <Box sx={{ display: "flex", width: "100%", gap: 10, mt: 2 }}>
                            <ControlledTextInput<AccommodationSchema> name="location.country" label="Country" fullWidth />
                            <ControlledTextInput<AccommodationSchema> name="location.stateOrCounty" label="State/County" fullWidth />
                        </Box>
                        <Box sx={{ display: "flex", width: "100%", gap: 10, mt: 2 }}>
                            <ControlledTextInput<AccommodationSchema> name="location.city" label="City" fullWidth />
                            <ControlledTextInput<AccommodationSchema> name="location.street" label="Street" fullWidth />
                        </Box>
                    </Paper>

                    <Paper sx={{ display: "flex", flexDirection: "column", p: 4, mt: 2, borderRadius: 2 }}>
                        <Typography variant="subtitle2">General information</Typography>

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "50%", mt: 2 }}>
                            <Typography variant="subtitle2" fontWeight={400}>Select a category for your property:</Typography>
                            <Box sx={{ display: "flex", width: "30%" }}>
                                <ControlledSelectInput<AccommodationSchema> name="type" label="Category" items={accommodationCategories} />
                            </Box>
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "50%", mt: 2 }}>
                            <Typography variant="subtitle2" fontWeight={400}>Add the number of guests allowed:</Typography>
                            <Box sx={{ display: "flex", width: "30%" }}>
                                <ControlledNumberInput name="guestsNumber" label="Guests" />
                            </Box>
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "50%", mt: 2 }}>
                            <Typography variant="subtitle2" fontWeight={400}>Add the rent price (/night):</Typography>
                            <Box sx={{ display: "flex", width: "30%" }}>
                                <ControlledNumberInput name="pricePerNight" label="Price/Night" />
                            </Box>
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "50%", mt: 2 }}>
                            <Typography variant="subtitle2" fontWeight={400}>Add time to check-in:</Typography>
                            <Box sx={{ display: "flex", width: "30%" }}>
                                <ControlledTimePicker<AccommodationSchema> name="checkIn" label="Check-in" />
                            </Box>
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "50%", mt: 2 }}>
                            <Typography variant="subtitle2" fontWeight={400}>Add time to check-out:</Typography>
                            <Box sx={{ display: "flex", width: "30%" }}>
                                <ControlledTimePicker<AccommodationSchema> name="checkOut" label="Check-out" />
                            </Box>
                        </Box>
                    </Paper>

                    <Paper sx={{ display: "flex", flexDirection: "column", p: 4, mt: 2, borderRadius: 2 }}>
                        <Typography variant="subtitle2">Amenities</Typography>
                        <ControlledCheckboxSelector<AccommodationSchema> name="amenityIds" />
                    </Paper>

                    <Paper sx={{ display: "flex", width: "100%", justifyContent: "space-between", p: 4, mt: 2, mb: 2 }}>
                        <Typography variant="h6">Confirm and go to Step 2 - Adding images</Typography>
                        <Button type="submit" variant="contained"
                            sx={{ bgcolor: "secondary.main", color: "primary.main" }}
                            disabled={!isValid && !isSubmitting}>
                            Confirm accommodation details
                        </Button>
                    </Paper>
                </Stack>
            </FormProvider>

        </Box>
    )
}