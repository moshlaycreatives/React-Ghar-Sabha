import { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
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





const DonationHistory = () => {
    const navigate = useNavigate();
    const [DonationDetailData, setDonationDetailData] = useState(null);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const menuOpen = Boolean(menuAnchor);
    const [addDonationOpen, setAddDonationOpen] = useState(false);
    const [editDonationOpen, setEditDonationOpen] = useState(false);
    const [deleteDonationOpen, setDeleteDonationOpen] = useState(false);
    const [selectedDonationId, setSelectedDonationId] = useState(null);
    const [listLoaded, setListLoaded] = useState(false);

    const donations = DonationDetailData?.donations ?? [];

    const handleMenuOpen = (e, id) => {
        e.stopPropagation();
        setMenuAnchor(e.currentTarget);
        setSelectedDonationId(id);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const handleEditClick = () => {
        setEditDonationOpen(true);
        handleMenuClose();
    };

    const handleDeleteClick = () => {
        setDeleteDonationOpen(true);
        handleMenuClose();
    };

    const handleDetail = (id) => {
        navigate(`/dashboard/donation-detail/${id}`);
    };


    const GetAllDonation = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.AdminDonations}?status=true`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setDonationDetailData(response?.data?.data ?? { donations: [] });
        } catch (error) {
            setDonationDetailData({ donations: [] });
            toast.error(getApiErrorMessage(error, "Could not load donation history"));
        } finally {
            setListLoaded(true);
        }
    };


    useEffect(() => {
        GetAllDonation();
    }, []);



    const formatCurrency = (val) => {
        return Number(val).toLocaleString('en-IN', {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
        });
    };

    return (
        <>
            <DashboardPageHeader accentSegment="Other Donation History" />

            <Grid container spacing={2} sx={{ mt: { xs: 1, md: 2 } }}>
                {!listLoaded ? (
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ borderRadius: "20px", bgcolor: "white", py: 6 }}>
                            <ListEmptyPlaceholder title="Loading…" minHeight={120} />
                        </Box>
                    </Grid>
                ) : donations.length === 0 ? (
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ borderRadius: "20px", bgcolor: "white" }}>
                            <ListEmptyPlaceholder
                                title="No donation history available"
                                description="There are no completed donations to show yet."
                            />
                        </Box>
                    </Grid>
                ) : (
                donations.map((ev) => (
                    <Grid key={ev.id} size={{ xs: 12, sm: 6, md: 3 }}>
                        <ResourcePreviewCard
                            variant="donation"
                            image={ev.image}
                            title={ev.title}
                            subtitle={
                                ev.donationType === "Item-Based Donation"
                                    ? `${ev.donatedItems}/${ev.totalItems} Donated`
                                    : ""
                            }
                            footer={
                                ev.donationType === "Item-Based Donation"
                                    ? `Price: ₹${formatCurrency(ev.price)} / ${ev.itemName}`
                                    : `₹${formatCurrency(ev.raisedAmount)}/₹${formatCurrency(ev.price)} Donated`
                            }
                          
                            onView={() => handleDetail(ev?._id || ev?.id)}
                        />
                    </Grid>
                ))
                )}
            </Grid>


        </>
    );
};

export default DonationHistory;
