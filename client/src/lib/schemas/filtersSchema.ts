import z from "zod";

export const filtersSchema = z.object({
    destination: z.string().optional(),
    checkIn: z.coerce.date().optional(),
    checkOut: z.coerce.date().optional(),
    maxPrice: z.coerce.number().optional(),
    minRating: z.coerce.number().optional(),
    type: z.string().optional(),
});

export type FiltersSchema = z.infer<typeof filtersSchema>; 