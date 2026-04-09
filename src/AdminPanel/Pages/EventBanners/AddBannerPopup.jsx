import { useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    Typography,
    TextField,
} from "@mui/material";
import { FormDialogFrame } from "../../../components/FormDialogFrame.jsx";
import { ImageUploadZone } from "../../../components/ImageUploadZone.jsx";
import { useImageFilePicker } from "../../../hooks/useImageFilePicker.js";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import { uploadSingleMedia } from "../../../api/uploadMedia";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../../utils/apiErrorMessage.js";



/** S3 folder query param — backend jaisa ho waisa rakho */
const BANNER_UPLOAD_PATH = "event-banners";

const AddBannerPopup = ({ open = false, onClose, onAddBanner }) => {
    const {
        fileInputRef,
        file,
        previewUrl,
        handleZoneClick,
        handleFileChange,
        reset: resetImage,
    } = useImageFilePicker();

    const [attendancePoll, setAttendancePoll] = useState(true);
    const [googleMapUrl, setGoogleMapUrl] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleClose = () => {
        if (submitting) return;
        resetImage();
        setAttendancePoll(true);
        setGoogleMapUrl("");
        onClose?.();
    };

    const handleAddBanner = async () => {
        if (!file || submitting) return;

        setSubmitting(true);
        try {
            const { url } = await uploadSingleMedia(file, { path: BANNER_UPLOAD_PATH });

            const token = localStorage.getItem("token");
            const response = await axios.post(
                endpoints.AdminEventBanner,
                {
                    imageUrl: url,
                    isPollEnabled: attendancePoll,
                    googleMapUrl: googleMapUrl,
                },
                {
                    headers: {
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                }
            );

            toast.success(response.data?.message ?? "Banner added successfully");
            onAddBanner?.(response.data);
            resetImage();
            setAttendancePoll(true);
            setGoogleMapUrl("");
            onClose?.();
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Failed to add banner"));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <FormDialogFrame
            open={open}
            onClose={handleClose}
            title="Add Banner Image"
            titleFontWeight={700}
            titleFontSize="18px"
            scrollable={false}
            dividerAfterHeader
            headerPaddingBottom={2}
        >
            <Box sx={{ px: 2.5, pt: 2.5, pb: 2 }}>
                <Typography
                    component="label"
                    sx={{
                        display: "block",
                        fontWeight: 500,
                        fontSize: "14px",
                        color: "text.primary",
                        mb: 1.5,
                    }}
                >
                    Banner Image
                    <Typography component="span" sx={{ color: "error.main" }}>
                        *
                    </Typography>
                </Typography>

                <ImageUploadZone
                    fileInputRef={fileInputRef}
                    previewUrl={previewUrl}
                    onZoneClick={handleZoneClick}
                    onFileChange={handleFileChange}
                    minHeight={200}
                    previewImageSx={{
                        width: "100%",
                        maxHeight: 280,
                        objectFit: "contain",
                        display: "block",
                    }}
                />

                <Typography
                    component="label"
                    sx={{
                        display: "block",
                        fontWeight: 500,
                        fontSize: "14px",
                        color: "text.primary",
                        mt: 2,
                        mb: 1.5,
                    }}
                >
                    Mapurl
                </Typography>

                <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter Google Map URL"
                    value={googleMapUrl}
                    onChange={(e) => setGoogleMapUrl(e.target.value)}
                    disabled={submitting}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            fontSize: "14px",
                        },
                    }}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={attendancePoll}
                            disabled={submitting}
                            onChange={(e) =>
                                setAttendancePoll(e.target.checked)
                            }
                        />
                    }
                    label={
                        <Typography sx={{ fontSize: "14px", color: "text.primary" }}>
                            Add attendance poll with this banner
                        </Typography>
                    }
                    sx={{ mt: 0, ml: -0.5, alignItems: "center" }}
                />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    px: 2.5,
                    pb: 2.5,
                    pt: 0,
                }}
            >
                <Button
                    onClick={handleAddBanner}
                    disabled={!file || submitting}
                    variant="contained"
                    disableElevation
                    color="primary"
                    sx={{
                        fontSize: "15px",
                        fontWeight: 600,
                        borderRadius: "8px",
                        px: 3,
                        py: 1.25,
                        minWidth: 140,
                        "&.Mui-disabled": {
                            backgroundColor: "rgba(47, 47, 47, 0.12)",
                            color: "rgba(47, 47, 47, 0.35)",
                        },
                    }}
                >
                    {submitting ? (
                        <>
                            <CircularProgress
                                size={18}
                                color="inherit"
                                sx={{ mr: 1 }}
                            />
                            Adding…
                        </>
                    ) : (
                        "Add Banner"
                    )}
                </Button>
            </Box>
        </FormDialogFrame>
    );
};

export default AddBannerPopup;
