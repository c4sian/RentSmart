import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import AccommodationsView from "../../features/accommodations/dashboard/AccommodationsView";
import AccommodationForm from "../../features/accommodations/form/AccommodationForm";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'accommodations', element: <AccommodationsView /> },
            { path: 'createAccommodation', element: <AccommodationForm /> },
        ]
    }
])