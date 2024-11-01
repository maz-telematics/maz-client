import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../services/auth";

const ProtectedRouteMechanic = () => {
  const { roleUser } = useUser();

  if (roleUser !== "ROLE_MANUFACTURER") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRouteMechanic;