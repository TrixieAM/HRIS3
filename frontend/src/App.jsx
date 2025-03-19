import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, createTheme, ThemeProvider, Typography, Box, List, ListItem, ListItemText, Drawer, ListItemIcon, Collapse } from "@mui/material";
import { Dashboard as DashboardIcon, Logout as LogoutIcon, Settings as SettingsIcon, ExpandMore, ExpandLess, BadgeRounded, School, House, Streetview, ChildFriendlyRounded, SportsKabaddi, FileCopy } from "@mui/icons-material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute component
import Register from "./components/Register";
import Login from "./components/Login";
import LearningAndDevelopment from "./pages/LearningAndDevelopment";
import Home from "./pages/Home";
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
import AttendanceModuleFaculty40hrs from "./components/AttendanceModuleFaculty40hrs";
import OverallAttendancePage from "./components/OverallAttendance";
import PDS1 from "./components/PDS1";
import PDS2 from "./components/PDS2";
import PDS3 from "./components/PDS3";
import PDS4 from "./components/PDS4";
import Unauthorized from "./components/Unauthorized";
import OfficialTimeForm from "./components/OfficialTimeForm";

const drawerWidth = 280;

function App() {
  const [settings, setSettings] = useState({});
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("userToken"); // Example token check
    setIsLoggedIn(!!user);
  }, []);

  const handleClickAttendance = () => {
    setOpen2(!open2);
  };

  const fetchSettings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/settings");
      setSettings(response.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const theme = createTheme({
    typography: {
      fontFamily: ["Poppin", ""].join(","),
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <style>
          {`
                    @media print {
                        .no-print { display: none !important; }
                        .header { display: none !important; }
                        .table-wrapper { display: flex; justify-content: center; width: 100%; margin-top: 20px; }
                        .table-side-by-side { display: flex; justify-content: space-between; width: 100%; }
                        .table { width: 45%; margin-right: 2%; border: 1px solid black; border-collapse: collapse; }
                    }
                `}
        </style>
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "hidden" }}>
          {/* Header */}
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: settings.header_color || "primary" }} className="no-print">
            <Toolbar>
              {settings.logo_url && <img src={`http://localhost:5000${settings.logo_url}`} alt="Logo" style={{ height: "50px", padding: "10px 0", marginRight: "20px" }} />}
              <Typography variant="h6" noWrap>
                {settings.company_name || "Organization Name"}
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            className="no-print"
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />

            <List>
              {isLoggedIn && (
                <ListItem button component={Link} sx={{ color: "black" }} to="/home">
                  <ListItemIcon>
                    <House sx={{ fontSize: 29, marginLeft: "-6%" }} />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
              )}
              <ListItem button onClick={handleClick} sx={{ color: "black" }}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboards" />
                <ListItemIcon sx={{ marginLeft: "10rem" }}>{open ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
              </ListItem>

              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  <ListItem button component={Link} to="/personalinfo" sx={{ color: "black" }}>
                    <ListItemIcon sx={{ marginRight: "-1rem" }}>
                      <ChildFriendlyRounded />
                    </ListItemIcon>
                    <ListItemText primary="Personal Information" />
                  </ListItem>
                </List>
              </Collapse>

              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  <ListItem button component={Link} to="/childreninfo" sx={{ color: "black" }}>
                    <ListItemIcon sx={{ marginRight: "-1rem" }}>
                      <ChildFriendlyRounded />
                    </ListItemIcon>
                    <ListItemText primary="Children Information" />
                  </ListItem>
                </List>
              </Collapse>

              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  <ListItem button component={Link} to="/college" sx={{ color: "black" }}>
                    <ListItemIcon sx={{ marginRight: "-1rem" }}>
                      <School />
                    </ListItemIcon>
                    <ListItemText primary="College Information" />
                  </ListItem>
                </List>
              </Collapse>

              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  <ListItem button component={Link} to="/otherskills" sx={{ color: "black" }}>
                    <ListItemIcon sx={{ marginRight: "-1rem" }}>
                      <ChildFriendlyRounded />
                    </ListItemIcon>
                    <ListItemText primary="Other Skills" />
                  </ListItem>
                </List>
              </Collapse>

              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  <ListItem button component={Link} to="/workexperience" sx={{ color: "black" }}>
                    <ListItemIcon sx={{ marginRight: "-1rem" }}>
                      <ChildFriendlyRounded />
                    </ListItemIcon>
                    <ListItemText primary="Work Experience" />
                  </ListItem>
                </List>
              </Collapse>

              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  <ListItem button component={Link} to="/vocational" sx={{ color: "black" }}>
                    <ListItemIcon sx={{ marginRight: "-1rem" }}>
                      <Streetview />
                    </ListItemIcon>
                    <ListItemText primary="Vocational" />
                  </ListItem>
                </List>
              </Collapse>

              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  <ListItem button component={Link} to="/learningdev" sx={{ color: "black" }}>
                    <ListItemIcon sx={{ marginRight: "-1rem" }}>
                      <PsychologyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Learning and Development" />
                  </ListItem>
                </List>
              </Collapse>

              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  <ListItem button component={Link} to="/voluntarywork" sx={{ color: "black" }}>
                    <ListItemIcon sx={{ marginRight: "-1rem" }}>
                      <SportsKabaddi />
                    </ListItemIcon>
                    <ListItemText primary="Voluntary Work" />
                  </ListItem>
                </List>
              </Collapse>

              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  <ListItem button component={Link} to="/eligibility" sx={{ color: "black" }}>
                    <ListItemIcon sx={{ marginRight: "-1rem" }}>
                      <BadgeRounded />
                    </ListItemIcon>
                    <ListItemText primary="Eligibility" />
                  </ListItem>
                </List>
              </Collapse>

              <ListItem button onClick={handleClickAttendance} sx={{ color: "black" }}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Records" />
                <ListItemIcon sx={{ marginLeft: "10rem" }}>{open2 ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
              </ListItem>

              <Collapse in={open2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  <ListItem button component={Link} to="/view_attendance" sx={{ color: "black" }}>
                    <ListItemIcon sx={{ marginRight: "-1rem" }}>
                      <BadgeRounded />
                    </ListItemIcon>
                    <ListItemText primary="View Attendance" />
                  </ListItem>
                </List>
              </Collapse>
              <Collapse in={open2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  <ListItem button component={Link} to="/search_attendance" sx={{ color: "black" }}>
                    <ListItemIcon sx={{ marginRight: "-1rem" }}>
                      <BadgeRounded />
                    </ListItemIcon>
                    <ListItemText primary="Search Attendance" />
                  </ListItem>
                </List>
              </Collapse>
              <Collapse in={open2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  <ListItem button component={Link} to="/daily_time_record" sx={{ color: "black" }}>
                    <ListItemIcon sx={{ marginRight: "-1rem" }}>
                      <BadgeRounded />
                    </ListItemIcon>
                    <ListItemText primary="Daily Time Record" />
                  </ListItem>
                </List>
              </Collapse>
              <Collapse in={open2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  <ListItem button component={Link} to="/daily_time_record_faculty" sx={{ color: "black" }}>
                    <ListItemIcon sx={{ marginRight: "-1rem" }}>
                      <BadgeRounded />
                    </ListItemIcon>
                    <ListItemText primary="Daily Faculty Time Record" />
                  </ListItem>
                </List>
              </Collapse>
              <Collapse in={open2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  <ListItem button component={Link} to="/attendance_form" sx={{ color: "black" }}>
                    <ListItemIcon sx={{ marginRight: "-1rem" }}>
                      <BadgeRounded />
                    </ListItemIcon>
                    <ListItemText primary="Attendance Form" />
                  </ListItem>
                </List>
              </Collapse>
              <Collapse in={open2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  <ListItem button component={Link} to="/attendance_module" sx={{ color: "black" }}>
                    <ListItemIcon sx={{ marginRight: "-1rem" }}>
                      <BadgeRounded />
                    </ListItemIcon>
                    <ListItemText primary="Attendance Module Non-teaching Staff" />
                  </ListItem>
                </List>
              </Collapse>
              <Collapse in={open2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  <ListItem button component={Link} to="/attendance_module_faculty" sx={{ color: "black" }}>
                    <ListItemIcon sx={{ marginRight: "-1rem" }}>
                      <BadgeRounded />
                    </ListItemIcon>
                    <ListItemText primary="Attendance Module Faculty (30hrs)" />
                  </ListItem>
                </List>
              </Collapse>
              <Collapse in={open2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  <ListItem button component={Link} to="/attendance_module_faculty_40hrs" sx={{ color: "black" }}>
                    <ListItemIcon sx={{ marginRight: "-1rem" }}>
                      <BadgeRounded />
                    </ListItemIcon>
                    <ListItemText primary="Attendance Module Faculty (Designated)" />
                  </ListItem>
                </List>
              </Collapse>
              <Collapse in={open2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  <ListItem button component={Link} to="/attendance_summary" sx={{ color: "black" }}>
                    <ListItemIcon sx={{ marginRight: "-1rem" }}>
                      <BadgeRounded />
                    </ListItemIcon>
                    <ListItemText primary="Attendance Summary" />
                  </ListItem>
                </List>
              </Collapse>
              <Collapse in={open2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  <ListItem button component={Link} to="/official_time" sx={{ color: "black" }}>
                    <ListItemIcon sx={{ marginRight: "-1rem" }}>
                      <BadgeRounded />
                    </ListItemIcon>
                    <ListItemText primary="Official Time Form" />
                  </ListItem>
                </List>
              </Collapse>

              <ListItem button component={Link} sx={{ color: "black" }} to="/pdsfile">
                <ListItemIcon>
                  <FileCopy />
                </ListItemIcon>
                <ListItemText primary="Datasheet Files" />
              </ListItem>

              <ListItem button component={Link} sx={{ color: "black" }} to="/settings">
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>

              {/* This code is para makita mo lahat ng available na icon sa material ui 
                                    i -uncomment mo lang ito kung gusto mo siya iturn on and comment mo siya
                                    pag gusto mo iturn off

                                    note: naglalaga siya pagnakaturn on kaya pagnahanap muna yung gusto mong
                                    icon iturn off mo na siya para di maglag at magdelay.
                                */}
              {/* <ListItem button component={Link} sx={{ color: 'black' }} to="/allicons">
                                    <ListItemText primary="Icons" />
                                </ListItem> */}

              <ListItem button sx={{ cursor: "pointer" }} onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Drawer>

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
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
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
                  <ProtectedRoute allowedRoles={["administrator", "superadmin"]}>
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
                    <AttendanceModuleFaculty40hrs />
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
      </Router>
    </ThemeProvider>
  );
}

export default App;
