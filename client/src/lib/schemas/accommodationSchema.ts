import { z } from "zod";
import { requiredString } from "../utils/utils";

export const accommodationSchema = z.object({
    title: requiredString("Title"),
    description: requiredString("Description"),
    location: z.object({
        country: requiredString("Country"),
        stateOrCounty: z.string().optional(),
        city: requiredString("City"),
        street: requiredString("Street")
    }),
    type: requiredString("Type"),
    guestsNumber: z.coerce.number(),
    pricePerNight: z.coerce.number({
        message: "Price is required"
    }),
    checkIn: z.coerce.date({
        message: "Check-in is required"
    }),
    checkOut: z.coerce.date({
        message: "Check-out is required"
    }),
    amenityIds: z.array(z.coerce.number()),
});

export type AccommodationSchema = z.infer<typeof accommodationSchema>;