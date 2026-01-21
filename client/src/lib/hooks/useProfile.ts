import { useMutation, useQuery } from "@tanstack/react-query"
import api from "../api/api"
import { useLocation } from "react-router";

export const useProfile = () => {
    const location = useLocation();

    const { data: userProfile, isLoading: loadingUserProfile } = useQuery<UserProfile>({
        queryKey: ['users', 'me'],
        queryFn: async () => {
            const response = await api.get('/users/me');
            return response.data;
        },
        enabled: location.pathname === '/my-profile',
    });

    const getOwnerDetails = useMutation({
        mutationFn: async (ownerId: string) => {
            const response = await api.get(`/users/${ownerId}`);
            return response.data;
        }
    })

    return {
        userProfile,
        loadingUserProfile,
        getOwnerDetails
    }
}