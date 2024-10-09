import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/AuthPage/LoginPage";
import EditCar from "./pages/EditCar/EditCar";
import NewCar from "./pages/NewCar/NewCar";
import ManufacturerTransportList from "./pages/Manufacturer/ManufacturerTransportList";
import OrganizationTransportList from "./pages/Organization/OrganizationTransportList";
import EditProfile from "./pages/EditProfilePage/EditProfilePage";
import CarTracking from "./pages/CarTracking/CarTracking";
import { useUser } from "./services/auth";
import { AuthContext } from "./services/auth";
import ProtectedRoute from "./services/auth";
import NotFound from "./pages/NotFoundPage";
import OrganizationDetails from "./pages/Manufacturer/Organization";
import NewOrganization from './pages/NewOrganization/NewOrganization'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setToken((JSON.parse(localStorage.getItem("user") || "{}") || {}).token);
    const tokenFromLocalStorage = localStorage.getItem("user") ?? {
      token: "",
      id: 0,
    };
    if (typeof tokenFromLocalStorage === "string") {
      return;
    } else {
      setToken(tokenFromLocalStorage?.token);
      setIsAuthenticated(true);
    }
  }, []);

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const TransportList = () => {
    const { roleUser } = useUser();
    return roleUser === "manufacturer" ? (
      <ManufacturerTransportList />
    ) : (
      <OrganizationTransportList />
    );
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, role, logout }}>
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              setRole={setRole}
              setToken={setRole}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          element={
            <ProtectedRoute requiredRoles={["manufacturer", "organization"]} />
          }
        >
          <Route path="/parameters" element={<CarTracking />} />
          <Route path="/transports" element={<TransportList />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
        <Route element={<ProtectedRoute requiredRoles={["manufacturer"]} />}>
          <Route path="/edit-car" element={<EditCar />} />
          <Route path="/new-car" element={<NewCar />} />
          <Route path="/new-organization" element={<NewOrganization />} />
          <Route path="/organization" element={<OrganizationDetails />} />
        </Route>
        <Route
          element={<ProtectedRoute requiredRoles={["organization"]} />}
        ></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
