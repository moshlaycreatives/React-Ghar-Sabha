import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import CreateEventPopup from "./CreateEventPopup.jsx";
import EditEvent from "./EditEvent.jsx";
import DeleteEvent from "./DeleteEvent.jsx";
import {
    DashboardPageHeader,
    DashboardToolbarButton,
} from "../../../components/DashboardPageHeader.jsx";
import { ResourcePreviewCard } from "../../../components/ResourcePreviewCard.jsx";
import { CardOptionsMenu } from "../../../components/CardOptionsMenu.jsx";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../../utils/apiErrorMessage.js";
import { ListEmptyPlaceholder } from "../../../components/ListEmptyPlaceholder.jsx";






const Event = () => {
    const navigate = useNavigate();
    const [EventDetailData, setEventDetailData] = useState(null);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const menuOpen = Boolean(menuAnchor);
    const [createEventOpen, setCreateEventOpen] = useState(false);
    const [editEventOpen, setEditEventOpen] = useState(false);
    const [deleteEventOpen, setDeleteEventOpen] = useState(false);
    const [listLoaded, setListLoaded] = useState(false);

    const events = Array.isArray(EventDetailData) ? EventDetailData : [];

    const handleMenuOpen = (e, id) => {
        e.stopPropagation();
        setMenuAnchor(e.currentTarget);
        setSelectedEventId(id);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const handleDetail = (id) => {
        navigate("/dashboard/events-detail", { state: { id } });
    };

    const handleEdit = () => {
        setEditEventOpen(true);
    };

    const handleDelete = () => {
        setDeleteEventOpen(true);
    };



    const GetAllEvent = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.AdminCreateNewEvent}?status=false`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setEventDetailData(response?.data?.data?.events || []);
        } catch (error) {
            setEventDetailData([]);
            toast.error(getApiErrorMessage(error, "Failed to load events"));
        } finally {
            setListLoaded(true);
        }
    };


    useEffect(() => {
        GetAllEvent();
    }, []);


    // Helper for date range
    const formatDateRange = (start, end) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const s = new Date(start).toLocaleDateString('en-GB', options);
        const e = new Date(end).toLocaleDateString('en-GB', options);
        return `${s} - ${e}`;
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
                {!listLoaded ? (
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ borderRadius: "20px", bgcolor: "white", py: 6 }}>
                            <ListEmptyPlaceholder title="Loading…" minHeight={120} />
                        </Box>
                    </Grid>
                ) : events.length === 0 ? (
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ borderRadius: "20px", bgcolor: "white" }}>
                            <ListEmptyPlaceholder
                                title="No events available"
                                description="There are no upcoming events. Create an event to see it here."
                            />
                        </Box>
                    </Grid>
                ) : (
                events.map((ev) => (
                    <Grid key={ev.id} size={{ xs: 12, sm: 6, md: 3 }}>
                        <ResourcePreviewCard
                            variant="event"
                            image={ev.image}
                            title={ev.name}
                            subtitle={`${ev.country} - ${ev.state} - ${ev.city}`}
                            footer={formatDateRange(ev.startDate, ev.endDate)}
                            onMenuOpen={(e) => handleMenuOpen(e, ev.id || ev._id)}
                            onView={() => handleDetail(ev.id)}
                            menuAriaLabel="Event options"
                            viewAriaLabel="View event"
                        />
                    </Grid>
                ))
                )}
            </Grid>

            <CreateEventPopup
                open={createEventOpen}
                onClose={() => setCreateEventOpen(false)}
                onCreateEvent={() => {
                    GetAllEvent();
                }}
            />

            <EditEvent
                open={editEventOpen}
                eventId={selectedEventId}
                onClose={() => {
                    setEditEventOpen(false);
                    setSelectedEventId(null);
                }}
                onUpdateEvent={() => {
                    GetAllEvent();
                }}
            />

            <DeleteEvent
                open={deleteEventOpen}
                id={selectedEventId}
                onClose={() => {
                    setDeleteEventOpen(false);
                    setSelectedEventId(null);
                }}
                onDelete={() => {
                    GetAllEvent();
                }}
            />

            <CardOptionsMenu
                anchorEl={menuAnchor}
                open={menuOpen}
                onClose={handleMenuClose}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </>
    );
};

export default Event;
