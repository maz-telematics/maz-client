import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../services/auth";

const ProtectedRouteSuperAdmin = () => {
  const { roleUser } = useUser();

  if (roleUser !== "SuperAdmin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRouteSuperAdmin;