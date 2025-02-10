import { useEffect } from "react";
import PageWrapper from "../../Components/PageLayout/PageWrapper/PageWrapper";
import SuperAdminMainPage from "../../pages/SuperAdminPages/MainPage/MainPage";
import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../Store/store";
import TransportDashboard from "../shared/TransportDashboard/TransportDashboard";
import ProfilePage from "../shared/EditProfilePage/ProfilePage";
import { showAdminMain, showAdminTransports, showAdminReports, showAdminArchive, showAdminTransport, showAdminProfile, showAdminEmpoyess } from "../../Store/utils/adminModuleViewSlice";
// import DirectorTransportsPage from "../shared/TransportsPage";
import TransportsPage from "../DirectorPages/TransportsPage/TransportsPage"
import DirectorEmployeesPage from "../shared/EmployeesPage";
import DirectorReportsPage from "../AdminPages/ReportsPage";

export default function Director() {
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
    if (urlView === "employees") {
      dispatch(showAdminEmpoyess());
    }
    if (urlView === "reports") {
      dispatch(showAdminReports());
    }
    if((urlView === "transport")) {
      dispatch(showAdminTransport());
    }
    if((urlView === "profile")) {
      dispatch(showAdminProfile());
    }
  }, [urlView, dispatch]);

  const switchPageView = () => {
    switch (view) {
      case "main":
        return <SuperAdminMainPage />;
      case "transports":
        return 
        <TransportsPage/>
        // <DirectorTransportsPage />;
      case "employees":
        return <DirectorEmployeesPage />;
      case "reports":
        return <DirectorReportsPage />;
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

 