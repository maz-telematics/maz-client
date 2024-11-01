import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../services/auth";

const ProtectedRouteOperator = () => {
  const { roleUser } = useUser();

  if (roleUser !== "ROLE_OPERATOR") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRouteOperator;