import { Avatar, Box, Button, Rating, Typography } from "@mui/material";
import { FormProvider, useForm, type FieldValues, type Resolver } from "react-hook-form";
import { useReviews } from "../../../lib/hooks/useReviews";
import ControlledTextInput from "../../../app/shared/components/ControlledTextInput";
import { reviewSchema, type ReviewSchema } from "../../../lib/schemas/reviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledRatingInput from "../../../app/shared/components/ControlledRatingInput";
import { format } from "date-fns";

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

    const bookingId = reviewEligibility.bookingId;

    const onSubmit = async (data: FieldValues) => {
        const createReviewDto = { ...data, accommodationId, bookingId };

        await createReview.mutateAsync(createReviewDto);
        reset();
    }

    const formattedDate = (date: Date) => {
        return format(date, "dd MMM yyyy");
    }

    return (
        <>
            {reviewEligibility.canReview && (
                <FormProvider {...methods}>
                    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                        <ControlledRatingInput<ReviewSchema> name="rating" />
                        <ControlledTextInput<ReviewSchema> name="comment"
                            label="What was your experience at this location?"
                            variant="outlined" fullWidth multiline minRows={2}
                        />
                        <Button type="submit" variant="contained" color="secondary">Submit now</Button>
                    </Box>
                </FormProvider>
            )}

            {accommodationReviews.map((review) => (
                <Box key={review.id} mt={2} sx={{ display: "grid", gridTemplateColumns: { md: "1fr 9fr" } }}>
                    <Avatar variant="rounded" src={review.reviewer.imageUrl}
                        sx={{ justifySelf: "center", alignSelf: "center" }} />

                    <Box>
                        <Typography variant="subtitle1" fontSize={14}>{review.reviewer.displayName}, {formattedDate(review.createdAt)}</Typography>
                        <Rating readOnly value={review.rating} />
                        <Typography>{review.comment}</Typography>
                    </Box>
                </Box>
            ))}
        </>
    )
}