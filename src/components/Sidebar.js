import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Toolbar,
  Switch,
  useTheme,
} from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { useMediaQuery } from "@mui/material";
import { ThemeContext } from "../Contexts/ThemeContext";
import AuthContext from "./AuthContext";

const Sidebar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  const { userRole } = useContext(AuthContext);

  const drawerWidth = isSmallScreen ? 60 : 230;

  let routes = null;
  switch (userRole) {
    case 'ADMIN':
      routes = (
        <>
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="/main/subjects"
              sx={(theme) =>
                location.pathname.startsWith("/main/subjects") && {
                  color: "#5c6bc0",
                  fontWeight: "bold",
                }
              }
            >
              <ListItemIcon>
                <LocalLibraryIcon color="action" fontSize="large" />
              </ListItemIcon>
              {!isSmallScreen && <ListItemText primary="Subjects" />}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="/main/grades"
              sx={(theme) =>
                location.pathname.startsWith("/main/grades") && {
                  color: "#5c6bc0",
                  fontWeight: "bold",
                }
              }
            >
              <ListItemIcon>
                <Diversity3Icon color="action" fontSize="large" />
              </ListItemIcon>
              {!isSmallScreen && <ListItemText primary="Grades" />}
            </ListItemButton>
          </ListItem>
        </>
      );
      break;
    case 'TEACHER':
      routes = (<>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/main/teachersubjects"
            sx={(theme) =>
              location.pathname.startsWith("/main/teachersubjects") && {
                color: "#5c6bc0",
                fontWeight: "bold",
              }
            }
          >
            <ListItemIcon>
              <LocalLibraryIcon color="action" fontSize="large" />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="My Subjects" />}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
        <ListItemButton
          component={NavLink}
          to="/main/teachergrades"
          sx={(theme) =>
            location.pathname.startsWith("/main/teachergrades") && {
              color: "#5c6bc0",
              fontWeight: "bold",
            }
          }
        >
          <ListItemIcon>
            <Diversity3Icon color="action" fontSize="large" />
          </ListItemIcon>
          {!isSmallScreen && <ListItemText primary="My Grades" />}
        </ListItemButton>
      </ListItem>
      </>
      );
      break;
    case 'STUDENT':
      routes = (
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/main/studentsubjects"
            sx={(theme) =>
              location.pathname.startsWith("/main/studentsubjects") && {
                color: "#5c6bc0",
                fontWeight: "bold",
              }
            }
          >
            <ListItemIcon>
              <LocalLibraryIcon color="action" fontSize="large" />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="My Subjects" />}
          </ListItemButton>
        </ListItem>
      );
      break;
    default:
      routes = null;
      break;
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {routes} 
          <ListItem
            sx={{
              paddingLeft: "5px",
              flexDirection: isSmallScreen ? "column" : "row",
            }}
          >
            <Switch
              sx={{ width: "57px" }}
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            {!isSmallScreen && (
              <ListItemText sx={{ paddingLeft: "10px" }} primary="Dark mode" />
            )}
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
//       }}
//     >
//       <Toolbar />
//       <Box sx={{ overflow: "auto" }}>
//         <List>
//           <ListItem disablePadding>
//             <ListItemButton
//               component={NavLink}
//               to="/main/subjects"
//               sx={(theme) =>
//                 location.pathname.startsWith("/main/subjects") && {
//                   color: "#5c6bc0",
//                   fontWeight: "bold",
//                 }
//               }
//             >
//               <ListItemIcon>
//                 <LocalLibraryIcon color="action" fontSize="large" />
//               </ListItemIcon>
//               {!isSmallScreen && <ListItemText primary="Subjects" />}
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton
//               component={NavLink}
//               to="/main/grades"
//               sx={(theme) =>
//                 location.pathname.startsWith("/main/grades") && {
//                   color: "#5c6bc0",
//                   fontWeight: "bold",
//                 }
//               }
//             >
//               <ListItemIcon>
//                 <Diversity3Icon color="action" fontSize="large" />
//               </ListItemIcon>
//               {!isSmallScreen && <ListItemText primary="Grades" />}
//             </ListItemButton>
//           </ListItem>
//           <ListItem
//             sx={{
//               paddingLeft: "5px",
//               flexDirection: isSmallScreen ? "column" : "row",
//             }}
//           >
//             <Switch
//               sx={{ width: "57px" }}
//               checked={darkMode}
//               onChange={() => setDarkMode(!darkMode)}
//             />
//             {!isSmallScreen && (
//               <ListItemText sx={{ paddingLeft: "10px" }} primary="Dark mode" />
//             )}
//           </ListItem>
//         </List>
//       </Box>
//     </Drawer>
//   );
// };

export default Sidebar;
