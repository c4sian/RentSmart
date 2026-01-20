import { Box, Button, Typography } from "@mui/material";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { filtersSchema, type FiltersSchema } from "../../../lib/schemas/filtersSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { accommodationCategories } from "../form/accommodationUtils";
import { useNavigate } from "react-router";
import { setQueryParams } from "./setQueryParams";
import ControlledTextInput from "../../../app/shared/components/ControlledTextInput";
import ControlledDatePicker from "../../../app/shared/components/ControlledDatePicker";
import ControlledSliderInput from "../../../app/shared/components/ControlledSliderInput";
import ControlledSelectInput from "../../../app/shared/components/ControlledSelectInput";
import ControlledRatingInput from "../../../app/shared/components/ControlledRatingInput";
import Search from "@mui/icons-material/Search";
import { format } from "date-fns";
// import { queryClient } from "../../../lib/api/queryClient";

export default function FiltersForm() {
    const methods = useForm({
        mode: 'onSubmit',
        resolver: zodResolver(filtersSchema) as Resolver<FiltersSchema>
    });

    const { handleSubmit } = methods;

    const navigate = useNavigate();

    const formatDateForQuery = (date?: Date | null) =>
        date ? format(date, "yyyy-MM-dd") : undefined;

    const onSubmit = (data: FiltersSchema) => {
        const page = 1;

        const params = setQueryParams({
            destination: data.destination,
            checkIn: formatDateForQuery(data.checkIn),
            checkOut: formatDateForQuery(data.checkOut),
            maxPrice: data.maxPrice,
            type: data.type,
            minRating: data.minRating,
            page: page.toString(),
        });

        // queryClient.removeQueries({
        //     queryKey: ["accommodations"],
        //     exact: false
        // });

        navigate(`/accommodations?${params.toString()}`);
    }

    return (
        <Box sx={{
            position: "sticky", top: 16, alignSelf: "start",
            bgcolor: "white", p: 2
        }}>
            <FormProvider {...methods}>
                <Box component={"form"} onSubmit={handleSubmit(onSubmit)} sx={{ my: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>Filters</Typography>
                    <ControlledTextInput<FiltersSchema> name="destination" label="Destination" size="small" fullWidth />

                    <Box sx={{ my: 1 }}>
                        <Typography variant="subtitle1">CheckIn/CheckOut</Typography>
                        <Box display={"flex"} sx={{ mt: 1 }}>
                            <ControlledDatePicker<FiltersSchema> name="checkIn" label="Add date" />
                            <ControlledDatePicker<FiltersSchema> name="checkOut" label="Add date" />
                        </Box>
                    </Box>

                    <Box sx={{ my: 1 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>Max price / night</Typography>
                        <ControlledSliderInput<FiltersSchema> name="maxPrice" />
                    </Box>

                    <Box sx={{ my: 1 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>Type</Typography>
                        <ControlledSelectInput<FiltersSchema> name="type" label="Type"
                            items={accommodationCategories} />
                    </Box>

                    <Box sx={{ my: 1 }}>
                        <Typography variant="subtitle1">Min Rating</Typography>
                        <ControlledRatingInput<FiltersSchema> name="minRating" />
                    </Box>

                    <Button type="submit" variant="contained" color="secondary"
                    >
                        <Search fontSize="small" />
                        Search
                    </Button>

                </Box>
            </FormProvider>
        </Box>
    )
}