import { useEffect } from "react";
import PageWrapper from "../../Components/PageLayout/PageWrapper/PageWrapper";
import SuperAdminMainPage from "../../pages/SuperAdminPages/MainPage/MainPage";
import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../Store/store";
import TransportDashboard from "../shared/TransportDashboard/TransportDashboard";
import OrganizationDetails from "../SuperAdminPages/OrganizationsPage/Organization";
import ProfilePage from "../shared/EditProfilePage/ProfilePage";
import FirmwarePage from "../SuperAdminPages/Firmware/Firmware";
import FirmwareDetailsPage from "../SuperAdminPages/Firmware/FirmwareDetails";
import { showAdminMain, showAdminTransports, showAdminOrganizations, showAdminReports, showAdminArchive, showAdminTransport, showAdminOrganization, showAdminProfile, showAdminFirmwares, showAdminFirmware, showAdminEmpoyess } from "../../Store/utils/adminModuleViewSlice";
import AdminTransportsPage from "./TransportsPage";
import AdminOrganizationsPage from "./OrganizationPage";
import AdminEmployeesPage from "./EmployeesPage";
import AdminArchivePage from "./ArchivePage";
import AdminReportsPage from "./ReportsPage";
import FirmwaresPage from "./FirmwaresPage";

export default function Admin() {
  const view = useSelector((state: RootState) => state.adminView.view);
  const { urlView} = useParams();
  console.log("urlView",urlView)
  console.log("view",view)
  const dispatch = useDispatch();
  useEffect(() => {
    if (urlView === "main") {
        dispatch(showAdminMain());
      } 
    if (urlView === "transports") {
        dispatch(showAdminTransports());
      } 
    if (urlView === "organizations") {
      dispatch(showAdminOrganizations());
    } 
    if (urlView === "employees") {
      dispatch(showAdminEmpoyess());
    }
    if (urlView === "reports") {
      dispatch(showAdminReports());
    }
    if((urlView === "archive")) {
      dispatch(showAdminArchive());
    }
    if((urlView === "transport")) {
      dispatch(showAdminTransport());
    }
    if((urlView === "organization")) {
      dispatch(showAdminOrganization());
    }
    if((urlView === "profile")) {
      dispatch(showAdminProfile());
    }
    if((urlView === "firmwares")) {
      dispatch(showAdminFirmwares());
    }
    if((urlView === "firmware")) {
      dispatch(showAdminFirmware());
    }
  }, [urlView, dispatch]);

  const switchPageView = () => {
    switch (view) {
      case "main":
        return <SuperAdminMainPage />;
      case "transports":
        return <AdminTransportsPage />;
      case "organizations":
        return <AdminOrganizationsPage />;
      case "employees":
        return <AdminEmployeesPage />;
      case "reports":
        return <AdminReportsPage />;
      case "archive":
        return <AdminArchivePage />;
      case "transport":
          return <TransportDashboard />
      case "organization":
          return <OrganizationDetails/>
      case "profile":
          return <ProfilePage/>
      case "firmwares":
          return <FirmwaresPage/>
      case "firmware":
          return <FirmwareDetailsPage />          
    }
  };
  return (
    <PageWrapper menu>
      <Typography.Title level={1}>{switchPageView()}</Typography.Title>
    </PageWrapper>
  );
}
