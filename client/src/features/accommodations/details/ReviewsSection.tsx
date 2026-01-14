import { Box, Button } from "@mui/material";
import { FormProvider, useForm, type FieldValues, type Resolver } from "react-hook-form";
import { useReviews } from "../../../lib/hooks/useReviews";
import ControlledTextInput from "../../../app/shared/components/ControlledTextInput";
import { reviewSchema, type ReviewSchema } from "../../../lib/schemas/reviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledRatingInput from "../../../app/shared/components/ControlledRatingInput";

type Props = {
    accommodationId: string
};

export default function ReviewsSection({ accommodationId }: Props) {
    const methods = useForm<ReviewSchema>({
        mode: "onSubmit",
        resolver: zodResolver(reviewSchema) as Resolver<ReviewSchema>
    });
    const { handleSubmit, reset } = methods;

    const { accommodationReviews, reviewEligibility, createReview } = useReviews(accommodationId);

    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        reset();
    }

    return (
        <>
            <FormProvider {...methods}>
                <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                    <ControlledRatingInput<ReviewSchema> name="rating" />
                    <ControlledTextInput<ReviewSchema> name="comment" label=""
                        variant="outlined" fullWidth multiline minRows={2}
                    />
                    <Button type="submit" variant="contained" color="secondary">Submit now</Button>
                </Box >
            </FormProvider >
        </>
    )
}