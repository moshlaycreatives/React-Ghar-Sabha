import { useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DashboardPageHeader } from "../../../components/DashboardPageHeader.jsx";
import { ResourcePreviewCard } from "../../../components/ResourcePreviewCard.jsx";
import { CardOptionsMenu } from "../../../components/CardOptionsMenu.jsx";




// Mock data — replace with Donation History page API when ready
const historyCards = [
    {
        id: "1",
        image: "/image/chair.png",
        title: "500 Chairs Needed for Ram Mandir",
        location: "250/500 Donated",
        dateRange: "Price: ₹2,000 / Chair",
    },
    {
        id: "2",
        image: "/image/chair.png",
        title: "500 Chairs Needed for Ram Mandir",
        location: "250/500 Donated",
        dateRange: "Price: ₹2,000 / Chair",
    },
    {
        id: "3",
        image: "/image/chair.png",
        title: "500 Chairs Needed for Ram Mandir",
        location: "250/500 Donated",
        dateRange: "Price: ₹2,000 / Chair",
    },
    {
        id: "4",
        image: "/image/chair.png",
        title: "500 Chairs Needed for Ram Mandir",
        location: "250/500 Donated",
        dateRange: "Price: ₹2,000 / Chair",
    },
];



const DonationHistory = () => {
    const navigate = useNavigate();
    const [menuAnchor, setMenuAnchor] = useState(null);
    const menuOpen = Boolean(menuAnchor);

    const handleMenuOpen = (e) => {
        e.stopPropagation();
        setMenuAnchor(e.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const handleDetail = (id) => {
        navigate(`/dashboard/donation-detail/${id}`);
    };

    return (
        <>
            <DashboardPageHeader accentSegment="Other Donation History" />

            <Grid container spacing={2} sx={{ mt: { xs: 1, md: 2 } }}>
                {historyCards.map((ev) => (
                    <Grid key={ev.id} size={{ xs: 12, sm: 6, md: 3 }}>
                        <ResourcePreviewCard
                            variant="donation"
                            image={ev.image}
                            title={ev.title}
                            subtitle={ev.location}
                            footer={ev.dateRange}
                            onMenuOpen={handleMenuOpen}
                            onView={() => handleDetail(ev?._id || ev?.id)}
                            menuAriaLabel="Donation options"
                            viewAriaLabel="View donation"
                        />
                    </Grid>
                ))}
            </Grid>

            <CardOptionsMenu
                anchorEl={menuAnchor}
                open={menuOpen}
                onClose={handleMenuClose}
            />
        </>
    );
};

export default DonationHistory;
