import { useMutation, useQuery } from "@tanstack/react-query"
import api from "../api/api"
import type { FieldValues } from "react-hook-form";
import { queryClient } from "../api/queryClient";

export const useReviews = (accommodationId?: string) => {
    const { data: accommodationReviews } = useQuery<AccommodationReview[]>({
        queryKey: ['accommodations', accommodationId, 'reviews'],
        queryFn: async () => {
            const response = await api.get(`/reviews/accommodation/${accommodationId}`);
            return response.data;
        },
        initialData: [],
    });

    const { data: reviewEligibility } = useQuery<ReviewEligibility>({
        queryKey: ['accommodations', accommodationId, 'reviews', 'eligibility'],
        queryFn: async () => {
            const response = await api.get(`/reviews/eligibility/${accommodationId}`);
            return response.data;
        },
        retry: false,
        initialData: { canReview: false, bookingId: '' },
    });

    const createReview = useMutation({
        mutationFn: async (createReviewDto: FieldValues) => {
            await api.post('/reviews', createReviewDto);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['accommodations', accommodationId, 'reviews']
            });
        }
    });

    return {
        accommodationReviews,
        reviewEligibility,
        createReview
    }
}