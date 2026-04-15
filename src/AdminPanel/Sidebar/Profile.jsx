import * as React from "react";
import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, Avatar, Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import RefreshIcon from '@mui/icons-material/Refresh';
import NotificationPopup from "./NotificationPopup";


const Profile = () => {
  const [name, setName] = useState("");
  const [type, settype] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const notificationOpen = Boolean(notificationAnchorEl);

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("accountType")
    localStorage.removeItem("productType")
    localStorage.removeItem("UserId")
    localStorage.removeItem("UserName")
    navigate('/')
  }

  useEffect(() => {
    const storedName = localStorage.getItem("UserName");
    if (storedName) {
      setName(storedName);
    }
  }, []);


  useEffect(() => {
    const storedNam = localStorage.getItem("productType");
    if (storedNam) {
      try {
        settype(JSON.parse(storedNam));
      } catch {
        settype(storedNam);
      }
    }
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>

        <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
          <Box
            onClick={handleNotificationClick}
            sx={{
              backgroundColor: "#FFF2EC",
              borderRadius: "12px",
              width: "45px",
              height: "45px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <NotificationsNoneIcon sx={{ color: "#F36100", fontSize: "28px" }} />
            {/* Notification Dot - only show when there are new notifications */}
            <Box
              sx={{
                position: "absolute",
                top: "10px",
                right: "12px",
                width: "8px",
                height: "8px",
                backgroundColor: "#F36100",
                borderRadius: "50%",
                border: "2px solid #FFF2EC",
              }}
            />
          </Box>
          <NotificationPopup
            anchorEl={notificationAnchorEl}
            open={notificationOpen}
            handleClose={handleNotificationClose}
          />
        </Box>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Box sx={{ display: "flex" }}>
            {/* <Avatar
              alt="k"
              src="/image/profile.png"
              sx={{ width: 50, height: 50, margin: "15px 0px 15px 15px" }}
            /> */}

            <img src="/image/avatorimage.png" style={{ width: 55, height: 55, margin: "5px 0px 5px 15px" }} />
          </Box>
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={Logout}>LogOut</MenuItem>
        </Menu>
      </div>

      <Box>
        <Typography sx={{
          fontFamily: "Inter",
          fontWeight: 500,
          fontSize: { xs: "11px", md: "16px" },
          color: "#F36100"
        }}>
          Ghar Sabha
        </Typography>
        <Typography style={{
          fontFamily: "Inter",
          fontWeight: 400,
          fontSize: "14px",
          color: "#6D6E71"
        }}>
          Admin
        </Typography>
      </Box>


    </>
  );
};

export default Profile;
