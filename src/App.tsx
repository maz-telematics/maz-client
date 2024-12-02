import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/AuthPage/LoginPage";

import SuperAdminMainPage from "./pages/SuperAdminPages/MainPage/MainPage";
import SuperAdminArchivePage from "./pages/SuperAdminPages/ArchivePage/ArchivePage";
import SuperAdminReportsPage from "./pages/SuperAdminPages/ReportsPage/ReportsPage";
import TransportsPage from "./pages/SuperAdminPages/TransportsPage/TransportsPage";
import OrganizationsPage from "./pages/SuperAdminPages/OrganizationsPage/OrganizationsPage";
import CreateTransportPage from "./pages/SuperAdminPages/TransportsPage/CreateTransportPage/CreateTransportPage";


import EditTransportPage from "./pages/SuperAdminPages/TransportsPage/EditTransportPage/EditTransportPage";
import HeadTransportsPage from "./pages/HeadPages/TransportsPage/TransportsPage";
import EditProfile from "./pages/shared/EditProfilePage/EditProfilePage";
import SuperAdminCarTracking from "./pages/shared/TransportDashboard/TransportDashboard";
import { AuthContext } from "./services/auth";
import NotFound from "./pages/shared/NotFoundPage";
import OrganizationDetails from "./pages/SuperAdminPages/OrganizationsPage/Organization";
import CreateOrganizationPage from './pages/SuperAdminPages/OrganizationsPage/CreateOrganizationPage/CreateOrganizationPage';
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header";
import ProtectedRouteSuperAdmin from "./routes/ProtectedRouteSuperAdmin";
import ProtectedRouteAdmin from "./routes/ProtectedRouteAdmin";
import ProtectedRouteOperator from "./routes/ProtectedRouteOperator";
import ProtectedRouteHead from "./routes/ProtectedRouteHead";
import ProtectedRouteManager from "./routes/ProtectedRouteManager";
import ProtectedRouteMechanic from "./routes/ProtectedRouteMechanic";
import TransportDashboard from "./pages/shared/TransportDashboard/TransportDashboard";
import EmployeesPage from "./pages/SuperAdminPages/EmployeesPage/EmployeesPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.token) {
      setToken(user.token);
      setIsAuthenticated(true);
      setRole(user.role);
    }

  }, []);

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem("user");
    localStorage.removeItem("activeTab");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, role, logout }}>
      {token && location.pathname !== '/' && <Header />}

      {token
       && location.pathname !== '/' 
       ?
        (
        <div style={{ display: 'flex', width: '100%' }}>
          <Navbar />
          <Routes>
            <Route element={<ProtectedRouteAdmin />}>
              <Route path="/admin/main" element={<SuperAdminMainPage />} />
              <Route path="/admin/reports" element={<SuperAdminReportsPage />} />
              <Route path="archive" element={<SuperAdminArchivePage />} />
              <Route path="parameters" element={<SuperAdminCarTracking />} />
              <Route path="/admin/transports" element={< TransportsPage />} />
            </Route>
            <Route element={<ProtectedRouteSuperAdmin />}>
              <Route path="/super-admin/main" element={<SuperAdminMainPage />} />
              <Route path="/super-admin/reports" element={<SuperAdminReportsPage />} />
              <Route path="/super-admin/archive" element={<SuperAdminArchivePage />} />
              <Route path="/super-admin/parameters" element={<SuperAdminCarTracking />} />
              <Route path="/super-admin/organizations" element={< OrganizationsPage />} />
              <Route path="/super-admin/transports" element={< TransportsPage />} />
              <Route path="/super-admin/transport/edit/:id" element={<EditTransportPage />} />
              <Route path="/super-admin/transport/new-car" element={<CreateTransportPage />} />
              <Route path="/super-admin/organization" element={<OrganizationDetails />} />
              <Route path="/super-admin/new-organization" element={<CreateOrganizationPage />} />
              <Route path="/super-admin/transport" element={<TransportDashboard />} />
              <Route path="/super-admin/employees" element={<EmployeesPage />} />
            </Route>
            <Route element={<ProtectedRouteHead />}>
            <Route path="/head/main" element={<SuperAdminMainPage />} />
            <Route path="/head/reports" element={<SuperAdminReportsPage />} />
            <Route path="/head/archive" element={<SuperAdminArchivePage />} /> 
            <Route path="/head/parameters" element={<SuperAdminCarTracking />} />
            <Route path="/head/transports" element={< HeadTransportsPage />} />
  
          </Route>
            {/* <Route element={<ProtectedRouteOperator />}>
            <Route path="/super-admin/main" element={<SuperAdminMainPage />} />
            <Route path="/super-admin/reports" element={<SuperAdminReportsPage />} />
            <Route path="/super-admin/archive" element={<SuperAdminArchivePage />} /> 
            <Route path="/super-admin/parameters" element={<SuperAdminCarTracking />} />
            <Route path="/super-admin/transports" element={< TransportList />} />
            <Route path="/super-admin/edit-profile" element={<SuperAdminEditProfile />} />
          </Route>
        
          <Route element={<ProtectedRouteManager />}>
            <Route path="/super-admin/main" element={<SuperAdminMainPage />} />
            <Route path="/super-admin/reports" element={<SuperAdminReportsPage />} />
            <Route path="/super-admin/archive" element={<SuperAdminArchivePage />} /> 
            <Route path="/super-admin/parameters" element={<SuperAdminCarTracking />} />
            <Route path="/super-admin/transports" element={< TransportList />} />
            <Route path="/super-admin/edit-profile" element={<SuperAdminEditProfile />} />
          </Route>
          <Route element={<ProtectedRouteMechanic />}>
            <Route path="/super-admin/main" element={<SuperAdminMainPage />} />
            <Route path="/super-admin/reports" element={<SuperAdminReportsPage />} />
            <Route path="/super-admin/archive" element={<SuperAdminArchivePage />} /> 
            <Route path="/super-admin/parameters" element={<SuperAdminCarTracking />} />
            <Route path="/super-admin/transports" element={< TransportList />} />
            <Route path="/super-admin/edit-profile" element={<SuperAdminEditProfile />} />
          </Route> */}
            {/* <Route element={<ProtectedRoute requiredRoles={["SuperAdmin", "Admin", "Operator", "Head", "Manager", "Mechanic"]} />}>
              <Route path="/dashboard" element={<MainPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/archive" element={<ArchivePage />} /> 
              <Route path="/parameters" element={<CarTracking />} />
              <Route path="/transports" element={<TransportList />} />
              <Route path="/edit-profile" element={<EditProfile />} />
            </Route> */}
            {/* <Route element={<ProtectedRoute requiredRoles={["SuperAdmin"]} />}>
              <Route path="/edit-car" element={<EditCar />} />
              <Route path="/new-car" element={<NewCar />} />
              <Route path="/new-organization" element={<NewOrganization />} />
              <Route path="/organization" element={<OrganizationDetails />} />
            </Route> */}
              <Route path="/edit-profile" element={<EditProfile />} />
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
                setToken={setToken} 
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
