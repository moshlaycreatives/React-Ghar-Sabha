import { useRef, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    Grid,
    IconButton,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

const ACCENT = "#F36100";
const TEXT = "#2F2F2F";

const DONATION_TYPES = {
    ITEM: "ITEM",
    AMOUNT: "AMOUNT",
};

const AddDonationPopup = ({ open = false, onClose, onAddDonation }) => {
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const [donationTitle, setDonationTitle] = useState("");
    const [donationType, setDonationType] = useState("");

    // Item-based fields
    const [productName, setProductName] = useState("");
    const [eachProductPrice, setEachProductPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    // Amount-based fields
    const [donationAmount, setDonationAmount] = useState("");

    const resetForm = () => {
        setFile(null);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);

        setDonationTitle("");
        setDonationType("");

        setProductName("");
        setEachProductPrice("");
        setQuantity("");

        setDonationAmount("");
    };

    const handleClose = () => {
        resetForm();
        onClose?.();
    };

    const handleZoneClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const selected = e.target.files?.[0];
        if (!selected) return;

        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setFile(selected);
        setPreviewUrl(URL.createObjectURL(selected));

        // allow re-selecting same file
        e.target.value = "";
    };

    const handleDonationTypeChange = (nextType) => {
        setDonationType(nextType);

        // Clear irrelevant values when switching types.
        if (nextType === DONATION_TYPES.ITEM) {
            setDonationAmount("");
        } else if (nextType === DONATION_TYPES.AMOUNT) {
            setProductName("");
            setEachProductPrice("");
            setQuantity("");
        }
    };

    const canAddDonation =
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

    const handleAddDonation = () => {
        if (!canAddDonation) return;

        onAddDonation?.({
            file,
            donationTitle: donationTitle.trim(),
            donationType,
            productName: productName.trim(),
            eachProductPrice: eachProductPrice.trim(),
            quantity: quantity.trim(),
            donationAmount: donationAmount.trim(),
        });

        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: "12px",
                        boxShadow: "0px 8px 32px rgba(47, 47, 47, 0.12)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        maxHeight: {
                            xs: "calc(100dvh - 16px)",
                            sm: "calc(100dvh - 32px)",
                        },
                        m: { xs: 1, sm: 2 },
                    },
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexShrink: 0,
                    px: 2.5,
                    pt: 2.5,
                    pb: 1.5,
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "Inter",
                        fontWeight: 500,
                        fontSize: "18px",
                        color: TEXT,
                    }}
                >
                    Add New Donation
                </Typography>

                <IconButton
                    onClick={handleClose}
                    size="small"
                    aria-label="close"
                    sx={{
                        bgcolor: "rgba(47, 47, 47, 0.06)",
                        "&:hover": { bgcolor: "rgba(47, 47, 47, 0.1)" },
                    }}
                >
                    <CloseIcon sx={{ fontSize: 20, color: TEXT }} />
                </IconButton>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    minHeight: 0,
                    overflowY: "auto",
                    overflowX: "hidden",
                    WebkitOverflowScrolling: "touch",
                    px: 2.5,
                    pt: 1,
                    pb: 2,
                }}
            >
                <Typography
                    component="label"
                    sx={{
                        display: "block",
                        fontFamily: "Inter",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: TEXT,
                        mb: 1.25,
                    }}
                >
                    Donation Image
                    <span style={{ color: "#ED4040" }}>*</span>
                </Typography>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                />

                <Box
                    onClick={handleZoneClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleZoneClick();
                        }
                    }}
                    sx={{
                        border: "2px dashed rgba(47, 47, 47, 0.2)",
                        borderRadius: "10px",
                        minHeight: { xs: 100, sm: 120 },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        bgcolor: "rgba(47, 47, 47, 0.02)",
                        overflow: "hidden",
                        mb: 2,
                        "&:hover": {
                            borderColor: "rgba(243, 97, 0, 0.45)",
                            bgcolor: "rgba(243, 97, 0, 0.03)",
                        },
                    }}
                >
                    {previewUrl ? (
                        <Box
                            component="img"
                            src={previewUrl}
                            alt="Donation preview"
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    ) : (
                        <>
                            <CloudUploadOutlinedIcon
                                sx={{
                                    fontSize: 48,
                                    color: "rgba(47, 47, 47, 0.35)",
                                    mb: 1,
                                }}
                            />
                            <Typography
                                sx={{
                                    fontFamily: "Inter",
                                    fontWeight: 500,
                                    fontSize: "15px",
                                    color: "rgba(47, 47, 47, 0.55)",
                                }}
                            >
                                Upload Image
                            </Typography>
                        </>
                    )}
                </Box>

                <Grid container spacing={2}>
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Typography
                            sx={{
                                fontFamily: "Inter",
                                fontWeight: 400,
                                fontSize: "14px",
                                color: TEXT,
                                mb: 0.75,
                            }}
                        >
                            Donation Title
                        </Typography>
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

                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Typography
                            sx={{
                                fontFamily: "Inter",
                                fontWeight: 400,
                                fontSize: "14px",
                                color: TEXT,
                                mb: 0.75,
                            }}
                        >
                            Donation Type
                        </Typography>
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
                                                    fontFamily: "Inter",
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
                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
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
                            <Grid item size={{ xs: 12, md: 6 }}>
                                <Typography
                                    sx={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        color: TEXT,
                                        mb: 0.75,
                                    }}
                                >
                                    Product Name
                                </Typography>
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

                            <Grid item size={{ xs: 12, md: 6 }}>
                                <Typography
                                    sx={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        color: TEXT,
                                        mb: 0.75,
                                    }}
                                >
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

                            <Grid item size={{ xs: 12, md: 6 }}>
                                <Typography
                                    sx={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        color: TEXT,
                                        mb: 0.75,
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
                        <Typography
                            sx={{
                                fontFamily: "Inter",
                                fontWeight: 400,
                                fontSize: "14px",
                                color: TEXT,
                                mb: 0.75,
                            }}
                        >
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
                    <Button
                        onClick={handleAddDonation}
                        disabled={!canAddDonation}
                        variant="contained"
                        disableElevation
                        sx={{
                            backgroundColor: ACCENT,
                            color: "#FFFFFF",
                            fontFamily: "Inter",
                            fontSize: "15px",
                            fontWeight: 600,
                            textTransform: "none",
                            borderRadius: "8px",
                            px: 3,
                            py: 1.25,
                            minWidth: 200,
                            "&:hover": {
                                backgroundColor: "#d95600",
                            },
                            "&.Mui-disabled": {
                                backgroundColor: "rgba(47, 47, 47, 0.12)",
                                color: "rgba(47, 47, 47, 0.35)",
                            },
                        }}
                    >
                        Add Donation
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};

export default AddDonationPopup;
