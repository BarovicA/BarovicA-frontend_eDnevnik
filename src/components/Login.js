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
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // dodato za prikazivanje poruke o grešci
  const { handleLogin } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  

  const submitLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        { username, password },
        { withCredentials: true } // dodato zbog sesije i kolacica
      );
      const user = response.data;
      handleLogin(user);
      setErrorMessage(null); // uspesno logovanje, brisemo poruku o gresci
    } catch (error) {
      setErrorMessage("Login failed. Please check your username and password."); // neuspesno logovanje, postavljamo poruku o gresci
    }
  };

  return (
    <Grid>
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
        }}
      ></div>

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
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="outlined-basic"
            label="username"
            variant="outlined"
            placeholder="username"
            fullWidth
            required
          />
          {/* <TextField value={password} onChange={e => setPassword(e.target.value)}
            id="outlined-basic"
            label="password"
            variant="outlined"
            placeholder="password"
            fullWidth
            required
          /> */}
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-basic"
            label="password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            placeholder="password"
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Grid>
        <Grid container justifyContent="flex-end">
          <Button
            sx={{ backgroundColor: "#5c6bc0" }}
            onClick={submitLogin}
            variant="contained"
          >
            Login
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
