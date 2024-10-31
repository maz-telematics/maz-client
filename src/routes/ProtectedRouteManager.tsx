import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../services/auth";

const ProtectedRouteManager = () => {
  const { roleUser } = useUser();

  if (roleUser !== "Manager") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRouteManager;