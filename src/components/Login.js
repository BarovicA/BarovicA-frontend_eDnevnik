import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import classroom from "../classroom.jpg";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Alert,
  Box,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // dodato za prikazivanje poruke o grešci
  const { handleLogin } = useContext(AuthContext);

  const submitLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        { username, password }
      );
      const user = response.data;
      handleLogin(user);
      setErrorMessage(null); // uspešno logovanje, brišemo poruku o grešci
    } catch (error) {
      setErrorMessage("Login failed. Please check your username and password."); // neuspešno logovanje, postavljamo poruku o grešci
    }
  };

  return (
    <Grid >
      <div
        style={{
          backgroundImage: `url(${classroom})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          opacity: "0.7",
          zIndex: "-1",
        }}>
      </div>

      <Paper
        sx={{
          padding: 4,
          height: "55vh",
          width: 280,
          margin: "100px 100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          //opacity: "0.9"
        }}
        elevation={10}
      >
        <Grid align="center">
          <h3>Welcome to eDnevnik</h3>
        </Grid>
        <Grid align="center">
          <Avatar sx={{ backgroundColor: "#2596be" }}>
            <LockOutlinedIcon />
          </Avatar>
          {/* <h3>Login</h3> */}
        </Grid>
        <Grid container justifyContent="center" sx={{ gap: "20px" }}>
          <TextField value={username} onChange={e => setUsername(e.target.value)}
            id="outlined-basic"
            label="username"
            variant="outlined"
            placeholder="username"
            fullWidth
            required
          />
          <TextField value={password} onChange={e => setPassword(e.target.value)}
            id="outlined-basic"
            label="password"
            variant="outlined"
            placeholder="password"
            fullWidth
            required
          />
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Grid>
        <Grid container justifyContent="flex-end">
          <Button onClick={submitLogin} variant="contained">
            Login
          </Button>
        </Grid>
      </Paper>
    </Grid>
    //   <div style={{
    //       backgroundImage: "url('https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F210831221005-stock-schools-parents-covid-teachers.jpg')",
    //       backgroundSize: 'cover',
    //       backgroundRepeat: 'no-repeat',
    //       backgroundPosition: 'center',
    //       position: 'fixed',
    //       top: '0',
    //       left: '0',
    //       width: '100vw',
    //       height: '100vh',
    //       zIndex: '-1',
    //       opacity: '50%'
    //   }}>
    //   <h1>Login</h1>
    //   <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
    //   <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
    //   <button onClick={submitLogin}>Login</button>
    //   {errorMessage && <p>{errorMessage}</p>} {/* prikazujemo poruku o grešci ako postoji */}
    // </div>
  );
};

export default Login;
