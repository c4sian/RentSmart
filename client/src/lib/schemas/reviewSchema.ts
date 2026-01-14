import { z } from "zod";

export const reviewSchema = z.object({
    rating: z.coerce.number({
        message: "Rating is required"
    }),
    comment: z.string(),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;