import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import AccommodationsView from "../../features/accommodations/searchList/AccommodationsView";
import AccommodationForm from "../../features/accommodations/form/AccommodationForm";
import HomePage from "../../features/home/HomePage";
import AccommodationPage from "../../features/accommodations/details/AccommodationPage";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import AccommodationImages from "../../features/accommodations/imagesManager/AccommodationImages";
import ProfilePage from "../../features/profiles/ProfilePage";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <RequireAuth />, children: [
                    { path: 'create-accommodation', element: <AccommodationForm /> },
                    { path: 'accommodation-images/:id', element: <AccommodationImages /> },
                    { path: 'my-profile', element: <ProfilePage /> },
                ]
            },
            { path: '', element: <HomePage /> },
            { path: 'accommodations', element: <AccommodationsView /> },
            { path: 'accommodations/:id', element: <AccommodationPage /> },
            { path: 'register', element: <RegisterForm /> },
            { path: 'login', element: <LoginForm /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
        ]
    }
])