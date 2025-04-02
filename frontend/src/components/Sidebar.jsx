import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Toolbar,
} from '@mui/material';
import { Link } from 'react-router-dom';
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
  PointOfSale as PointOfSaleIcon,
  Category as CategoryIcon,
  CurrencyExchange as CurrencyExchangeIcon,
  Store as StoreIcon,
  AddBusiness as AddBusinessIcon,
  Announcement as AnnouncementIcon,
  Summarize as SummarizeIcon,
} from '@mui/icons-material';


const drawerWidth = 250;


const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;


  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded.role;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};


const Sidebar = ({
  open,
  handleClick,
  open2,
  handleClickAttendance,
  open3,
  handleClickPayroll,
  open4,
  handleClickForms,
}) => {
  const userRole = getUserRole();


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.clear();
    window.location.href = '/';
  };


  return (
    <Drawer
      className="no-print"
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '17%',
          boxSizing: 'border-box',
          backgroundColor: '#e5d0ac',
        },
      }}
    >
      <Toolbar />
      <List>
        <ListItem button component={Link} sx={{ color: 'black' }} to="/home" >
          <ListItemIcon >
            <House sx={{ fontSize: 29, marginLeft: '-6%' }} />
          </ListItemIcon>
          <ListItemText primary="Home" sx={{marginLeft: '-25px'}} />
        </ListItem>


        {userRole !== 'staff' && (
          <>
            <ListItem
              button
              onClick={handleClick}
              sx={{ color: 'black', cursor: 'pointer' }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboards" sx={{marginLeft: '-25px'}} />
              <ListItemIcon sx={{ marginLeft: '10rem' }}>
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>
            </ListItem>


            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItem
                  button
                  component={Link}
                  to="/personalinfo"
                  sx={{ color: 'black' }}
                >
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <ChildFriendlyRounded />
                  </ListItemIcon>
                  <ListItemText primary="Personal Information" sx={{marginLeft: '-10px'}}/>
                </ListItem>


                <ListItem
                  button
                  component={Link}
                  to="/childreninfo"
                  sx={{ color: 'black' }}
                >
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <ChildFriendlyRounded />
                  </ListItemIcon>
                  <ListItemText primary="Children Information" sx={{marginLeft: '-10px'}}/>
                </ListItem>


                <ListItem
                  button
                  component={Link}
                  to="/college"
                  sx={{ color: 'black' }}
                >
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <School />
                  </ListItemIcon>
                  <ListItemText primary="College Information" sx={{marginLeft: '-10px'}} />
                </ListItem>


                <ListItem
                  button
                  component={Link}
                  to="/otherskills"
                  sx={{ color: 'black' }}
                >
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <ChildFriendlyRounded />
                  </ListItemIcon>
                  <ListItemText primary="Other Skills" sx={{marginLeft: '-10px'}}/>
                </ListItem>


                <ListItem
                  button
                  component={Link}
                  to="/workexperience"
                  sx={{ color: 'black' }}
                >
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <ChildFriendlyRounded />
                  </ListItemIcon>
                  <ListItemText primary="Work Experience" sx={{marginLeft: '-10px'}}/>
                </ListItem>


                <ListItem
                  button
                  component={Link}
                  to="/vocational"
                  sx={{ color: 'black' }}
                >
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <Streetview />
                  </ListItemIcon>
                  <ListItemText primary="Vocational" sx={{marginLeft: '-10px'}}/>
                </ListItem>


                <ListItem
                  button
                  component={Link}
                  to="/learningdev"
                  sx={{ color: 'black' }}
                >
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <PsychologyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Learning and Development" sx={{marginLeft: '-10px'}}/>
                </ListItem>


                <ListItem
                  button
                  component={Link}
                  to="/voluntarywork"
                  sx={{ color: 'black' }}
                >
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <SportsKabaddi />
                  </ListItemIcon>
                  <ListItemText primary="Voluntary Work" sx={{marginLeft: '-10px'}}/>
                </ListItem>


                <ListItem
                  button
                  component={Link}
                  to="/eligibility"
                  sx={{ color: 'black' }}
                >
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="Eligibility" sx={{marginLeft: '-10px'}}/>
                </ListItem>
              </List>
            </Collapse>
          </>
        )}


        <ListItem
          button
          onClick={handleClickAttendance}
          sx={{ color: 'black', cursor: 'pointer' }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Records" sx={{marginLeft: '-25px'}}/>
          <ListItemIcon sx={{ marginLeft: '10rem' }}>
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
        </ListItem>


        {userRole !== 'staff' && (
          <>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItem
                  button
                  component={Link}
                  to="/view_attendance"
                  sx={{ color: 'black' }}
                >
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="View Attendance" sx={{marginLeft: '-10px'}}/>
                </ListItem>
              </List>
            </Collapse>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItem
                  button
                  component={Link}
                  to="/search_attendance"
                  sx={{ color: 'black' }}
                >
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="Search Attendance" sx={{marginLeft: '-10px'}}/>
                </ListItem>
              </List>
            </Collapse>
          </>
        )}
        <Collapse in={open2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem
              button
              component={Link}
              to="/daily_time_record"
              sx={{ color: 'black' }}
            >
              <ListItemIcon sx={{ marginRight: '-1rem' }}>
                <BadgeRounded />
              </ListItemIcon>
              <ListItemText primary="Daily Time Record" sx={{marginLeft: '-10px'}}/>
            </ListItem>
          </List>
        </Collapse>


        {userRole !== 'staff' && (
          <>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItem
                  button
                  component={Link}
                  to="/daily_time_record_faculty"
                  sx={{ color: 'black' }}
                >
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="Daily Faculty Time Record" sx={{marginLeft: '-10px'}}/>
                </ListItem>
              </List>
            </Collapse>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItem
                  button
                  component={Link}
                  to="/attendance_form"
                  sx={{ color: 'black' }}
                >
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="Attendance Form"sx={{marginLeft: '-10px'}} />
                </ListItem>
              </List>
            </Collapse>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItem
                  button
                  component={Link}
                  to="/attendance_module"
                  sx={{ color: 'black' }}
                >
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="Attendance Module Non-teaching Staff" sx={{marginLeft: '-10px'}}/>
                </ListItem>
              </List>
            </Collapse>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItem
                  button
                  component={Link}
                  to="/attendance_module_faculty"
                  sx={{ color: 'black' }}
                >
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="Attendance Module Faculty (30hrs)" sx={{marginLeft: '-10px'}}/>
                </ListItem>
              </List>
            </Collapse>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItem
                  button
                  component={Link}
                  to="/attendance_module_faculty_40hrs"
                  sx={{ color: 'black' }}
                >
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="Attendance Module Faculty (Designated)" sx={{marginLeft: '-10px'}}/>
                </ListItem>
              </List>
            </Collapse>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItem
                  button
                  component={Link}
                  to="/attendance_summary"
                  sx={{ color: 'black' }}
                >
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="Attendance Summary" sx={{marginLeft: '-10px'}}/>
                </ListItem>
              </List>
            </Collapse>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItem
                  button
                  component={Link}
                  to="/official_time"
                  sx={{ color: 'black' }}
                >
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <BadgeRounded />
                  </ListItemIcon>
                  <ListItemText primary="Official Time Form" sx={{marginLeft: '-10px'}}/>
                </ListItem>
              </List>
            </Collapse>
          </>
        )}
        <List>
          <ListItem
            button
            component={Link}
            to="/pdsfile"
            sx={{ color: 'black' }}
          >
            <ListItemIcon sx={{ marginRight: '-1rem' }}>
              <FileCopy />
            </ListItemIcon>
            <ListItemText primary="Datasheet Files" sx={{marginLeft: '-10px'}}/>
          </ListItem>
        </List>


        {userRole !== 'staff' && (
          <>
            <ListItem
              button
              onClick={handleClickPayroll}
              sx={{ color: 'black', cursor: 'pointer' }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Payroll Management" sx={{ marginLeft: '-25px' }} />
              <ListItemIcon sx={{ marginLeft: '10rem' }}>
                {open3 ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>
            </ListItem>

            <Collapse in={open3} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItem button component={Link} to="/payroll-table" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <PointOfSaleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Payroll" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/remittance-table" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <PointOfSaleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Remittances" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/item-table" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Item Table" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/salary-grade" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <CurrencyExchangeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Salary Grade Table" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/salary-grade-status" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <CurrencyExchangeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Salary Grade Status" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/department-table" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <StoreIcon />
                  </ListItemIcon>
                  <ListItemText primary="Department" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/department-assignment" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <AddBusinessIcon />
                  </ListItemIcon>
                  <ListItemText primary="Department Assignment" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/leave-table" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Leave" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/leave-assignment" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Leave Assignment" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/holiday-suspension" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <AnnouncementIcon />
                  </ListItemIcon>
                  <ListItemText primary="Holiday and Suspension" sx={{ marginLeft: '-10px' }} />
                </ListItem>
              </List>
            </Collapse>
          </>
        )}


        {userRole !== 'staff' && (
          <>
            <ListItem
              button
              onClick={handleClickForms}
              sx={{ color: 'black', cursor: 'pointer' }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Forms" sx={{ marginLeft: '-25px' }} />
              <ListItemIcon sx={{ marginLeft: '10rem' }}>
                {open4 ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>
            </ListItem>

            <Collapse in={open4} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItem button component={Link} to="/assessment-clearance" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Assessment Clearance" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/clearance" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Clearance" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/faculty-clearance" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Faculty Clearance" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/hrms-request-forms" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="HRMS Request Form" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/individual-faculty-loading" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Individual Faculty Loading" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/in-service-training" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="In Service Training" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/leave-card" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Employee's Leave Card" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/locator-slip" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Locator's Slip" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/permission-to-teach" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Permission To Teach" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/request-for-id" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Request For ID" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/saln-front" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="S.A.L.N" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/scholarship-agreement" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Scholarship Agreement" sx={{ marginLeft: '-10px' }} />
                </ListItem>

                <ListItem button component={Link} to="/subject" sx={{ color: 'black' }}>
                  <ListItemIcon sx={{ marginRight: '-1rem' }}>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Subject Still to be Taken" sx={{ marginLeft: '-10px' }} />
                </ListItem>
              </List>
            </Collapse>
          </>
        )}

        {userRole !== 'staff' && (
          <ListItem
            button
            component={Link}
            sx={{ color: 'black' }}
            to="/settings"
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" sx={{ marginLeft: '-25px' }}/>
          </ListItem>
        )}
      

        <ListItem button sx={{ cursor: 'pointer' }} onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ marginLeft: '-25px' }}/>
        </ListItem>
      </List>
    </Drawer>
  );
};


export default Sidebar;



