import React, { useContext, useState } from 'react';
import AuthContext from './AuthContext';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar } from '@mui/material';


const Navbar = ({ username }) => {
  const { handleLogout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Osnovna skola "Brains 22"
            </Typography>
           {/* Explicitly setting the color to white */}
          <IconButton onClick={handleClick} color="inherit">
          <Typography sx={{paddingRight: "10px"}} variant="h5" color="white">{username}</Typography>
            <Avatar /> 
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
