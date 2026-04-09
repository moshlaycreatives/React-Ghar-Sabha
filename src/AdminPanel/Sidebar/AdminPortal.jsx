import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Nav from "./Nav";
import menuData from "./menuData";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Members from "../Pages/Members/Members";
import Chats from "../Pages/Chats/Chats";
import Event from "../Pages/Events/Events";
import Temples from "../Pages/Temples/Temples";
import Donations from "../Pages/Donations/Donations";
import TempleDonations from "../Pages/TempleDonations/TempleDonations";
import DonationHistory from "../Pages/DonationHistory/DonationHistory";
import EventBanners from "../Pages/EventBanners/EventBanners";
import MemberDetail from "../Pages/Members/MemberDetail";
import EventsDetail from "../Pages/Events/EventsDetail";
import DonationsDetail from "../Pages/Donations/DonationsDetail";
import AddTemple from "../Pages/Temples/AddTemple";
import EditTemple from "../Pages/Temples/EditTemple";
import LiveStream from "../Pages/LiveStream/LiveStream";
import EventHistory from "../Pages/EventHistory/EventHistory";





const Root = styled(Box)(({ theme }) => ({
    backgroundColor: "#FCF6F2",
    flexGrow: 1,
    height: "100vh",
    overflowY: "auto",
    boxSizing: "border-box",
    // Desktop: Sidebar Box takes 310px, we add 25px gap via padding
    padding: "130px 30px 30px 25px",
    [theme.breakpoints.up("xl")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    [theme.breakpoints.down("lg")]: {
        // Below LG: Sidebar is temporary, so we use full standard padding
        padding: "120px 24px 24px 24px",
    },
    [theme.breakpoints.down("md")]: {
        padding: "115px 20px 20px 20px",
    },
    [theme.breakpoints.down("sm")]: {
        padding: "110px 15px 15px 15px",
    },
}));

const AdminPortal = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <Nav menuData={menuData} />
            <Root component="main">
                <Box sx={{
                    width: "100%",
                    maxWidth: "1600px",
                    margin: "0 auto"
                }}>
                    <Routes>
                        <Route path="" element={<Dashboard />} />
                        <Route path="members" element={<Members />} />
                        <Route path="chats" element={<Chats />} />
                        <Route path="events" element={<Event />} />
                        <Route path="temples" element={<Temples />} />
                        <Route path="donations" element={<Donations />} />
                        <Route path="temple-donations" element={<TempleDonations />} />
                        <Route path="donation-history" element={<DonationHistory />} />
                        <Route path="event-banners" element={<EventBanners />} />
                        <Route path="member-detail" element={<MemberDetail />} />
                        <Route path="events-detail" element={<EventsDetail />} />
                        <Route path="donation-detail" element={<DonationsDetail />} />
                        <Route path="donation-detail/:id" element={<DonationsDetail />} />
                        <Route path="add-temple" element={<AddTemple />} />
                        <Route path="edit-temple/:id" element={<EditTemple />} />
                        <Route path="live-stream" element={<LiveStream />} />
                        <Route path="event-history" element={<EventHistory />} />
                    </Routes>
                </Box>
            </Root>
        </Box>
    );
};

export default AdminPortal;
