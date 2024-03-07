import React, { useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    setAuthenticated(false); 
    localStorage.removeItem("authToken"); 
    window.location.href = "/login"; 
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Divider />
      <ul className="mobile-navigation">
        {authenticated && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
        {authenticated ? (
          <li>
            <NavLink to={"/post"}>Post</NavLink>
          </li>
        ) : (
          <>
            <li>
              <NavLink activeClassName="active" to={"/"}>
                Signup
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to={"/login"}>
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </Box>
  );

  return (
    <>
      <Box>
        <AppBar component={"nav"} sx={{ bgcolor: "black" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{
                mr: 2,
                display: { sm: "none" },
              }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              color={"goldenrod"}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="navigation-menu">
                {authenticated ? (
                  <li>
                    <NavLink to={"/post"}>Post</NavLink>
                  </li>
                ) : (
                  <>
                    <li>
                      <NavLink activeClassName="active" to={"/"}>
                        Signup
                      </NavLink>
                    </li>
                    <li>
                      <NavLink activeClassName="active" to={"/login"}>
                        Login
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "240px",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box>
          <Toolbar />
        </Box>
      </Box>
    </>
  );
};

export default Header;
