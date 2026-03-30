import { useState } from "react";
import { Box, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import CreateEventPopup from "./CreateEventPopup.jsx";
import {
    DashboardPageHeader,
    DashboardToolbarButton,
} from "../../../components/DashboardPageHeader.jsx";
import { ResourcePreviewCard } from "../../../components/ResourcePreviewCard.jsx";
import { CardOptionsMenu } from "../../../components/CardOptionsMenu.jsx";

// Mock data — replace with Events page API when ready (e.g. GET /events)
const eventsData = [
    {
        id: "1",
        image: "/image/Deventimage.png",
        title: "Lorem Ipsum is simply dummy",
        location: "India - Gujraat - Ahmadabad",
        dateRange: "16 Mar 2026 - 20 Mar 2026",
    },
    {
        id: "2",
        image: "/image/Deventimage.png",
        title: "Lorem Ipsum is simply dummy",
        location: "India - Gujraat - Ahmadabad",
        dateRange: "16 Mar 2026 - 20 Mar 2026",
    },
    {
        id: "3",
        image: "/image/Deventimage.png",
        title: "Lorem Ipsum is simply dummy",
        location: "India - Gujraat - Ahmadabad",
        dateRange: "16 Mar 2026 - 20 Mar 2026",
    },
    {
        id: "4",
        image: "/image/Deventimage.png",
        title: "Lorem Ipsum is simply dummy",
        location: "India - Gujraat - Ahmadabad",
        dateRange: "16 Mar 2026 - 20 Mar 2026",
    },
];

const Event = () => {
    const navigate = useNavigate();
    const [menuAnchor, setMenuAnchor] = useState(null);
    const menuOpen = Boolean(menuAnchor);
    const [createEventOpen, setCreateEventOpen] = useState(false);

    const handleMenuOpen = (e) => {
        e.stopPropagation();
        setMenuAnchor(e.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const handleDetail = () => {
        navigate("/dashboard/events-detail");
    };

    return (
        <>
            <DashboardPageHeader
                accentSegment="Events"
                action={
                    <DashboardToolbarButton
                        startIcon={<AddIcon />}
                        onClick={() => setCreateEventOpen(true)}
                    >
                        Create Event
                    </DashboardToolbarButton>
                }
            />

            <Grid container spacing={2} sx={{ mt: { xs: 1, md: 2 } }}>
                {eventsData.map((ev) => (
                    <Grid key={ev.id} size={{ xs: 12, sm: 6, md: 3 }}>
                        <ResourcePreviewCard
                            variant="event"
                            image={ev.image}
                            title={ev.title}
                            subtitle={ev.location}
                            footer={ev.dateRange}
                            onMenuOpen={handleMenuOpen}
                            onView={handleDetail}
                            menuAriaLabel="Event options"
                            viewAriaLabel="View event"
                        />
                    </Grid>
                ))}
            </Grid>

            <CreateEventPopup
                open={createEventOpen}
                onClose={() => setCreateEventOpen(false)}
                onCreateEvent={() => {
                    // Wire Events API here (separate from other pages)
                }}
            />

            <CardOptionsMenu
                anchorEl={menuAnchor}
                open={menuOpen}
                onClose={handleMenuClose}
            />
        </>
    );
};

export default Event;
