import React from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Toolbar} from '@mui/material';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Diversity3Icon from '@mui/icons-material/Diversity3';
const Sidebar = () => {
  const drawerWidth = 240;

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
        <ListItem  disablePadding>
            <ListItemButton component={NavLink} to="/main/subjects">
                <ListItemIcon>
                    <LocalLibraryIcon color="action" fontSize="large" sx={{width: "80%", paddingTop: "0px"}}/>
                    <ListItemText  primary="Subjects" />
                </ListItemIcon>
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding >
            <ListItemButton component={NavLink} to="/main/grades">
                <Diversity3Icon color="action" fontSize="large" sx={{width: "40%", paddingTop: "0px"}}/>
                <ListItemText primary="Grades" />
            </ListItemButton>  
        </ListItem>
      </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;