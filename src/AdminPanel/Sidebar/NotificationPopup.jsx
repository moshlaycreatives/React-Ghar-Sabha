import React, { useEffect, useState } from "react";
import { Box, Typography, Menu, Divider, Button, CircularProgress } from "@mui/material";
import { getApiErrorMessage } from "../../utils/apiErrorMessage";
import axios from "axios";
import { endpoints } from "../../apiEndpoints";
import toast from "react-hot-toast";

function formatRelativeTime(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  const now = Date.now();
  const diffSec = Math.floor((now - date.getTime()) / 1000);
  if (diffSec < 60) return "Just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} min${diffMin === 1 ? "" : "s"} ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
  return date.toLocaleDateString();
}

const NotificationPopup = ({ anchorEl, open, handleClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [markingAllRead, setMarkingAllRead] = useState(false);

  const hasUnread = notifications.some((n) => !n.isRead);

  useEffect(() => {
    if (!open) {
      setShowAll(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(endpoints.GetAllNotification, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const list = response?.data?.data?.notifications;
        setNotifications(Array.isArray(list) ? list : []);
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Could not load notification"));
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [open]);

  const handleMarkAllRead = async () => {
    if (!hasUnread || markingAllRead) return;
    setMarkingAllRead(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        endpoints.MarkAllNotificationsRead,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not mark notifications as read"));
    } finally {
      setMarkingAllRead(false);
    }
  };

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 4);

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
          component="button"
          type="button"
          onClick={handleMarkAllRead}
          disabled={!hasUnread || loading || markingAllRead}
          sx={{
            fontSize: "13px",
            color: hasUnread && !loading ? "#F36100" : "#B0B0B0",
            cursor: hasUnread && !loading && !markingAllRead ? "pointer" : "default",
            fontWeight: 500,
            border: "none",
            background: "none",
            padding: 0,
            fontFamily: "inherit",
            "&:hover": {
              textDecoration: hasUnread && !markingAllRead ? "underline" : "none",
            },
          }}
        >
          {markingAllRead ? "Saving…" : "Mark all read"}
        </Typography>
      </Box>
      <Divider sx={{ mb: 1 }} />

      <Box sx={{ maxHeight: showAll ? "400px" : "auto", overflowY: showAll ? "auto" : "visible" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
            <CircularProgress size={28} sx={{ color: "#F36100" }} />
          </Box>
        ) : displayedNotifications.length === 0 ? (
          <Typography sx={{ fontSize: "13px", color: "#6D6E71", textAlign: "center", py: 2, px: 1 }}>
            No notifications yet
          </Typography>
        ) : (
          displayedNotifications.map((notif, index) => (
            <React.Fragment key={notif.id}>
              <Box
                sx={{
                  p: 1,
                  backgroundColor: notif.isRead ? "transparent" : "rgba(243, 97, 0, 0.06)",
                  "&:hover": { backgroundColor: notif.isRead ? "#F9F9F9" : "rgba(243, 97, 0, 0.1)" },
                  borderRadius: "8px",
                  cursor: "pointer",
                  borderLeft: notif.isRead ? "none" : "3px solid #F36100",
                  pl: notif.isRead ? 1 : 0.75,
                }}
              >
                <Typography sx={{ fontSize: "14px", fontWeight: notif.isRead ? 500 : 600, color: "#1A1A1A" }}>
                  {notif.title}
                </Typography>
                <Typography sx={{ fontSize: "12px", color: "#6D6E71" }}>{notif.message}</Typography>
                <Typography sx={{ fontSize: "10px", color: "#999", mt: 0.5 }}>
                  {formatRelativeTime(notif.createdAt)}
                </Typography>
              </Box>
              {index < displayedNotifications.length - 1 && (
                <Divider variant="inset" component="li" sx={{ listStyle: "none", my: 0.5 }} />
              )}
            </React.Fragment>
          ))
        )}
      </Box>

      {!showAll && notifications.length > 4 && (
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
