import { z } from "zod";

export const bookingSchema = z.object({
    checkInDate: z.coerce.date(),
    checkOutDate: z.coerce.date(),
    guests: z.coerce.number(),
});

export type BookingSchema = z.infer<typeof bookingSchema>;