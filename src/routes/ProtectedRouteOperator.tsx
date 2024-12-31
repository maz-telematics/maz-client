import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../services/auth";
import LoadingSpinner from "../Components/LoadingSpinner";
const ProtectedRouteOperator = () => {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (user?.role !== "ROLE_OPERATOR") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRouteOperator;