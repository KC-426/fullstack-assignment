import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import {
  TextField,
  Button,
  Snackbar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

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
      <form className="formDataLogin mt-20 mb-20 " onSubmit={addPostLogin}>
      <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <img src="/src/images/signin.png" alt="" width={"50px"} />
          </div>
        <div>
          <h1 className="font-bold text-gray-700 text-2xl text-center	mb-6">
            Login
          </h1>
          <h3>
            <label className="font-semibold text-gray-600">Email: </label>
          </h3>
          <div className="input-email">
            <TextField
              id="outlined-basic"
              variant="outlined"
              color="primary"
              size="small"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <h3>
            <label className="font-semibold text-gray-600">Password: </label>
          </h3>
          <div className="input-password">
            <TextField
              id="outlined-basic"
              variant="outlined"
              color="primary"
              fullWidth
              size="small"
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

          <div className="reset-password-link flex justify-end font-semibold text-sm">
            {resetInitiated ? (
              <p>Password reset link has been sent to your email.</p>
            ) : (
              <p onClick={handleResetPassword}>
                <Link> Forgot password?</Link>
              </p>
            )}
          </div>

          <div className="submit-button-container mt-7">
            <button className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
              <b>Login</b>
            </button>
          </div>

          <div className="mt-15 text-center ">
            <p>Or Signup using</p>{" "}
            <Link className="font-semibold" to="/">
              Sign Up
            </Link>
          </div>
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
