import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../services/auth";

const ProtectedRouteOperator = () => {
  const { roleUser } = useUser();

  if (roleUser !== "Operator") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRouteOperator;