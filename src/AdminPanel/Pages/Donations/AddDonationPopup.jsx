import { useState } from "react";
import { Box, CircularProgress, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { FormDialogFrame } from "../../../components/FormDialogFrame.jsx";
import { ImageUploadZone } from "../../../components/ImageUploadZone.jsx";
import { FormSubmitButton } from "../../../components/FormSubmitButton.jsx";
import { useImageFilePicker } from "../../../hooks/useImageFilePicker.js";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../../utils/apiErrorMessage.js";
import { uploadSingleMedia } from "../../../api/uploadMedia.js";

const DONATION_TYPES = {
    ITEM: "ITEM",
    AMOUNT: "AMOUNT",
};

const DONATION_TYPE_VALUES = {
    [DONATION_TYPES.ITEM]: "Item-Based Donation",
    [DONATION_TYPES.AMOUNT]: "Amount-Based Donation",
};

const fieldLabelSx = {
    fontWeight: 400,
    fontSize: "14px",
    color: "text.primary",
    mb: 0.75,
};

const AddDonationPopup = ({ open = false, onClose, onAddDonation }) => {

    const {
        fileInputRef,
        file,
        previewUrl,
        handleZoneClick,
        handleFileChange,
        reset: resetImage,
    } = useImageFilePicker();

    const [donationTitle, setDonationTitle] = useState("");
    const [donationType, setDonationType] = useState("");

    const [productName, setProductName] = useState("");
    const [eachProductPrice, setEachProductPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    const [donationAmount, setDonationAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        resetImage();

        setDonationTitle("");
        setDonationType("");

        setProductName("");
        setEachProductPrice("");
        setQuantity("");

        setDonationAmount("");
        setLoading(false);
    };

    const handleClose = () => {
        resetForm();
        onClose?.();
    };

    const handleDonationTypeChange = (nextType) => {
        setDonationType(nextType);

        if (nextType === DONATION_TYPES.ITEM) {
            setDonationAmount("");
        } else if (nextType === DONATION_TYPES.AMOUNT) {
            setProductName("");
            setEachProductPrice("");
            setQuantity("");
        }
    };

    const canAddDonation =
        !loading &&
        Boolean(file) &&
        donationTitle.trim().length > 0 &&
        Boolean(donationType) &&
        (donationType === DONATION_TYPES.ITEM
            ? productName.trim().length > 0 &&
            eachProductPrice.trim().length > 0 &&
            quantity.trim().length > 0
            : donationType === DONATION_TYPES.AMOUNT
                ? donationAmount.trim().length > 0
                : false);

    const handleCreateDonations = async () => {
        if (!canAddDonation) return;

        setLoading(true);
        const toastId = toast.loading("Adding donation...");

        try {
            const token = localStorage.getItem("token");

            // 1. Upload Image
            const { url: imageUrl } = await uploadSingleMedia(file, { path: "donations" });

            if (!imageUrl) {
                throw new Error("Failed to upload image.");
            }

            // 2. Prepare Payload
            const payload = {
                title: donationTitle.trim(),
                image: imageUrl,
                donationType: DONATION_TYPE_VALUES[donationType],
                price: donationType === DONATION_TYPES.ITEM ? eachProductPrice.trim() : donationAmount.trim(),
            };

            if (donationType === DONATION_TYPES.ITEM) {
                payload.itemName = productName.trim();
                payload.totalItems = quantity.trim();
            }

            // 3. Create Donation
            const response = await axios.post(
                endpoints.AdminDonations,
                payload,
                {
                    headers: {
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                }
            );

            toast.success(response.data?.message || "Donation added successfully", { id: toastId });
            onAddDonation?.();
            handleClose();
        } catch (error) {
            console.error(error);
            toast.error(getApiErrorMessage(error, "Could not add donation"), { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormDialogFrame
            open={open}
            onClose={handleClose}
            title="Add New Donation"
            titleFontSize="18px"
            bodyPaddingTop={1}
            loading={loading}
        >
            <Typography
                component="label"
                sx={{
                    display: "block",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "text.primary",
                    mb: 1.25,
                }}
            >
                Donation Image
                <Typography component="span" sx={{ color: "error.main" }}>
                    *
                </Typography>
            </Typography>

            <ImageUploadZone
                fileInputRef={fileInputRef}
                previewUrl={previewUrl}
                onZoneClick={handleZoneClick}
                onFileChange={handleFileChange}
                disabled={loading}
                minHeight={{ xs: 100, sm: 120 }}
                mb={2}
            />

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={fieldLabelSx}>Donation Title</Typography>
                    <TextField
                        fullWidth
                        placeholder="Enter donation title"
                        value={donationTitle}
                        disabled={loading}
                        onChange={(e) => setDonationTitle(e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                            },
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={fieldLabelSx}>Donation Type</Typography>
                    <TextField
                        select
                        fullWidth
                        value={donationType}
                        disabled={loading}
                        onChange={(e) =>
                            handleDonationTypeChange(e.target.value)
                        }
                        SelectProps={{
                            displayEmpty: true,
                            renderValue: (selected) => {
                                if (!selected) {
                                    return (
                                        <Typography
                                            sx={{
                                                fontWeight: 400,
                                                fontSize: "14px",
                                                color: "rgba(0,0,0,0.6)",
                                            }}
                                        >
                                            Select donation type
                                        </Typography>
                                    );
                                }
                                return selected;
                            },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                        }}
                    >
                        <MenuItem value="" disabled>
                            Select donation type
                        </MenuItem>
                        <MenuItem value={DONATION_TYPES.ITEM}>
                            Item-Based Donation
                        </MenuItem>
                        <MenuItem value={DONATION_TYPES.AMOUNT}>
                            Amount-Based Donation
                        </MenuItem>
                    </TextField>
                </Grid>
            </Grid>

            {donationType === DONATION_TYPES.ITEM && (
                <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography sx={fieldLabelSx}>Product Name</Typography>
                            <TextField
                                fullWidth
                                placeholder="Enter product name"
                                value={productName}
                                disabled={loading}
                                onChange={(e) => setProductName(e.target.value)}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "10px",
                                    },
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography sx={fieldLabelSx}>
                                Each Product Price
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Enter above product price"
                                value={eachProductPrice}
                                disabled={loading}
                                onChange={(e) =>
                                    setEachProductPrice(e.target.value)
                                }
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "10px",
                                    },
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography
                                sx={{
                                    ...fieldLabelSx,
                                    mt: 0.5,
                                }}
                            >
                                Quantity
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Enter quantity"
                                value={quantity}
                                disabled={loading}
                                onChange={(e) => setQuantity(e.target.value)}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "10px",
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            )}

            {donationType === DONATION_TYPES.AMOUNT && (
                <Box sx={{ mt: 2 }}>
                    <Typography sx={fieldLabelSx}>
                        Enter Donation Amount
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="Enter amount"
                        value={donationAmount}
                        disabled={loading}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                            },
                        }}
                    />
                </Box>
            )}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2.5,
                }}
            >
                <FormSubmitButton
                    disabled={!canAddDonation}
                    onClick={handleCreateDonations}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Add Donation"}
                </FormSubmitButton>
            </Box>
        </FormDialogFrame>
    );
};

export default AddDonationPopup;
