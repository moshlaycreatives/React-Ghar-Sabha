import { useState, useEffect } from "react";
import { Box, Grid, MenuItem, TextField, Typography, CircularProgress } from "@mui/material";
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

// Reverse mapping for loading data
const REVERSE_DONATION_TYPE_VALUES = {
    "Item-Based Donation": DONATION_TYPES.ITEM,
    "Amount-Based Donation": DONATION_TYPES.AMOUNT,
};

const fieldLabelSx = {
    fontWeight: 400,
    fontSize: "14px",
    color: "text.primary",
    mb: 0.75,
};

const EditDonation = ({ open = false, onClose, onUpdate, donationId }) => {
    const {
        fileInputRef,
        file,
        previewUrl,
        handleZoneClick,
        handleFileChange,
        setPreviewUrl,
        reset: resetImage,
    } = useImageFilePicker();

    const [donationTitle, setDonationTitle] = useState("");
    const [donationType, setDonationType] = useState("");
    const [productName, setProductName] = useState("");
    const [eachProductPrice, setEachProductPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [donationAmount, setDonationAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [initialImageUrl, setInitialImageUrl] = useState("");

    const fetchDonationDetails = async () => {
        if (!donationId) return;
        setFetching(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${endpoints.AdminDonations}/${donationId}`, {
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

            const data = response.data?.data?.donation;
            if (data) {
                setDonationTitle(data.title || "");
                const type = REVERSE_DONATION_TYPE_VALUES[data.donationType] || "";
                setDonationType(type);

                if (type === DONATION_TYPES.ITEM) {
                    setProductName(data.itemName || "");
                    setEachProductPrice(data.price?.toString() || "");
                    setQuantity(data.totalItems?.toString() || "");
                    setDonationAmount("");
                } else {
                    setDonationAmount(data.price?.toString() || "");
                    setProductName("");
                    setEachProductPrice("");
                    setQuantity("");
                }

                setInitialImageUrl(data.image || "");
                setPreviewUrl(data.image || "");
            }
        } catch (error) {
            console.error(error);
            toast.error(getApiErrorMessage(error, "Failed to load donation details"));
            onClose?.();
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        if (open && donationId) {
            fetchDonationDetails();
        }
    }, [open, donationId]);

    const handleClose = () => {
        resetForm();
        onClose?.();
    };

    const resetForm = () => {
        resetImage();
        setDonationTitle("");
        setDonationType("");
        setProductName("");
        setEachProductPrice("");
        setQuantity("");
        setDonationAmount("");
        setInitialImageUrl("");
        setLoading(false);
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

    const canUpdateDonation =
        !loading &&
        !fetching &&
        donationTitle.trim().length > 0 &&
        Boolean(donationType) &&
        (donationType === DONATION_TYPES.ITEM
            ? productName.trim().length > 0 &&
            eachProductPrice.toString().trim().length > 0 &&
            quantity.toString().trim().length > 0
            : donationType === DONATION_TYPES.AMOUNT
                ? donationAmount.toString().trim().length > 0
                : false);

    const handleUpdateDonation = async () => {
        if (!canUpdateDonation) return;

        setLoading(true);
        const toastId = toast.loading("Updating donation...");

        try {
            const token = localStorage.getItem("token");

            let imageUrl = initialImageUrl;
            // 1. Upload Image only if a new file is selected
            if (file) {
                const uploadRes = await uploadSingleMedia(file, { path: "donations" });
                imageUrl = uploadRes.url;
                if (!imageUrl) {
                    throw new Error("Failed to upload image.");
                }
            }

            // 2. Prepare Payload
            const payload = {
                title: donationTitle.trim(),
                image: imageUrl,
                donationType: DONATION_TYPE_VALUES[donationType],
                price: donationType === DONATION_TYPES.ITEM ? eachProductPrice.toString().trim() : donationAmount.toString().trim(),
            };

            if (donationType === DONATION_TYPES.ITEM) {
                payload.itemName = productName.trim();
                payload.totalItems = quantity.toString().trim();
            }

            // 3. Update Donation
            const response = await axios.patch(
                `${endpoints.AdminDonations}/${donationId}`,
                payload,
                {
                    headers: {
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                }
            );

            toast.success(response.data?.message || "Donation updated successfully", { id: toastId });
            onUpdate?.();
            handleClose();
        } catch (error) {
            console.error(error);
            toast.error(getApiErrorMessage(error, "Could not update donation"), { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormDialogFrame
            open={open}
            onClose={handleClose}
            title="Edit Donation"
            titleFontSize="18px"
            bodyPaddingTop={1}
        >
            {fetching ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                    <CircularProgress size={40} />
                </Box>
            ) : (
                <>
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
                                        return DONATION_TYPE_VALUES[selected];
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
                            disabled={!canUpdateDonation}
                            onClick={handleUpdateDonation}
                        >
                            Update Donation
                        </FormSubmitButton>
                    </Box>
                </>
            )}
        </FormDialogFrame>
    );
};

export default EditDonation;
