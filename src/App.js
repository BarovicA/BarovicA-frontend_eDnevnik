import React, { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthContext from "./components/AuthContext";

const App = () => {
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (loggedIn) {
      navigate('/main');
    } else {
      navigate('/login');
    }
  }, [loggedIn, navigate]);

  return (
    <Outlet />
  );
}
export default App;


//     <div>
//       {loggedIn ? (
//         <MainPage username={username} onLogout={handleLogout} />
//       ) : (
//         <Login onLogin={handleLogin} />
//       )}
//     </div>
//     </AuthProvider>
//   );
// }
