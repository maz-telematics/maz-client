import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../services/auth";
import LoadingSpinner from "../components/LoadingSpinner";

const ProtectedRouteSuperAdmin = () => {
  const { roleUser, isLoading } = useUser();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (roleUser !== "ROLE_SUPERADMIN") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRouteSuperAdmin;