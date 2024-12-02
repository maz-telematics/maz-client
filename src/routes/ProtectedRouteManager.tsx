import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../services/auth";
import LoadingSpinner from "../components/LoadingSpinner";
const ProtectedRouteManager = () => {
  const { roleUser, isLoading } = useUser();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (roleUser !== "ROLE_MANAGER") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRouteManager;