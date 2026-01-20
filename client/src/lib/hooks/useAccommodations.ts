import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/api";
import type { FieldValues } from "react-hook-form";
import { queryClient } from "../api/queryClient";
import { useLocation } from "react-router";

export const useAccommodations = (id?: string, filters?: FieldValues) => {
    const location = useLocation();

    const { data: pagedAccommodations, isLoading: loadingAccommodations } = useQuery({
        queryKey: ['accommodations', filters],
        queryFn: async () => {
            const response = await api.get<PagedResponse>('/accommodations', {
                params: filters
            });
            return response.data;
        },
        initialData: { accommodations: [], totalCount: 0 },
        enabled: location.pathname === '/accommodations',
    });

    const { data: accommodation } = useQuery({
        queryKey: ['accommodations', id],
        queryFn: async () => {
            const response = await api.get<AccommodationFullData>(`/accommodations/${id}`);
            return response.data;
        },
        enabled: !!id,
    });

    const createAccommodation = useMutation({
        mutationFn: async (accommodation: FieldValues) => {
            const response = await api.post('/accommodations', accommodation);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['accommodations']
            })
        }
    })

    const updateAccommodation = useMutation({
        mutationFn: async (accommodation: FieldValues) => {
            await api.put('/accommodations', accommodation);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['accommodations']
            });
        }
    });

    return {
        pagedAccommodations,
        loadingAccommodations,
        accommodation,
        createAccommodation,
        updateAccommodation
    }
}