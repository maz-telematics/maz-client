import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../services/auth";
import LoadingSpinner from "../Components/LoadingSpinner";
const ProtectedRouteManager = () => {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (user?.role !== "ROLE_MANAGER") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRouteManager;