import { useMutation, useQuery } from "@tanstack/react-query"
import type { FieldValues } from "react-hook-form"
import api from "../api/api";

export const useBookings = (accommodationId?: string) => {
    const { data: bookedDates } = useQuery<BookedDates[]>({
        queryKey: ['accommodations', accommodationId, 'availability'],
        queryFn: async () => {
            const response = await api.get(`/bookings/availability/${accommodationId}`);
            return response.data;
        },
        initialData: [],
        enabled: !!accommodationId,
    });

    const createBooking = useMutation({
        mutationFn: async (createBookingDto: FieldValues) => {
            await api.post('/bookings', createBookingDto);
        }
    });

    const cancelBooking = useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/bookings/${id}`);
        }
    })

    return {
        bookedDates,
        createBooking,
        cancelBooking
    }
}