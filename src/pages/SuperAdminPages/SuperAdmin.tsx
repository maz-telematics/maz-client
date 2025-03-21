import { useEffect } from "react";

import PageWrapper from "../../Components/PageLayout/PageWrapper/PageWrapper";
import SuperAdminMainPage from "../../pages/SuperAdminPages/MainPage/MainPage";
import SuperAdminArchivePage from "../../pages/SuperAdminPages/ArchivePage/ArchivePage";
import SuperAdminReportsPage from "../../pages/SuperAdminPages/ReportsPage/ReportsPage";
import SuperAdminTransportsPage from "./TransportsPage/TransportsPage";

import { showSuperAdminArchive, showSuperAdminCreateOrganization, showSuperAdminCreateTransport, showSuperAdminEditTransport, showSuperAdminEmpoyess, showSuperAdminFirmwares, showSuperAdminFirmware, showSuperAdminMain, showSuperAdminOrganization, showSuperAdminOrganizations, showSuperAdminProfile, showSuperAdminReports, showSuperAdminTransport, showSuperAdminTransports,showSuperAdminLogs, showSuperAdminChangeLogs } from "../../Store/utils/superAdminModuleViewSlice";
import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../Store/store";
import TransportDashboard from "../shared/TransportDashboard/TransportDashboard";
import EditTransportPage from "./TransportsPage/EditTransportPage/EditTransportPage";
import CreateOrganization from "./OrganizationsPage/CreateOrganizationPage/CreateOrganizationPage";
import OrganizationDetails from "./OrganizationsPage/Organization";
import CreateTransportPage from "./TransportsPage/CreateTransportPage/CreateTransportPage";
import ProfilePage from "../shared/EditProfilePage/ProfilePage";
import FirmwarePage from "./Firmware/Firmware";
import FirmwareDetailsPage from "./Firmware/FirmwareDetails";
import SuperAdminOrganizationsPage from "../../pages/SuperAdminPages/OrganizationsPage/OrganizationsPage";
import SuperAdminEmployeesPage from "../../pages/SuperAdminPages/EmployeesPage/EmployeesPage";
import LogsPage from "../../components/LogsComponents/Logs"
import ChangeLogsPage from "./ChangeLogsPage/ChangeLogsPage";
export default function SuperAdmin() {
  const view = useSelector((state: RootState) => state.superAdminView.view);
  const { urlView } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (urlView === "main") {
      dispatch(showSuperAdminMain());
    }
    if (urlView === "transports") {
      dispatch(showSuperAdminTransports());
    }
    if (urlView === "organizations") {
      dispatch(showSuperAdminOrganizations());
    }
    if (urlView === "employees") {
      dispatch(showSuperAdminEmpoyess());
    }
    if (urlView === "reports") {
      dispatch(showSuperAdminReports());
    }
    if ((urlView === "archive")) {
      dispatch(showSuperAdminArchive());
    }
    if ((urlView === "transport")) {
      dispatch(showSuperAdminTransport());
    }
    if ((urlView === "edit-transport")) {
      dispatch(showSuperAdminEditTransport());
    }
    if ((urlView === "create-organization")) {
      dispatch(showSuperAdminCreateOrganization());
    }
    if ((urlView === "organization")) {
      dispatch(showSuperAdminOrganization());
    }
    if ((urlView === "create-transport")) {
      dispatch(showSuperAdminCreateTransport());
    }
    if ((urlView === "profile")) {
      dispatch(showSuperAdminProfile());
    }
    if ((urlView === "firmwares")) {
      dispatch(showSuperAdminFirmwares());
    }
    if ((urlView === "firmware")) {
      dispatch(showSuperAdminFirmware());
    }
    if ((urlView === "change-logs")) {
      dispatch(showSuperAdminChangeLogs());
    }
    if ((urlView === "logs")) { 
      dispatch(showSuperAdminLogs());
    }
  }, [urlView, dispatch]);

{/* <Route path="/master/logs" element={<Logs />}/> */}

  const switchPageView = () => {
    switch (view) {
      case "main":
        return <SuperAdminMainPage />;
      case "transports":
        return <SuperAdminTransportsPage />;
      case "organizations":
        return <SuperAdminOrganizationsPage />;
      case "employees":
        return <SuperAdminEmployeesPage />;
      case "reports":
        return <SuperAdminReportsPage />;
      case "archive":
        return <SuperAdminArchivePage />;
      case "transport":
        return <TransportDashboard />
      case "edit-transport":
        return <EditTransportPage />
      case "create-organization":
        return <CreateOrganization />
      case "organization":
        return <OrganizationDetails />
      case "create-transport":
        return <CreateTransportPage />
      case "profile":
        return <ProfilePage />
      case "firmwares":
        return <FirmwarePage />
      case "firmware":
        return <FirmwareDetailsPage />
      case "change-logs":
        return <ChangeLogsPage />
      case "logs": // Добавляем отображение LogsPage
        return <LogsPage />;
    }

  };
  return (
    <PageWrapper menu>
      <Typography.Title level={1}>{switchPageView()}</Typography.Title>
    </PageWrapper>
  );
}
