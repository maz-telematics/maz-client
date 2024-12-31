import { useEffect } from "react";

import PageWrapper from "../../Components/PageLayout/PageWrapper/PageWrapper";
import SuperAdminMainPage from "../../pages/SuperAdminPages/MainPage/MainPage";
import SuperAdminArchivePage from "../../pages/SuperAdminPages/ArchivePage/ArchivePage";
import SuperAdminReportsPage from "../../pages/SuperAdminPages/ReportsPage/ReportsPage";
import TransportsPage from "../../pages/SuperAdminPages/TransportsPage/TransportsPage";
import OrganizationsPage from "../../pages/SuperAdminPages/OrganizationsPage/OrganizationsPage";
import EmployeesPage from "../../pages/SuperAdminPages/EmployeesPage/EmployeesPage";

import { showSuperAdminArchive, showSuperAdminCreateOrganization, showSuperAdminCreateTransport, showSuperAdminEditTransport, showSuperAdminEmpoyess, showSuperAdminMain, showSuperAdminOrganization, showSuperAdminOrganizations, showSuperAdminProfile, showSuperAdminReports, showSuperAdminTransport, showSuperAdminTransports } from "../../Store/utils/superAdminModuleViewSlice";
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

export default function SuperAdmin() {
  const view = useSelector((state: RootState) => state.superAdminView.view);
  const { urlView} = useParams();
console.log("view",view)
console.log("urlView",urlView)
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
    if((urlView === "archive")) {
      dispatch(showSuperAdminArchive());
    }
    if((urlView === "transport")) {
      dispatch(showSuperAdminTransport());
    }
    if((urlView === "edit-transport")) {
      dispatch(showSuperAdminEditTransport());
    }
    if((urlView === "create-organization")) {
      dispatch(showSuperAdminCreateOrganization());
    }
    if((urlView === "organization")) {
      dispatch(showSuperAdminOrganization());
    }
    if((urlView === "create-transport")) {
      dispatch(showSuperAdminCreateTransport());
    }
    if((urlView === "profile")) {
      dispatch(showSuperAdminProfile());
    }
  }, [urlView, dispatch]);

  const switchPageView = () => {
    switch (view) {
      case "main":
        return <SuperAdminMainPage />;
      case "transports":
        return <TransportsPage />;
      case "organizations":
        return <OrganizationsPage />;
      case "employees":
        return <EmployeesPage />;
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
          return <OrganizationDetails/>
      case "create-transport":
          return <CreateTransportPage/>
      case "profile":
          return <ProfilePage/>
    }
  };
  return (
    <PageWrapper menu>
      <Typography.Title level={1}>{switchPageView()}</Typography.Title>
    </PageWrapper>
  );
}
