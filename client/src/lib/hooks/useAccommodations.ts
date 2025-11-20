import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useAccommodations = () => {
    const queryClient = useQueryClient();

    const { data: accommodations, isPending } = useQuery({
        queryKey: ['accommodations'],
        queryFn: async () => {
            const response = await agent.get<Accommodation[]>('/accommodations');
            return response.data;
        }
    });

    const createAccommodation = useMutation({
        mutationFn: async (accommodation: Accommodation) => {
            await agent.post('/accommodations', accommodation);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['accommodations']
            })
        }
    })

    const updateAccommodation = useMutation({
        mutationFn: async (accommodation: Accommodation) => {
            await agent.put('/accommodations', accommodation);
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
        createAccommodation,
        updateAccommodation
    }
}