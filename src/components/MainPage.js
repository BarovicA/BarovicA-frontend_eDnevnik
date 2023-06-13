import React, { useContext } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import AuthContext from './AuthContext';


const MainPage = () => {
  const { username } = useContext(AuthContext); // Get the username from the context
  return (
    <div>
      <Navbar username={username} />
      <div style={{ display: "flex", paddingTop: 64 }}> 
        <Sidebar />
        <div style={{ flex: 1, overflow: 'auto'}}> {/* Add this */}
          <Outlet>
            Welcome!
          </Outlet>
        </div>
      </div>
    </div>
  );
};

export default MainPage;