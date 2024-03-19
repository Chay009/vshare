import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { user } = useAuth();
    const location = useLocation();

    return (
        
        user.userRoles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : user.userAccessToken //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/auth" state={{ from: location }} replace />
    );
}

export default RequireAuth;