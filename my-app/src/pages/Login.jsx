import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { TextField, Button, Snackbar, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loginCompleted, setLoginCompleted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetInitiated, setResetInitiated] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const addPostLogin = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/auth/user_login";
      const response = await axios.post(
        url,
        { email, password },
        { withCredentials: true }
      );
      console.log(response);

      if (response.data.success) {
        setEmail("");
        setPassword("");
        setLoginCompleted(true); 
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while logging in.");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleResetPassword = async () => {
    try {
      const url = "http://localhost:3000/auth/reset_password";
      const response = await axios.post(url, { email });
      console.log(response);
      setResetInitiated(true);
    } catch (err) {
      console.error(err);
      setError("An error occurred while resetting password.");
      setOpenSnackbar(true);
    }
  };

  if (loginCompleted) {
    window.location.href = "/post"; 
    return null; 
  }

  return (
    <Layout>
      <form className="formData" onSubmit={addPostLogin}>
        <h1>Login here</h1>

        <div className="input-email">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            color="primary"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-password">
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            color="primary"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="submit-button-container">
          <Button
            type="submit"
            variant="outlined"
            fullWidth={false}
            className="submitButton"
            size="large"
          >
            <b>Login</b>  
          </Button>
        </div>

        <div className="reset-password-link">
          {resetInitiated ? (
            <p>Password reset link has been sent to your email.</p>
          ) : (
            <p onClick={handleResetPassword}>Forgot password? Click here to reset.</p>
          )}
        </div>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={error}
      />
    </Layout>
  );
};

export default Login;
