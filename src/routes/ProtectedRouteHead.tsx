import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../services/auth";

const ProtectedRouteHead = () => {
  const { roleUser } = useUser();

  if (roleUser !== "Head") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRouteHead;