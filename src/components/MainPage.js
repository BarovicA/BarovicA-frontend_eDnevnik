import React, { useContext } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import AuthContext from './AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ThemeContext } from '../Contexts/ThemeContext';

const MainPage = () => {
  const { username } = useContext(AuthContext); // Get the username from the context
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const { userRole } = useContext(AuthContext);

  return (  
<ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Navbar username={username} />
        <div style={{ display: "flex", paddingTop: 64 }}> 
          <Sidebar />
          <div style={{ flex: 1, overflow: 'auto'}}> {/* Add this */}
            <Outlet/>
            {location.pathname === "/main" && <div style={{padding: "20px"}}><h3 >Welcome {username}, your role is {userRole}.</h3></div>}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MainPage;