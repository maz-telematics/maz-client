import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../services/auth";
import LoadingSpinner from "../Components/LoadingSpinner";
const ProtectedRouteMechanic = () => {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (user?.role !== "ROLE_MANUFACTURER") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRouteMechanic;