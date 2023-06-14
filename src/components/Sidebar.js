import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Toolbar, Switch, useTheme } from '@mui/material';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useMediaQuery } from '@mui/material';
import { ThemeContext } from '../Contexts/ThemeContext';

const Sidebar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // adjust 'sm' to your desired breakpoint

  const drawerWidth = isSmallScreen ? 60 : 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem disablePadding>
                <ListItemButton component={NavLink} to="/main/subjects">
                    <ListItemIcon>
                        <LocalLibraryIcon color="action" fontSize="large" />
                        {!isSmallScreen && <ListItemText sx={{paddingLeft: "20px"}} primary="Subjects" />}
                    </ListItemIcon>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding >
                <ListItemButton component={NavLink} to="/main/grades">
                    <Diversity3Icon color="action" fontSize="large" />
                    {!isSmallScreen && <ListItemText sx={{paddingLeft: "20px"}} primary="Grades" />}
                </ListItemButton>  
            </ListItem>
            <ListItem sx={{ paddingLeft: "5px", flexDirection: isSmallScreen ? "column" : "row" }}>
                <Switch sx={{width: "57px"}} checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                {!isSmallScreen && <ListItemText sx={{paddingLeft: "10px"}} primary="Dark mode" />}
                
            </ListItem>
          </List>
        </Box>
    </Drawer>
  );
};

export default Sidebar;