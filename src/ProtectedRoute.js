import React, { useContext } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import AuthContext from './components/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {

  const { token } = useContext(AuthContext); 

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;