import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../services/auth";
import LoadingSpinner from "../components/LoadingSpinner";
const ProtectedRouteHead = () => {
  const { roleUser, isLoading } = useUser();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (roleUser !== "ROLE_DIRECTOR") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRouteHead;