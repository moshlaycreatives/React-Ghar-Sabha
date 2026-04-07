import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
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





const Donations = () => {
    const navigate = useNavigate();
    const [DonationDetailData, setDonationDetailData] = useState(null);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const menuOpen = Boolean(menuAnchor);
    const [addDonationOpen, setAddDonationOpen] = useState(false);
    const [editDonationOpen, setEditDonationOpen] = useState(false);
    const [deleteDonationOpen, setDeleteDonationOpen] = useState(false);
    const [selectedDonationId, setSelectedDonationId] = useState(null);

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


    const handleCompleteClick = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`${endpoints.AdminDonations}/${selectedDonationId}/status`, { status: true }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Donation completed successfully");
            GetAllDonation();
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
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
            const response = await axios.get(`${endpoints.AdminDonations}?status=false`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setDonationDetailData(response?.data?.data || []);
        } catch (error) {
            setDonationDetailData([]);
            toast.error(error.response?.data?.message);
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
                {DonationDetailData?.donations?.map((ev) => (
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
                            onMenuOpen={(e) => handleMenuOpen(e, ev?._id || ev?.id)}
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
                onEdit={handleEditClick}
                onComplete={handleCompleteClick}
                onDelete={handleDeleteClick}
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
        </>
    );
};

export default Donations;
