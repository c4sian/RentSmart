import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import AccommodationsView from "../../features/accommodations/dashboard/AccommodationsView";
import AccommodationForm from "../../features/accommodations/form/AccommodationForm";
import HomePage from "../../features/home/HomePage";
import AccommodationPage from "../../features/accommodations/details/AccommodationPage";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import AccommodationImages from "../../features/accommodations/imagesManager/AccommodationImages";
import ProfilePage from "../../features/profiles/ProfilePage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'accommodations', element: <AccommodationsView /> },
            { path: 'accommodations/:id', element: <AccommodationPage /> },
            { path: 'createAccommodation', element: <AccommodationForm /> },
            { path: 'accommodationImages/:id', element: <AccommodationImages /> },
            { path: 'profile/:id', element: <ProfilePage /> },
            { path: 'login', element: <LoginForm /> },
            { path: 'register', element: <RegisterForm /> },
        ]
    }
])