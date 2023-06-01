import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainPage = ({ username }) => {
    
  
    return (
      <div>
        <Navbar user={username} />
        <div>
        <aside>
            <ul>
              <li>
                <NavLink to="/main/subjects">Subjects</NavLink>
              </li>
              <li>
                <NavLink to="/main/grades">Grades</NavLink>
              </li>
            </ul>
          </aside>
        <Outlet ></Outlet>
        </div>
      </div>
    );
  };
  
  export default MainPage;