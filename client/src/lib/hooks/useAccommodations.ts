import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/api";
import type { FieldValues } from "react-hook-form";
import { queryClient } from "../api/queryClient";
import { useLocation } from "react-router";

export const useAccommodations = (id?: string) => {
    const location = useLocation();

    const { data: accommodations, isPending } = useQuery({
        queryKey: ['accommodations'],
        queryFn: async () => {
            const response = (await api.get<AccommodationShortData[]>('/accommodations'));
            return response.data;
        },
        initialData: [],
        enabled: location.pathname === "/accommodations"
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
        accommodations,
        isPending,
        accommodation,
        createAccommodation,
        updateAccommodation
    }
}