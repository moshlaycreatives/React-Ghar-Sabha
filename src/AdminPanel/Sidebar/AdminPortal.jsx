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






const Root = styled(Box)(({ theme }) => ({
    backgroundColor: "#FCF6F2",
    width: "100%",
    minHeight: "100vh",
    height: "auto",
    boxSizing: "border-box",
    padding: "70px 24px 0px 330px",
    [theme.breakpoints.down("lg")]: {
        padding: "40px 24px 24px 24px",
    },
    [theme.breakpoints.down("sm")]: {
        margin: "20px 0px 0px 0px",
    },
}));

const AdminPortal = () => {
    return (
        <Fragment>
            <Nav menuData={menuData} />
            <Root>
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
                    <Route path="add-temple" element={<AddTemple />} />
                    <Route path="edit-temple/:id" element={<EditTemple />} />


                </Routes>
            </Root>
        </Fragment>
    );
};

export default AdminPortal;
