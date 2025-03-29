import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AppBar, Toolbar, createTheme, ThemeProvider, Typography, Box } from "@mui/material";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar"; 
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./pages/Home";
import Unauthorized from "./components/Unauthorized";
import LearningAndDevelopment from "./pages/LearningAndDevelopment";
import AllIcons from "./components/Page";
import SettingsForm from "./SettingsForm";
import ChildrenInfo from "./pages/ChildrenInfo";
import VoluntaryWork from "./pages/Voluntary";
import Eligibility from "./pages/Eligibility";
import College from "./pages/College";
import Vocational from "./pages/Vocational";
import PDSFileSelector from "./pages/PDSfile";
import WorkExperience from "./pages/WorkExperience";
import OtherSkills from "./pages/OtheSkills";
import PersonalTable from "./pages/PersonTable";
import ViewAttendanceRecord from "./components/ViewAttendanceRecord";
import DailyTimeRecord from "./components/DailyTimeRecord";
import DailyTimeRecordFaculty from "./components/DailyTimeRecordFaculty";
import AttendanceForm from "./components/AllAttendanceRecord";
import AttendanceSearch from "./components/ViewAttendance";
import AttendanceModule from "./components/AttendanceModule";
import AttendanceModuleFaculty from "./components/AttendanceModuleFaculty";
import AttendanceModuleFaculty40 from "./components/AttendanceModuleFaculty40hrs";
import OverallAttendancePage from "./components/OverallAttendance";
import PDS1 from "./components/PDS1";
import PDS2 from "./components/PDS2";
import PDS3 from "./components/PDS3";
import PDS4 from "./components/PDS4";
import OfficialTimeForm from "./components/OfficialTimeForm";
import PayrollTable from "./components/PayrollTable";
import Remittances from "./components/Remittances";
import ItemTable from "./components/ItemTable";
import SalaryGradeTable from "./components/SalaryGradeTable";
import SalaryGradeStatusTable from "./components/SalaryGradeStatusTable";
import DepartmentTable from "./components/DepartmentTable";
import DepartmentAssignment from "./components/DepartmentAssignment";
import HolidaySuspension from "./components/HolidaySuspension";
import Leave from "./components/Leave";
import LeaveAssignment from "./components/LeaveAssignment";

const drawerWidth = 280;

function App() {
  const [settings, setSettings] = useState({});
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const location = useLocation(); 

  const handleClick = () => setOpen(!open);
  const handleClickAttendance = () => setOpen2(!open2);
  const handleClickPayroll = () => setOpen3(!open3);

  const fetchSettings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/settings");
      setSettings(response.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <ThemeProvider theme={createTheme({ typography: { fontFamily: "Poppins, sans-serif" } })}>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "hidden" }}>
        
        <AppBar position="fixed" sx={{ zIndex: 1201, bgcolor: settings.header_color || "primary" }}>
          <Toolbar>
            {settings.logo_url && (
              <img src={`http://localhost:5000${settings.logo_url}`} alt="Logo" style={{ height: "50px", marginRight: "20px" }} />
            )}
            <Typography variant="h6" noWrap>
              {settings.company_name || "Organization Name"}
            </Typography>
          </Toolbar>
        </AppBar>

        {!["/", "/login", "/Register"].includes(location.pathname) && (
          <Sidebar open={open} handleClick={handleClick} open2={open2} handleClickAttendance={handleClickAttendance}  open3={open3} handleClickPayroll={handleClickPayroll}/>
        )}

          {/* Main Content */}
          <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, marginLeft: `${drawerWidth}px` }}>
            <Toolbar />
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Login />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/allicons" element={<AllIcons />} />
              <Route
                path="/childreninfo"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <ChildrenInfo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/voluntarywork"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <VoluntaryWork />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/learningdev"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <LearningAndDevelopment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/eligibility"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <Eligibility />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/college"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <College />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vocational"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <Vocational />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/workexperience"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <WorkExperience />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/personalinfo"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <PersonalTable />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/otherskills"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <OtherSkills />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <SettingsForm onUpdate={fetchSettings} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/view_attendance"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <ViewAttendanceRecord />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search_attendance"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <AttendanceSearch />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/daily_time_record"
                element={
                  <ProtectedRoute allowedRoles={["staff","administrator", "superadmin"]}>
                    <DailyTimeRecord />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/daily_time_record_faculty"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <DailyTimeRecordFaculty />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/attendance_form"
                element={
                  <ProtectedRoute allowedRoles={["staff","administrator", "superadmin"]}>
                    <AttendanceForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/attendance_module"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <AttendanceModule />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/attendance_module_faculty"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <AttendanceModuleFaculty />
                  </ProtectedRoute>
                }
              />

<Route
                path="/attendance_module_faculty_40hrs"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <AttendanceModuleFaculty40 />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/attendance_summary"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <OverallAttendancePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/official_time"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <OfficialTimeForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pdsfile"
                element={
                  <ProtectedRoute allowedRoles={["staff", "administrator", "superadmin"]}>
                    <PDSFileSelector />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pds1"
                element={
                  <ProtectedRoute allowedRoles={["staff", "administrator", "superadmin"]}>
                    <PDS1 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pds2"
                element={
                  <ProtectedRoute allowedRoles={["staff", "administrator", "superadmin"]}>
                    <PDS2 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pds3"
                element={
                  <ProtectedRoute allowedRoles={["staff", "administrator", "superadmin"]}>
                    <PDS3 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pds4"
                element={
                  <ProtectedRoute allowedRoles={["staff", "administrator", "superadmin"]}>
                    <PDS4 />
                  </ProtectedRoute>
                }
              />

               <Route
                path="/payroll-table"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <PayrollTable />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/remittance-table"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <Remittances />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/item-table"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <ItemTable />
                  </ProtectedRoute>
                }
              />

               <Route
                path="/salary-grade"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <SalaryGradeTable />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/salary-grade-status"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <SalaryGradeStatusTable />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/department-table"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <DepartmentTable />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/department-assignment"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <DepartmentAssignment />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/leave-table"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <Leave />
                  </ProtectedRoute>
                }
              />

               <Route
                path="/leave-assignment"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <LeaveAssignment />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/holiday-suspension"
                element={
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
                    <HolidaySuspension />
                  </ProtectedRoute>
                }
              />



              <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
          </Box>

          {/* Footer */}
          <Box
            component="footer"
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              bgcolor: settings.footer_color || "#ffffff",
              color: "white",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <Typography variant="body1">{settings.footer_text || "Default Footer Text"}</Typography>
          </Box>
        </Box>
    </ThemeProvider>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
