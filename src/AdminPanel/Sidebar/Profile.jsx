import * as React from "react";
import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, Avatar, Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import RefreshIcon from '@mui/icons-material/Refresh';

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
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Box sx={{ display: "flex" }}>
            <Avatar
              alt="k"
              src="/image/profile.png"
              sx={{ width: 50, height: 50, margin: "15px 0px 15px 15px" }}
            />
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
        <Typography style={{
          fontFamily: "Inter",
          fontWeight: 500,
          fontSize: "16px",
          color: "#F36100"
        }}>
          Kunal Verma
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
