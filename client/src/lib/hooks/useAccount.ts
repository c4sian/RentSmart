import { useMutation, useQuery } from "@tanstack/react-query"
import type { RegisterSchema } from "../schemas/registerSchema";
import api from "../api/api";
import { useNavigate } from "react-router";
import type { LoginSchema } from "../schemas/loginSchema";
import { queryClient } from "../api/queryClient";

export const useAccount = () => {
    const navigate = useNavigate();

    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await api.post('/auth/refresh-token', {}, {
                withCredentials: true
            });
            return response.data;
        },
        enabled: (queryClient.getQueryData(['user']) !== null)
    });

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await api.post('/auth/register', creds);
        },
        onSuccess: () => {
            navigate('/login');
        }
    });

    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema): Promise<LoginResponse> => {
            const response = await api.post('/auth/login', creds, {
                withCredentials: true,
            });
            return response.data;
        },
        onSuccess: (userData) => {
            queryClient.setQueryData(['user'], userData);
            navigate('/accommodations');
        }
    });

    return {
        registerUser,
        loginUser,
        user,
    }
}