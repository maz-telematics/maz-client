import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../services/auth";

const ProtectedRouteSuperAdmin = () => {
  const { roleUser } = useUser();

  if (roleUser !== "ROLE_SUPERADMIN") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRouteSuperAdmin;