import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./pages/AuthPage/LoginPage";

import SuperAdminMainPage from "./pages/SuperAdminPages/MainPage/MainPage";
import SuperAdminArchivePage from "./pages/SuperAdminPages/ArchivePage/ArchivePage";
import SuperAdminReportsPage from "./pages/SuperAdminPages/ReportsPage/ReportsPage";
import TransportsPage from "./pages/SuperAdminPages/TransportsPage/TransportsPage";
import OrganizationsPage from "./pages/SuperAdminPages/OrganizationsPage/OrganizationsPage";
import CreateTransportPage from "./pages/SuperAdminPages/TransportsPage/CreateTransportPage/CreateTransportPage";


import EditTransportPage from "./pages/SuperAdminPages/TransportsPage/EditTransportPage/EditTransportPage";

import HeadMainPage from "./pages/HeadPages/MainPage/MainPage"
import HeadReportsPage from "./pages/HeadPages/ReportsPage/ReportsPage"
import HeadEmployessPage from "./pages/HeadPages/EmployessPage/EmployessPage"
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
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.token) {
      setToken(user.token);
      setIsAuthenticated(true);
      setRole(user.role);
    }

  }, []);

  const logout = () => {
    navigate("/");
    setToken(null);
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem("user");
    localStorage.removeItem("activeTab");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, role, logout }}>
      {token && location.pathname !== '/' && location.pathname !== '/not-found' && <Header />}
      {token && location.pathname !== '/' ? (
        location.pathname !== '/not-found' ? (
          <div style={{ display: 'flex', width: '100%' }}>
            <Navbar />
            <Routes>
              <Route element={<ProtectedRouteAdmin />}>
                <Route path="/admin/main" element={<SuperAdminMainPage />} />
                <Route path="/admin/reports" element={<SuperAdminReportsPage />} />
                <Route path="archive" element={<SuperAdminArchivePage />} />
                <Route path="parameters" element={<SuperAdminCarTracking />} />
                <Route path="/admin/transports" element={<TransportsPage />} />
              </Route>
              <Route element={<ProtectedRouteSuperAdmin />}>
                <Route path="/super-admin/main" element={<SuperAdminMainPage />} />
                <Route path="/super-admin/reports" element={<SuperAdminReportsPage />} />
                <Route path="/super-admin/archive" element={<SuperAdminArchivePage />} />
                <Route path="/super-admin/parameters" element={<SuperAdminCarTracking />} />
                <Route path="/super-admin/organizations" element={<OrganizationsPage />} />
                <Route path="/super-admin/transports" element={<TransportsPage />} />
                <Route path="/super-admin/transport/edit/:id" element={<EditTransportPage />} />
                <Route path="/super-admin/transport/new-car" element={<CreateTransportPage />} />
                <Route path="/super-admin/organization" element={<OrganizationDetails />} />
                <Route path="/super-admin/new-organization" element={<CreateOrganizationPage />} />
                <Route path="/super-admin/transport" element={<TransportDashboard />} />
                <Route path="/super-admin/employees" element={<EmployeesPage />} />
              </Route>
              <Route element={<ProtectedRouteHead />}>
                <Route path="/director/main" element={<HeadMainPage />} />
                <Route path="/director/reports" element={<HeadReportsPage/>} />
                <Route path="/director/employees" element={<HeadEmployessPage/>} />
                {/* <Route path="/head/parameters" element={<HeadCarTracking/>} /> */}
                <Route path="/director/transports" element={<HeadTransportsPage />} />
              </Route>

              {/* <Route element={<ProtectedRouteOperator />}>
                <Route path="/super-admin/main" element={<SuperAdminMainPage />} />
                <Route path="/super-admin/reports" element={<SuperAdminReportsPage />} />
                <Route path="/super-admin/archive" element={<SuperAdminArchivePage />} />
                <Route path="/super-admin/parameters" element={<SuperAdminCarTracking />} />
                <Route path="/super-admin/transports" element={< TransportsPage />} />
                <Route path="/super-admin/edit-profile" element={<SuperAdminArchivePage />} />
              </Route>

              <Route element={<ProtectedRouteManager />}>
                <Route path="/super-admin/main" element={<SuperAdminMainPage />} />
                <Route path="/super-admin/reports" element={<SuperAdminReportsPage />} />
                <Route path="/super-admin/archive" element={<SuperAdminArchivePage />} />
                <Route path="/super-admin/parameters" element={<SuperAdminCarTracking />} />
                <Route path="/super-admin/transports" element={< TransportsPage />} />
                <Route path="/super-admin/edit-profile" element={<TransportsPage />} />
              </Route>
              <Route element={<ProtectedRouteMechanic />}>
                <Route path="/super-admin/main" element={<SuperAdminMainPage />} />
                <Route path="/super-admin/reports" element={<SuperAdminReportsPage />} />
                <Route path="/super-admin/archive" element={<SuperAdminArchivePage />} />
                <Route path="/super-admin/parameters" element={<SuperAdminCarTracking />} />
                <Route path="/super-admin/transports" element={< TransportsPage />} />
                <Route path="/super-admin/edit-profile" element={<TransportsPage />} />
              </Route> */}
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route path="/not-found" element={<NotFound />} />
          </Routes>
        )
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </AuthContext.Provider>
  );
};

export default App;
