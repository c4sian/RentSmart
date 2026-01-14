import { useQuery } from "@tanstack/react-query"
import api from "../api/api"

export const useProfile = (id?: string) => {
    const { data: userData } = useQuery<UserProfile>({
        queryKey: ['users', 'me'],
        queryFn: async () => {
            const response = await api.get('/users/me');
            return response.data;
        },
        enabled: !id
    });

    const { data: ownerDetails } = useQuery<OwnerDetails>({
        queryKey: ['users', id],
        queryFn: async () => {
            const response = await api.get(`/users/${id}`);
            return response.data;
        },
        enabled: !!id
    })

    return {
        userData,
        ownerDetails
    }
}