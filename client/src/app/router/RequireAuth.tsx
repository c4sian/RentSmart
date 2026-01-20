import { Navigate, Outlet, useLocation } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount"

export default function RequireAuth() {
    const { user } = useAccount();
    const location = useLocation();

    if (!user) return <Navigate to='/login' state={{ from: location }} />

    return (
        <Outlet />
    )
}