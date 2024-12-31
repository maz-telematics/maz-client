import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../services/auth";
import LoadingSpinner from "../Components/LoadingSpinner";

const SuperAdminRoutes = () => {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (user?.role !== "ROLE_SUPERADMIN") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default SuperAdminRoutes;