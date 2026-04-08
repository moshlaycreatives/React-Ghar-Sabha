import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
    DashboardPageHeader,
} from "../../../components/DashboardPageHeader.jsx";
import { ResourcePreviewCard } from "../../../components/ResourcePreviewCard.jsx";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import toast from "react-hot-toast";






const Event = () => {
    const navigate = useNavigate();
    const [EventDetailData, setEventDetailData] = useState(null);

    const handleDetail = (id) => {
        navigate("/dashboard/events-detail", { state: { id } });
    };





    const GetAllEvent = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.AdminCreateNewEvent}?status=true`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setEventDetailData(response?.data?.data?.events || []);
        } catch (error) {
            setEventDetailData([]);
            toast.error(error.response?.data?.message || "Failed to fetch Event");
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
                accentSegment="Events History"

            />

            <Grid container spacing={2} sx={{ mt: { xs: 1, md: 2 } }}>
                {EventDetailData?.map((ev) => (
                    <Grid key={ev.id} size={{ xs: 12, sm: 6, md: 3 }}>
                        <ResourcePreviewCard
                            variant="event"
                            image={ev.image}
                            title={ev.name}
                            subtitle={`${ev.country} - ${ev.state} - ${ev.city}`}
                            footer={formatDateRange(ev.startDate, ev.endDate)}
                            onView={() => handleDetail(ev.id)}

                        />
                    </Grid>
                ))}
            </Grid>



        </>
    );
};

export default Event;
