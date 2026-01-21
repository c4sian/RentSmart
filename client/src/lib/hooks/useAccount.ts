import { useMutation, useQuery } from "@tanstack/react-query"
import type { RegisterSchema } from "../schemas/registerSchema";
import api from "../api/api";
import { useNavigate } from "react-router";
import type { LoginSchema } from "../schemas/loginSchema";
import { queryClient } from "../api/queryClient";
import { toast } from "react-toastify";

export const useAccount = () => {
    const navigate = useNavigate();

    const { data: user, isLoading: loadingUserAccount } = useQuery<LoginResponse>({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await api.post('/auth/refresh-token', {}, {
                withCredentials: true
            });
            return response.data;
        },
        retry: false,
        staleTime: Infinity
    });

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await api.post('/auth/register', creds);
        },
        onSuccess: () => {
            toast.success("Register successful. Now you can sign in.")
            navigate('/login');
        }
    });

    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema): Promise<LoginResponse> => {
            const response = await api.post('/auth/login', creds, {
                withCredentials: true
            });
            return response.data;
        },
        onSuccess: (userData) => {
            queryClient.setQueryData(['user'], userData);
            toast.success("Login successful.");
            navigate('/');
        }
    });

    const logoutUser = useMutation({
        mutationFn: async () => {
            await api.post('/auth/logout', {}, {
                withCredentials: true
            });
        },
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['user'] });
            navigate('/');
        }
    });

    return {
        registerUser,
        loginUser,
        logoutUser,
        user,
        loadingUserAccount
    }
}