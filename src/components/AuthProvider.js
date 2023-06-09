import { useState } from "react";
import AuthContext from "./AuthContext";

function AuthProvider({ children }) {
    const userFormStorage = JSON.parse(localStorage.getItem('user')) || {};
    const [username, setUsername] = useState(userFormStorage.username || '');
    const [token, setToken] = useState(userFormStorage.token || '');
    const [userRole, setUserRole] = useState(userFormStorage.authorities ? userFormStorage.authorities[0].authority : '');
    const [loggedIn , setLoggedIn] = useState(Boolean(token));

    const handleLogin = (user) => {
        setLoggedIn(true);
        setUsername(user.username);
        setToken(user.token);
        setUserRole(user.authorities[0].authority);
        localStorage.setItem('user', JSON.stringify(user));
      };
    
      const handleLogout = () => {
        setLoggedIn(false);
        setUsername('');
        setToken('');
        setUserRole('');
        localStorage.removeItem('user');
      };

      return (
        <AuthContext.Provider value={{
          username,
          token,
          userRole,
          loggedIn,
          handleLogin,
          handleLogout,
        }}>
          {children}
        </AuthContext.Provider>
      );
}

export default AuthProvider;