import React, { useState } from 'react';

import Login from './components/Login';
import MainPage from './components/MainPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = (username, token) => {
    setLoggedIn(true);
    setUsername(username);
    setToken(token);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setToken('');
  };

  return (
  
    <div>
    {loggedIn ? (<MainPage username={username} onLogout={handleLogout}/>) : (<Login onLogin={handleLogin} /> )}
  </div>
);

  
};

export default App;


  // <Router>
    //   <Routes>
    //     <Route path="/" element={loggedIn ? <Navigate to="/main" /> : <Login onLogin={handleLogin} />} />
    //     <Route path="/main" element={loggedIn ? <MainPage user={username} onLogout={handleLogout} /> : <Navigate to="/" />} />
    //   </Routes>
    // </Router>