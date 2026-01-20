import { useMutation } from "@tanstack/react-query"
import api from "../api/api"

export const useFavorites = () => {
    const addFavorite = useMutation({
        mutationFn: async (id: string) => {
            await api.post(`/favorites/${id}`);
        }
    });

    const removeFavorite = useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/favorites/${id}`);
        }
    });

    return {
        addFavorite,
        removeFavorite
    }
}