import { useEffect } from "react";

import PageWrapper from "../../Components/PageLayout/PageWrapper/PageWrapper";
import SuperAdminMainPage from "../../pages/SuperAdminPages/MainPage/MainPage";
import SuperAdminReportsPage from "../../pages/SuperAdminPages/ReportsPage/ReportsPage";
import TransportsPage from "../../pages/SuperAdminPages/TransportsPage/TransportsPage";
import EmployeesPage from "../../pages/SuperAdminPages/EmployeesPage/EmployeesPage";

import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../Store/store";
import TransportDashboard from "../shared/TransportDashboard/TransportDashboard";
import ProfilePage from "../shared/EditProfilePage/ProfilePage";
import { showDirectorMain, showDirectorTransports, showDirectorEmpoyess, showDirectorReports, showDirectorTransport, showDirectorProfile } from "../../Store/utils/directorModuleViewSlice";

export default function Director() {
  const view = useSelector((state: RootState) => state.directorView.view);
  const { urlView} = useParams();
  console.log(urlView)
  console.log(view)
  const dispatch = useDispatch();
  useEffect(() => {
    if (urlView === "main") {
        dispatch(showDirectorMain());
      } 
    if (urlView === "transports") {
        dispatch(showDirectorTransports());
      } 
    if (urlView === "employees") {
      dispatch(showDirectorEmpoyess());
    }
    if (urlView === "reports") {
      dispatch(showDirectorReports());
    }
    if((urlView === "transport")) {
      dispatch(showDirectorTransport());
    }
    if((urlView === "profile")) {
      dispatch(showDirectorProfile());
    }
  }, [urlView, dispatch]);

  const switchPageView = () => {
    switch (view) {
      case "main":
        return <SuperAdminMainPage />;
      case "transports":
        return <TransportsPage />;
      case "employees":
        return <EmployeesPage />;
      case "reports":
        return <SuperAdminReportsPage />;
      case "transport":
          return <TransportDashboard />
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
