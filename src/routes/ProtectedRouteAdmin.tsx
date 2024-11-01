import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../services/auth";

const ProtectedRouteAdmin = () => {
  const { roleUser } = useUser();

  if (roleUser !== "ROLE_ADMIN") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRouteAdmin;