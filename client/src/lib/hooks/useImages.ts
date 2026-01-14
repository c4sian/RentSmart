import { useMutation, useQuery } from "@tanstack/react-query"
import api from "../api/api"
import { queryClient } from "../api/queryClient";

export const useImages = (id?: string) => {
    const { data: gettedImages } = useQuery<Image[]>({
        queryKey: ['images', id],
        queryFn: async () => {
            const response = await api.get<Image[]>(`/images/${id}`);
            return response.data;
        },
        initialData: [],
        // enabled: !!id
    });

    const uploadImage = useMutation({
        mutationFn: async (file: Blob) => {
            const formData = new FormData();
            formData.append('file', file);
            const response = await api.post(`/images/upload/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['images', id]
            });
        }
    });

    const reorderImages = useMutation({
        mutationFn: async (images: Image[]) => {
            const response = await api.post(`/images/reorder/${id}`, images);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['images', id]
            });
        }
    })

    return {
        gettedImages,
        uploadImage,
        reorderImages
    }
}