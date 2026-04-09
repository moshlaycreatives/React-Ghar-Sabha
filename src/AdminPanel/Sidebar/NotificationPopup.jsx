import React, { useState } from "react";
import { Box, Typography, Menu, Divider, Button } from "@mui/material";

const NotificationPopup = ({ anchorEl, open, handleClose }) => {
  const [showAll, setShowAll] = useState(false);

  const notifications = [
    { id: 1, title: "New Order Received", message: "You have a new order from Kunal.", time: "2 mins ago" },
    { id: 2, title: "System Update", message: "Maintenance is scheduled for tonight.", time: "1 hour ago" },
    { id: 3, title: "Payment Success", message: "Payment for order #1234 was successful.", time: "3 hours ago" },
    { id: 4, title: "New Message", message: "You have a new message from support.", time: "5 hours ago" },
    { id: 5, title: "Inventory Alert", message: "Item 'Product A' is low on stock.", time: "Yesterday" },
    { id: 6, title: "New User Registered", message: "A new user has joined the platform.", time: "Yesterday" },
    { id: 7, title: "Review Received", message: "A customer left a 5-star review.", time: "2 days ago" },
    { id: 8, title: "Order Shipped", message: "Order #5678 has been shipped.", time: "3 days ago" },
    { id: 9, title: "Refund Processed", message: "Refund for order #9012 was processed.", time: "4 days ago" },
    { id: 10, title: "Security Alert", message: "New login from a different device.", time: "5 days ago" },
  ];

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 6);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "350px",
          borderRadius: "12px",
          mt: 1.5,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          padding: "10px",
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1, px: 1 }}>
        <Typography sx={{ fontWeight: 600, fontSize: "16px", color: "#1A1A1A" }}>
          All Notification
        </Typography>
        <Typography
          sx={{
            fontSize: "13px",
            color: "#F36100",
            cursor: "pointer",
            fontWeight: 500,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Mark all read
        </Typography>
      </Box>
      <Divider sx={{ mb: 1 }} />
      
      <Box sx={{ maxHeight: showAll ? "400px" : "auto", overflowY: showAll ? "auto" : "visible" }}>
        {displayedNotifications.map((notif, index) => (
          <React.Fragment key={notif.id}>
            <Box sx={{ p: 1, "&:hover": { backgroundColor: "#F9F9F9" }, borderRadius: "8px", cursor: "pointer" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>{notif.title}</Typography>
              <Typography sx={{ fontSize: "12px", color: "#6D6E71" }}>{notif.message}</Typography>
              <Typography sx={{ fontSize: "10px", color: "#999", mt: 0.5 }}>{notif.time}</Typography>
            </Box>
            {index < displayedNotifications.length - 1 && (
              <Divider variant="inset" component="li" sx={{ listStyle: "none", my: 0.5 }} />
            )}
          </React.Fragment>
        ))}
      </Box>

      {!showAll && notifications.length > 6 && (
        <Box sx={{ textAlign: "center", mt: 1 }}>
          <Button 
            fullWidth 
            onClick={() => setShowAll(true)}
            sx={{ color: "#F36100", textTransform: "none", fontWeight: 600 }}
          >
            View All
          </Button>
        </Box>
      )}
    </Menu>
  );
};

export default NotificationPopup;
