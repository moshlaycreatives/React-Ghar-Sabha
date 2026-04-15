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





const Root = styled(Box)(() => ({
    backgroundColor: "#FCF6F2",
    flexGrow: 1,
    height: "100vh",
    overflowY: "auto",
    boxSizing: "border-box",
    // Keep top spacing smooth across screen sizes instead of abrupt breakpoint jumps.
    paddingTop: "clamp(100px, 11vh, 120px)",
    paddingRight: "clamp(15px, 2.5vw, 30px)",
    paddingBottom: "clamp(15px, 2.5vw, 30px)",
    paddingLeft: "clamp(15px, 2.5vw, 25px)",
}));

const AdminPortal = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <Nav menuData={menuData} />
            <Root component="main">
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
            </Root>
        </Box>
    );
};

export default AdminPortal;