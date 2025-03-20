import React from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Collapse, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  ExpandMore,
  ExpandLess,
  House,
  ChildFriendlyRounded,
  BadgeRounded,
  School,
  Streetview,
  Psychology as PsychologyIcon,
  SportsKabaddi,
  FileCopy,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

const drawerWidth = 280;

const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = JSON.parse(atob(token.split(".")[1])); 
    return decoded.role; 
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const Sidebar = ({ open, handleClick, open2, handleClickAttendance }) => {
  const userRole = getUserRole(); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    window.location.href = "/";
  };

  return (
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
        <ListItem button component={Link}  sx={{ color: "black" }} to="/home">
          <ListItemIcon>
            <House sx={{ fontSize: 29, marginLeft: "-6%" }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        {userRole !== "staff" && (
          <>
            <ListItem button onClick={handleClick} sx={{ color: "black", cursor: "pointer" }}>
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

                <ListItem button component={Link} to="/childreninfo" sx={{ color: "black" }}>
                  <ListItemIcon sx={{ marginRight: "-1rem" }}>
                    <ChildFriendlyRounded />
                  </ListItemIcon>
                  <ListItemText primary="Children Information" />
                </ListItem>

                <ListItem button component={Link} to="/college" sx={{ color: "black" }}>
                  <ListItemIcon sx={{ marginRight: "-1rem" }}>
                    <School />
                  </ListItemIcon>
                  <ListItemText primary="College Information" />
                </ListItem>

                <ListItem button component={Link} to="/otherskills" sx={{ color: "black" }}>
                  <ListItemIcon sx={{ marginRight: "-1rem" }}>
                    <ChildFriendlyRounded />
                  </ListItemIcon>
                  <ListItemText primary="Other Skills" />
                </ListItem>

                <ListItem button component={Link} to="/workexperience" sx={{ color: "black" }}>
                  <ListItemIcon sx={{ marginRight: "-1rem" }}>
                    <ChildFriendlyRounded />
                  </ListItemIcon>
                  <ListItemText primary="Work Experience" />
                </ListItem>

                <ListItem button component={Link} to="/vocational" sx={{ color: "black" }}>
                  <ListItemIcon sx={{ marginRight: "-1rem" }}>
                    <Streetview />
                  </ListItemIcon>
                  <ListItemText primary="Vocational" />
                </ListItem>

                <ListItem button component={Link} to="/learningdev" sx={{ color: "black" }}>
                  <ListItemIcon sx={{ marginRight: "-1rem" }}>
                    <PsychologyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Learning and Development" />
                </ListItem>

                <ListItem button component={Link} to="/voluntarywork" sx={{ color: "black" }}>
                  <ListItemIcon sx={{ marginRight: "-1rem" }}>
                    <SportsKabaddi />
                  </ListItemIcon>
                  <ListItemText primary="Voluntary Work" />
                </ListItem>

                <ListItem button component={Link} to="/eligibility" sx={{ color: "black" }}>
                  <ListItemIcon sx={{ marginRight: "-1rem" }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="Eligibility" />
                </ListItem>
              </List>
            </Collapse>
            </>
            )}

            <ListItem button onClick={handleClickAttendance} sx={{ color: "black", cursor: "pointer" }}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Records" />
                <ListItemIcon sx={{ marginLeft: "10rem" }}>{open2 ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
            </ListItem>
        
            {userRole !== "staff" && (
                  <>
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
                </>
              )}
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

            {userRole !== "staff" && (
                  <>
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
                        <ListItemText primary="Attendance Module Faculty" />
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
                  </>
                )}
                <List>
                <ListItem button component={Link} to="/pdsfile" sx={{ color: "black" }}>
                  <ListItemIcon sx={{ marginRight: "-1rem" }}>
                    <FileCopy />
                  </ListItemIcon>
                  <ListItemText primary="Datasheet Files" />
                </ListItem>

                {userRole !== "staff" && (
                  <>
                    <ListItem button component={Link} to="/view_attendance" sx={{ color: "black" }}>
                      <ListItemIcon sx={{ marginRight: "-1rem" }}>
                        <BadgeRounded />
                      </ListItemIcon>
                      <ListItemText primary="View Attendance" />
                    </ListItem>
                    <ListItem button component={Link} to="/search_attendance" sx={{ color: "black" }}>
                      <ListItemIcon sx={{ marginRight: "-1rem" }}>
                        <BadgeRounded />
                      </ListItemIcon>
                      <ListItemText primary="Search Attendance" />
                    </ListItem>
                    
                  </>
                )}
              </List>

            {userRole !== "staff" && (
              <ListItem button component={Link} sx={{ color: "black" }} to="/settings">
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            )}

            <ListItem button sx={{ cursor: "pointer" }} onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
      );
    };

export default Sidebar;
