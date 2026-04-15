import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    Grid,
    IconButton,
    CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import { uploadMedia } from "../../../api/uploadMedia";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../../utils/apiErrorMessage.js";

/** API often returns "2:30 PM" etc.; <input type="time"> only accepts "HH:mm" (24h). */
function toTimeInputValue(raw) {
    if (raw == null || raw === "") return "";
    const s = String(raw).trim();
    const has12h = /\b(AM|PM)\b/i.test(s);
    if (!has12h) {
        const m = s.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
        if (m) {
            const h = parseInt(m[1], 10);
            const min = m[2];
            if (h >= 0 && h <= 23) return `${String(h).padStart(2, "0")}:${min}`;
        }
        return "";
    }
    const m12 = s.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)\s*$/i);
    if (!m12) return "";
    let h = parseInt(m12[1], 10);
    const min = m12[2];
    const ap = m12[3].toUpperCase();
    if (ap === "PM" && h !== 12) h += 12;
    if (ap === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${min}`;
}

const EditStream = ({ open, onClose, data, onSave }) => {
    const [formData, setFormData] = useState({
        image: "",
        title: "",
        youtubeLiveLink: "",
        date: "",
        time: "",
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (data) {
            setFormData({
                image: data.image || "",
                title: data.title || "",
                youtubeLiveLink: data.youtubeLiveLink || data.link || "",
                date: data.date || "",
                time: toTimeInputValue(data.time) || "",
            });
            setImagePreview(data.image || null);
            setSelectedFile(null);
        }
    }, [data, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (submitting) return;
        setSubmitting(true);

        try {
            let finalImageUrl = formData.image;

            // 1. Pehla image upload karni hai "api/uploadMedia.js" se
            if (selectedFile) {
                const { url } = await uploadMedia(selectedFile, { path: "livestreams" });
                finalImageUrl = url; // Wahan se jo URL aya ga, wo "finalImageUrl" mein store ho gaya
            }

            // Helper to format time to "HH:MM AM/PM"
            const formatTime = (time24) => {
                if (!time24) return "";
                if (time24.includes("AM") || time24.includes("PM")) return time24;
                const [hours, minutes] = time24.split(":");
                let h = parseInt(hours, 10);
                const ampm = h >= 12 ? "PM" : "AM";
                h = h % 12 || 12;
                return `${h.toString().padStart(2, "0")}:${minutes} ${ampm}`;
            };

            // 2. Prepare payload
            const payload = {
                title: formData.title,
                date: formData.date,
                time: formatTime(formData.time),
                image: finalImageUrl,
                youtubeLiveLink: formData.youtubeLiveLink,
            };

            // 3. API Call
            const token = localStorage.getItem("token");
            const response = await axios.post(
                endpoints.LiveStreamlink,
                payload,
                {
                    headers: {
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                }
            );

            toast.success(response.data?.message ?? "Live stream updated successfully");
            
            if (onSave) {
                onSave(payload);
            }
            onClose();
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Could not save live stream"));
        } finally {
            setSubmitting(false);
        }
    };





    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: "20px",
                    p: 1,
                },
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Edit Live Stream
                </Typography>
                <IconButton onClick={onClose} sx={{ color: (theme) => theme.palette.grey[500] }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ overflowY: "hidden" }}>
                <Box sx={{ mt: 0 }}>
                    {/* Image Upload */}
                    <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600, color: "#555" }}>
                        Stream Thumbnail
                    </Typography>
                    <Box
                        sx={{
                            width: "100%",
                            height: "140px",
                            borderRadius: "14px",
                            border: "2px dashed #E0E0E0",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                            position: "relative",
                            mb: 2,
                            bgcolor: "#FAFAFA",
                            cursor: "pointer",
                            "&:hover": {
                                borderColor: "#F36100",
                                bgcolor: "rgba(243, 97, 0, 0.02)",
                            },
                        }}
                        component="label"
                    >
                        <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        ) : (
                            <>
                                <PhotoCamera sx={{ fontSize: 32, color: "#BBB", mb: 0.5 }} />
                                <Typography variant="body2" sx={{ color: "#888", fontSize: "0.8rem" }}>
                                    Click to upload thumbnail
                                </Typography>
                            </>
                        )}
                    </Box>

                    {/* Title */}
                    <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600, color: "#555" }}>
                        Stream Title
                    </Typography>
                    <TextField
                        fullWidth
                        name="title"
                        placeholder="Enter stream title"
                        value={formData.title}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        sx={{
                            mb: 1.5,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                            },
                        }}
                    />

                    {/* YouTube Link */}
                    <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600, color: "#555" }}>
                        YouTube Link
                    </Typography>
                    <TextField
                        fullWidth
                        name="youtubeLiveLink"
                        placeholder="Paste YouTube link here"
                        value={formData.youtubeLiveLink}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        sx={{
                            mb: 1.5,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                            },
                        }}
                    />

                    {/* Date and Time Row */}
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600, color: "#555" }}>
                                Date
                            </Typography>
                            <TextField
                                fullWidth
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                size="small"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "10px",
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600, color: "#555" }}>
                                Time
                            </Typography>
                            <TextField
                                fullWidth
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                size="small"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "10px",
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2.5, justifyContent: "flex-end" }}>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={submitting}
                    sx={{
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 700,
                        px: 4,
                        py: 1.2,
                        bgcolor: "#F36100",
                        "&:hover": { bgcolor: "#D45400" },
                        boxShadow: "0px 4px 12px rgba(243, 97, 0, 0.2)",
                    }}
                >
                    {submitting ? <CircularProgress size={24} color="inherit" /> : "Edit"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditStream;
