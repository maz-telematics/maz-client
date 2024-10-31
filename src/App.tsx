import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom"; 
import LoginPage from "./pages/AuthPage/LoginPage";

import SuperAdminMainPage from "./pages/SuperAdminPages/MainPage/MainPage";
import SuperAdminArchivePage from "./pages/SuperAdminPages/ArchivePage/ArchivePage";
import SuperAdminReportsPage from "./pages/SuperAdminPages/ReportsPage/ReportsPage";

import EditCar from "./pages/EditCar/EditCar";
import NewCar from "./pages/NewCar/NewCar";
import ManufacturerTransportList from "./pages/Manufacturer/ManufacturerTransportList";
import OrganizationTransportList from "./pages/Organization/OrganizationTransportList";
import SuperAdminEditProfile from "./pages/EditProfilePage/EditProfilePage";
import SuperAdminCarTracking from "./pages/CarTracking/CarTracking";
import { useUser } from "./services/auth";
import { AuthContext } from "./services/auth";
import ProtectedRoute from "./services/auth";
import NotFound from "./pages/NotFoundPage";
import OrganizationDetails from "./pages/Manufacturer/Organization";
import NewOrganization from './pages/NewOrganization/NewOrganization';
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header";
import ProtectedRouteSuperAdmin from "./routes/ProtectedRouteSuperAdmin";



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  
  const location = useLocation(); // Получаем текущий путь

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.token) {
      setToken(user.token);
      setIsAuthenticated(true);
      setRole(user.role); // Установите роль пользователя
    }
  }, []);

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const TransportList = () => {
    const { roleUser } = useUser();
    switch (roleUser) {
      case "SuperAdmin":
      case "Admin":
      case "Operator":
        return <ManufacturerTransportList />;
      case "Head":
      case "Manager":
      case "Mechanic":
        return <OrganizationTransportList />;
      default:
        return <div>Unauthorized Access</div>; 
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, role, logout }}>
      {token && location.pathname !== '/' && <Header />}
      
      {token && location.pathname !== '/' ? (
        <div style={{ display: 'flex', width: '100%' }}>
          <Navbar />
          <Routes>
          <Route element={<ProtectedRouteSuperAdmin />}>
            <Route path="/super-admin/main" element={<SuperAdminMainPage />} />
            <Route path="/super-admin/reports" element={<SuperAdminReportsPage />} />
            <Route path="/super-admin/archive" element={<SuperAdminArchivePage />} /> 
            <Route path="/super-admin/parameters" element={<SuperAdminCarTracking />} />
            <Route path="/super-admin/transports" element={< TransportList />} />
            <Route path="/super-admin/edit-profile" element={<SuperAdminEditProfile />} />
          </Route>
            {/* <Route element={<ProtectedRoute requiredRoles={["SuperAdmin", "Admin", "Operator", "Head", "Manager", "Mechanic"]} />}>
              <Route path="/dashboard" element={<MainPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/archive" element={<ArchivePage />} /> 
              <Route path="/parameters" element={<CarTracking />} />
              <Route path="/transports" element={<TransportList />} />
              <Route path="/edit-profile" element={<EditProfile />} />
            </Route> */}
            <Route element={<ProtectedRoute requiredRoles={["SuperAdmin"]} />}>
              <Route path="/edit-car" element={<EditCar />} />
              <Route path="/new-car" element={<NewCar />} />
              <Route path="/new-organization" element={<NewOrganization />} />
              <Route path="/organization" element={<OrganizationDetails />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <LoginPage
                setRole={setRole}
                setToken={setToken} // Исправлено: передаем setToken правильно
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
        </Routes>
      )}
    </AuthContext.Provider>
  );
};

export default App;
