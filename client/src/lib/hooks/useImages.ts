import { useMutation, useQuery } from "@tanstack/react-query"
import api from "../api/api"
import { queryClient } from "../api/queryClient";

export const useImages = (id?: string) => {
    const { data: images } = useQuery<Image[]>({
        queryKey: ['images', id],
        queryFn: async () => {
            const response = await api.get<Image[]>(`/images/${id}`);
            return response.data;
        },
        enabled: !!id
    });

    const uploadImage = useMutation({
        mutationFn: async (file: Blob) => {
            const formData = new FormData();
            formData.append('file', file);
            const response = await api.post(`/images/upload/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['images', id]
            });
        }
    });

    return {
        images,
        uploadImage
    }
}