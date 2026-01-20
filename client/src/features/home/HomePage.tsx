import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { filtersSchema, type FiltersSchema } from "../../lib/schemas/filtersSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import ControlledTextInput from "../../app/shared/components/ControlledTextInput";
import ControlledDatePicker from "../../app/shared/components/ControlledDatePicker";
import Search from "@mui/icons-material/Search";

export default function HomePage() {
    const methods = useForm<FiltersSchema>({
        mode: 'onSubmit',
        resolver: zodResolver(filtersSchema) as Resolver<FiltersSchema>
    });

    const navigate = useNavigate();

    const { handleSubmit } = methods;

    const onSubmit = (data: FiltersSchema) => {
        const params = new URLSearchParams();

        if (data.destination) {
            params.set("destination", data.destination);
        }

        if (data.checkIn) {
            params.set("checkIn", format(data.checkIn, "yyyy-MM-dd"));
        }

        if (data.checkOut) {
            params.set("checkOut", format(data.checkOut, "yyyy-MM-dd"));
        }

        const page = 1;
        params.set("page", page.toString());

        navigate(`/accommodations?${params.toString()}`);
    }

    return (
        <Box sx={{ maxWidth: 1300, mx: "auto", mt: 2 }}>

            <Stack sx={{
                justifyContent: "space-around", alignItems: "center",
                backgroundImage: "url('home-photo3.jpg')",
                backgroundSize: "cover", backgroundPosition: "50% 47%",
                height: 450,
                borderRadius: 5, boxShadow: 15
            }} >
                <Box sx={{ maxWidth: "50%", color: "white" }}>
                    <Typography variant="h1" fontSize={60} textAlign="center">
                        Find your favorite place here!
                    </Typography>
                    <Typography variant="h6" fontSize={16} textAlign="center">
                        The best prices for over 2 million properties worldwide
                    </Typography>
                </Box>

                <FormProvider {...methods}>
                    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}
                        display={"flex"} sx={{ bgcolor: "white", borderRadius: 5, p: 2, gap: 2 }}>
                        <Box>
                            <Typography variant="subtitle2">Destination</Typography>
                            <ControlledTextInput<FiltersSchema> name="destination" label="Type the destination"
                                size="small" />
                        </Box>
                        <Box>
                            <Typography variant="subtitle2">Check-in</Typography>
                            <ControlledDatePicker<FiltersSchema> name="checkIn" label="Add date"
                                slotProps={{ textField: { size: "small" } }} />
                        </Box>
                        <Box>
                            <Typography variant="subtitle2">Check-out</Typography>
                            <ControlledDatePicker<FiltersSchema> name="checkOut" label="Add date"
                                slotProps={{ textField: { size: "small" } }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" color="transparent">Check-out</Typography>
                            <Button type="submit" variant="contained" color="secondary"
                                sx={{ alignSelf: "center" }}
                            >
                                <Search fontSize="small" />
                                Search
                            </Button>
                        </Box>
                    </Box>
                </FormProvider>
            </Stack>
        </ Box >
    )
}