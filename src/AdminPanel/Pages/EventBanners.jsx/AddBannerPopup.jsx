import { useRef, useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    FormControlLabel,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

const ACCENT = "#F36100";
const TEXT = "#2F2F2F";



const AddBannerPopup = ({ open = false, onClose, onAddBanner }) => {
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [attendancePoll, setAttendancePoll] = useState(true);

    const handleClose = () => {
        setFile(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
        setAttendancePoll(true);
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
        e.target.value = "";
    };

    const handleAddBanner = () => {
        onAddBanner?.({ file, attendancePoll });
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
                    },
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2.5,
                    pt: 2.5,
                    pb: 2,
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "Inter",
                        fontWeight: 700,
                        fontSize: "18px",
                        color: TEXT,
                    }}
                >
                    Add Banner Image
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

            <Box sx={{ borderBottom: "1px solid rgba(47, 47, 47, 0.08)" }} />

            <Box sx={{ px: 2.5, pt: 2.5, pb: 2 }}>
                <Typography
                    component="label"
                    sx={{
                        display: "block",
                        fontFamily: "Inter",
                        fontWeight: 500,
                        fontSize: "14px",
                        color: TEXT,
                        mb: 1.5,
                    }}
                >
                    Banner Image<span style={{ color: "#ED4040" }}>*</span>
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
                        minHeight: 200,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        bgcolor: "rgba(47, 47, 47, 0.02)",
                        overflow: "hidden",
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
                            alt="Preview"
                            sx={{
                                width: "100%",
                                maxHeight: 280,
                                objectFit: "contain",
                                display: "block",
                            }}
                        />
                    ) : (
                        <>
                            <CloudUploadOutlinedIcon
                                sx={{ fontSize: 48, color: "rgba(47, 47, 47, 0.35)", mb: 1 }}
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

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={attendancePoll}
                            onChange={(e) => setAttendancePoll(e.target.checked)}
                            // sx={{
                            //     color: ACCENT,
                            //     "&.Mui-checked": { color: ACCENT },
                            // }}
                        />
                    }
                    label={
                        <Typography
                            sx={{
                                fontFamily: "Inter",
                                fontSize: "14px",
                                color: TEXT,
                            }}
                        >
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
                    disabled={!file}
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
                        minWidth: 140,
                        "&:hover": {
                            backgroundColor: "#d95600",
                        },
                        "&.Mui-disabled": {
                            backgroundColor: "rgba(47, 47, 47, 0.12)",
                            color: "rgba(47, 47, 47, 0.35)",
                        },
                    }}
                >
                    Add Banner
                </Button>
            </Box>
        </Dialog>
    );
};

export default AddBannerPopup;
