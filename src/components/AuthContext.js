import React from "react";

const AuthContext = React.createContext({
    username: '',
  token: '',
  userRole: '',
  loggedIn: false,
  handleLogin: () => {},
  handleLogout: () => {},
});
export default AuthContext;