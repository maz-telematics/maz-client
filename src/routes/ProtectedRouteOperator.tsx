import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../services/auth";
import LoadingSpinner from "../components/LoadingSpinner";
const ProtectedRouteOperator = () => {
  const { roleUser, isLoading } = useUser();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (roleUser !== "ROLE_OPERATOR") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRouteOperator;