import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../services/auth";

const ProtectedRouteMechanic = () => {
  const { roleUser } = useUser();

  if (roleUser !== "Mechanic") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRouteMechanic;