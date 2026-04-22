import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { MutationLoadingOverlay } from "../../../components/MutationLoadingOverlay.jsx";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import AddDonationPopup from "./AddDonationPopup";
import EditDonation from "./EditDonation";
import DeleteDonation from "./DeleteDonation";
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





const Donations = () => {
    const navigate = useNavigate();
    const [DonationDetailData, setDonationDetailData] = useState(null);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const menuOpen = Boolean(menuAnchor);
    const [addDonationOpen, setAddDonationOpen] = useState(false);
    const [editDonationOpen, setEditDonationOpen] = useState(false);
    const [deleteDonationOpen, setDeleteDonationOpen] = useState(false);
    const [selectedDonationId, setSelectedDonationId] = useState(null);
    const [selectedDonationInactive, setSelectedDonationInactive] = useState(false);
    const [listLoaded, setListLoaded] = useState(false);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    const donations = DonationDetailData?.donations ?? [];

    const handleMenuOpen = (e, id, inactive = false) => {
        e.stopPropagation();
        setMenuAnchor(e.currentTarget);
        setSelectedDonationId(id);
        setSelectedDonationInactive(Boolean(inactive));
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const handleEditClick = () => {
        setEditDonationOpen(true);
        handleMenuClose();
    };


    const handleCompleteClick = async () => {
        handleMenuClose();
        setIsUpdatingStatus(true);
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`${endpoints.AdminDonations}/${selectedDonationId}/status`, { status: true }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Donation completed successfully");
            GetAllDonation();
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Could not update donation status"));
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    const handleDeleteClick = () => {
        setDeleteDonationOpen(true);
        handleMenuClose();
    };

    /** PATCH /api/admin/donations/:id/inactive — body `{ inactive }`
     *  Deactive click (item active): send `inactive: true`
     *  Active click (item inactive): send `inactive: false` */
    const handleInactiveToggle = async () => {
        handleMenuClose();
        const inactivePayload = selectedDonationInactive ? false : true;
        setIsUpdatingStatus(true);
        try {
            const token = localStorage.getItem("token");
            await axios.patch(
                endpoints.AdminDonationInactive(selectedDonationId),
                { inactive: inactivePayload },
                { headers: { Authorization: `Bearer ${token}` } },
            );
            toast.success(inactivePayload ? "Donation deactivated" : "Donation activated");
            GetAllDonation();
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Could not update donation active status"));
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    const handleDetail = (id) => {
        navigate(`/dashboard/donation-detail/${id}`);
    };


    const GetAllDonation = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.AdminDonations}?status=false`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setDonationDetailData(response?.data?.data ?? { donations: [] });
        } catch (error) {
            setDonationDetailData({ donations: [] });
            toast.error(getApiErrorMessage(error, "Could not load donations"));
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
        <Box sx={{ position: "relative", minHeight: "100%" }}>
            <MutationLoadingOverlay open={isUpdatingStatus} />
            <DashboardPageHeader
                accentSegment="Other Donations"
                action={
                    <DashboardToolbarButton
                        startIcon={<AddIcon />}
                        onClick={() => setAddDonationOpen(true)}
                    >
                        Add Donation
                    </DashboardToolbarButton>
                }
            />

            <Grid container spacing={2} sx={{ mt: { xs: 1, md: 2 } }}>
                {!listLoaded ? (
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ borderRadius: "20px", bgcolor: "white", py: 6 }}>
                            <ListEmptyPlaceholder title="Loading…" description={null} minHeight={120} />
                        </Box>
                    </Grid>
                ) : donations.length === 0 ? (
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ borderRadius: "20px", bgcolor: "white" }}>
                            <ListEmptyPlaceholder
                                title="No donations available"
                                description="There are no active donation campaigns right now. Create one with Add Donation."
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
                                    ? `Price: $${formatCurrency(ev.price)} / ${ev.itemName}`
                                    : `$${formatCurrency(ev.raisedAmount)}/$${formatCurrency(ev.price)} Donated`
                            }
                            onMenuOpen={(e) =>
                                handleMenuOpen(e, ev?._id || ev?.id, ev?.inactive)
                            }
                            onView={() => handleDetail(ev?._id || ev?.id)}
                            menuAriaLabel="Donation options"
                            viewAriaLabel="View donation"
                        />
                    </Grid>
                ))
                )}
            </Grid>

            <CardOptionsMenu
                anchorEl={menuAnchor}
                open={menuOpen}
                onClose={handleMenuClose}
                onEdit={handleEditClick}
                onComplete={handleCompleteClick}
                onDelete={handleDeleteClick}
                inactive={selectedDonationInactive}
                onInactiveToggle={handleInactiveToggle}
            />

            <AddDonationPopup
                open={addDonationOpen}
                onClose={() => setAddDonationOpen(false)}
                onAddDonation={GetAllDonation}
            />

            <EditDonation
                open={editDonationOpen}
                onClose={() => setEditDonationOpen(false)}
                onUpdate={GetAllDonation}
                donationId={selectedDonationId}
            />

            <DeleteDonation
                open={deleteDonationOpen}
                onClose={() => setDeleteDonationOpen(false)}
                onDelete={GetAllDonation}
                id={selectedDonationId}
            />
        </Box>
    );
};

export default Donations;
