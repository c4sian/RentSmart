import { Navigate, Outlet, useLocation } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount"
import { Typography } from "@mui/material";

export default function RequireAuth() {
    const { user, loadingUserAccount } = useAccount();
    const location = useLocation();

    if (loadingUserAccount) return <Typography>Loading...</Typography>

    if (!user) return <Navigate to='/login' state={{ from: location }} />

    return (
        <Outlet />
    )
}