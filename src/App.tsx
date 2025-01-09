import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./pages/AuthPage/LoginPage";
import EditProfile from "./pages/shared/EditProfilePage/ProfilePage";
import { AuthContext } from "./services/auth";
import NotFound from "./pages/shared/NotFoundPage";
import SuperAdminRoutes from "./routes/SuperAdminRotes";
import SuperAdmin from "./pages/SuperAdminPages/SuperAdmin";

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
      {token && location.pathname !== '/' ? (
        location.pathname !== '/not-found' ? (
          <div
            style={{
              display: "grid",
              gridTemplateRows: "auto 2fr auto",
              gridTemplateColumns: "auto 3fr",
              height: "100vh",
              gridTemplateAreas: `
                "header header"
                "navbar main"
              `,
            }}
          >
  
            <div style={{ gridArea: "main", overflow: "auto" }}>
              <Routes>
              <Route element={<SuperAdminRoutes />}>
              <Route path="/master" element={<SuperAdmin />}>
                <Route path="/master/:urlView" element={<SuperAdmin/>} />
              </Route>
            </Route>
                {/* <Route element={<ProtectedRouteSuperAdmin />}>
                  <Route path="/super-admin/main" element={<SuperAdminMainPage />} />
                  <Route path="/super-admin/reports" element={<SuperAdminReportsPage />} />
                  <Route path="/super-admin/archive" element={<SuperAdminArchivePage />} />
                  <Route path="/super-admin/parameters" element={<SuperAdminCarTracking />} />
                  <Route path="/super-admin/organizations" element={<OrganizationsPage />} />
                  <Route path="/super-admin/transports" element={<TransportsPage />} />
                  <Route path="/super-admin/transport/edit-car" element={<EditTransportPage />} />
                  <Route path="/super-admin/transport/new-car" element={<CreateTransportPage />} />
                  <Route path="/super-admin/organization" element={<OrganizationDetails />} />
                  <Route path="/super-admin/new-organization" element={<CreateOrganizationPage />} />
                  <Route path="/super-admin/transport" element={<TransportDashboard />} />
                  <Route path="/super-admin/employees" element={<EmployeesPage />} />
                </Route> */}
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="*" element={<Navigate to="/not-found" replace />} />
              </Routes>
            </div>
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

