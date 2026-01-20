import axios from "axios";
import { queryClient } from "./queryClient";
import { router } from "../../app/router/Routes";
import { toast } from "react-toastify";

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    });
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(config => {
    const user = queryClient.getQueryData<LoginResponse>(['user']);

    if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
    }

    return config;
});

let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
    refreshQueue.forEach(cb => cb(token));
    refreshQueue = [];
}

api.interceptors.response.use(
    async (response) => {
        await sleep(1000);
        return response;
    },
    async (error) => {
        const { config, response: { status, data } } = error;

        if (status !== 401 || config._retry) {
            switch (status) {
                case 400:
                    if (data.errors) {
                        const modalStateErrors = [];
                        for (const key in data.errors) {
                            if (data.errors[key]) {
                                modalStateErrors.push(data.errors[key]);
                            }
                        }
                        throw modalStateErrors.flat();
                    } else {
                        if (data !== "Refresh token is invalid.") {
                            toast.error(data);
                        }
                    }
                    break;
                case 404:
                    router.navigate('/not-found');
                    break;
                case 500:
                    router.navigate('/server-error', { state: { error: data } })
                    break;
                default:
                    break;
            }

            return Promise.reject(error);
        }

        config._retry = true;

        if (isRefreshing) {
            return new Promise(resolve => {
                refreshQueue.push((token: string) => {
                    config.headers["Authorization"] = `Bearer ${token}`;
                    resolve(api(config));
                });
            });
        }

        isRefreshing = true;

        try {
            const refreshResponse = await api.post('/auth/refresh-token', {}, {
                withCredentials: true
            });
            const newAccessToken = refreshResponse.data.accessToken;

            isRefreshing = false;

            queryClient.setQueryData(['user'], refreshResponse.data);

            onRefreshed(newAccessToken);

            config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return api(config);
        }
        catch (err) {
            console.log("Refresh token failed.", err);
            isRefreshing = false;
            refreshQueue = [];

            queryClient.removeQueries({ queryKey: ['user'] });
            // window.location.href = '/login';

            return Promise.reject(err);
        }
    }
);

export default api;