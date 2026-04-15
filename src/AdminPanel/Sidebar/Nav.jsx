import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import * as MuiIcons from "@mui/icons-material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Typography, TextField, InputAdornment } from "@mui/material";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const ProfileData = [
  {
    id: 1,
    image: "",
  },
];

const drawerWidth = 310;

// Recolor sidebar PNGs to match MUI icons: inactive #737679, active #F36100
const SIDEBAR_IMG_FILTER_INACTIVE =
  "brightness(0) saturate(100%) invert(51%) sepia(8%) saturate(220%) hue-rotate(169deg) brightness(0.92) contrast(0.9)";
const SIDEBAR_IMG_FILTER_ACTIVE =
  "brightness(0) saturate(100%) invert(48%) sepia(93%) saturate(3207%) hue-rotate(360deg) brightness(103%) contrast(101%)";

const Nav = ({ menuData }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [isOpen, setIsOpen] = useState(isLargeScreen);
  const [name, setname] = useState();
  const location = useLocation();
  const navigate = useNavigate();




  const handleHomapage = () => {
    navigate(`/`)
  }

  const handleSignOut = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("accountType");
      localStorage.removeItem("productType");
      localStorage.removeItem("UserId");
      localStorage.removeItem("UserName");
      localStorage.removeItem("UserProfile");
    } catch (error) {
      console.error("Error clearing auth data on sign out:", error);
    }

    navigate("/Login");
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const renderIcon = (iconName, isActive) => {
    if (iconName.includes("/image/")) {
      const imageStyle = {
        width: "24px",
        height: "24px",
        objectFit: "contain",
        display: "block",
        filter: isActive ? SIDEBAR_IMG_FILTER_ACTIVE : SIDEBAR_IMG_FILTER_INACTIVE,
      };
      return <img src={iconName} alt="icon" style={imageStyle} />;
    } else {
      const iconStyle = {
        color: isActive ? "#F36100" : "#737679",
      };
      const Icon = MuiIcons[iconName];
      return Icon ? <Icon style={iconStyle} /> : null;
    }
  };

  const drawer = (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        height: "100vh",
        width: drawerWidth,
        maxWidth: "100%",
        boxSizing: "border-box",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {ProfileData.map((item, index) => (
        <Box
          key={index}
          style={{
            margin: "0px 0px 15px 0px",
            // backgroundColor: "#FFA201",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img src="/image/logo.png"
            width={180}
            style={{ cursor: "pointer" }}
           
          />


        </Box>
      ))}

      <List sx={{ py: 0, width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>
        {menuData.map((item, index) => {

          const isSignOut = item.label === "Sign Out";
          const isActive = !isSignOut && location.pathname === item.path;
          return (
            <ListItemButton
              key={item.id}
              component={isSignOut ? "button" : NavLink}
              to={isSignOut ? undefined : item.path}
              onClick={isSignOut ? handleSignOut : undefined}
              sx={{
                backgroundColor: isActive ? "#FBEEE5" : "transparent",
                color: isActive ? "#F36100" : "#2F2F2F",
                margin: "7px 12px",
                fontFamily: "Inter",
                fontSize: "18px",
                fontWeight: 400,
                borderRadius: "8px",
                maxWidth: "100%",
                boxSizing: "border-box",
                alignItems: "flex-start",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  alignSelf: "flex-start",
                  mt: "2px",
                }}
              >
                {renderIcon(item.icon, isActive)}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  minWidth: 0,
                  flex: "1 1 auto",
                  "& .MuiTypography-root": {
                    fontSize: "21px",
                    fontFamily: "Inter",
                    fontWeight: 400,
                    lineHeight: "26px",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  },
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        elevation={0}
        style={{
          backgroundColor: "white",
          boxShadow: "none",
        }}
        position="fixed"
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              flexFlow: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer}
                sx={{ mr: 2, display: { lg: "none" } }}
              >
                <MenuIcon style={{ color: "rgb(101,106,110)" }} />
              </IconButton>
              <Box sx={{ marginLeft: { xs: "0px", lg: `320px` } }}>
                <Typography sx={{
                  fontFamily: "Inter",
                  fontWeight: 600,
                  fontSize: { xs: "16px", md: "36px" },
                  color: "#222222"
                }}>
                  Hi Welcome Back!
                </Typography>
              </Box>




            </Box>

            {/* <Box  >
              <TextField
                sx={{
                  display: { xs: "none", md: "block" },
                  margin: { xs: "0px", md: "20px 0px 0px 0px" },
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                  },
                  backgroundColor: "#F4F4F4",
                  borderRadius: "10px"
                }}
                placeholder="Search anything here..."
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#05453A" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box> */}



            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Profile />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              maxWidth: "100%",
              overflowX: "hidden",
            },
          }}
          variant="temporary"
          open={isOpen}
          onClose={toggleDrawer}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              maxWidth: "100%",
              overflowX: "hidden",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </React.Fragment>
  );
};

Nav.propTypes = {
  menuData: PropTypes.array.isRequired,
};

export default Nav;