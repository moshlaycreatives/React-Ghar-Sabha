import { useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    IconButton,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import { uploadMultipleMedia } from "../../../api/uploadMedia";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../../utils/apiErrorMessage.js";
import { MutationLoadingOverlay } from "../../../components/MutationLoadingOverlay.jsx";




const countries = ["India", "USA", "UK", "Canada", "Australia"];
const inputSx = {
    "& .MuiOutlinedInput-root": {
        height: 45,
        borderRadius: "10px",
        fontSize: "18px",
        color: "#2F2F2F",
        backgroundColor: "#fff",
    },
    "& .MuiOutlinedInput-input::placeholder": {
        color: "#848286",
        opacity: 1,
        fontSize: "14px",
    },
};

const fieldTitleSx = {
    mb: 0.7,
    fontFamily: "Inter",
    fontSize: "18px",
    lineHeight: "24px",
    fontWeight: 400,
    color: "#2F2F2F",
};

const templeThumbSx = {
    width: "100%",
    height: 120,
    objectFit: "cover",
    borderRadius: "8px",
    display: "block",
};


const AddTemple = () => {
    const navigate = useNavigate();
    const [formdata, setformdata] = useState({
        title: "",
        images: [],
        phone: "",
        whatsappNumber: "",
        googleMapUrl: "",
        country: "",
        email: "",
        introduction: "",
        timeSlots: []
    });

    const [darshanTimings, setDarshanTimings] = useState(["", "", ""]);
    const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
    const [uploadingImages, setUploadingImages] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleInputChange = (field) => (event) => {
        setformdata((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handleTimingChange = (index, value) => {
        setDarshanTimings((prev) =>
            prev.map((timing, i) => (i === index ? value : timing))
        );
    };

    const handleAddMoreTiming = () => {
        setDarshanTimings((prev) => [...prev, ""]);
    };

    const handleTempleImagesChange = async (event) => {
        const selectedFiles = Array.from(event.target.files || []);
        if (event.target) {
            event.target.value = "";
        }
        if (!selectedFiles.length) return;

        setUploadingImages(true);
        try {
            const { urls } = await uploadMultipleMedia(selectedFiles, { path: "temples" });
            setUploadedImageUrls(urls);
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Image upload failed"));
        } finally {
            setUploadingImages(false);
        }
    };

    const removeTempleImageAt = (index) => {
        setUploadedImageUrls((prev) => prev.filter((_, i) => i !== index));
    };


    const CreateTemple = async () => {
        if (submitting || uploadingImages) return;

        setSubmitting(true);
        try {
            const payload = {
                ...formdata,
                images: uploadedImageUrls,
                timeSlots: darshanTimings.filter((t) => t.trim() !== ""),
            };

            const token = localStorage.getItem("token");
            const response = await axios.post(
                endpoints.AdminAddTemple,
                payload,
                {
                    headers: {
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                }
            );
            handleNavigate();
            toast.success(response.data?.message ?? "Temple added successfully");
            // Reset form if needed
            setformdata({
                title: "",
                images: [],
                phone: "",
                whatsappNumber: "",
                googleMapUrl: "",
                country: "",
                email: "",
                introduction: "",
                timeSlots: []
            });
            setDarshanTimings(["", "", ""]);
            setUploadedImageUrls([]);
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Could not add temple"));
        } finally {
            setSubmitting(false);
        }
    };


    const handleNavigate = () => {
        navigate(`/dashboard/temples`)
    }


    return (
        <Box>
            <Typography sx={{ fontFamily: "Inter", fontSize: { xs: "20px", md: "36px" }, fontWeight: 600, lineHeight: "40px" }}>
                Dashboard/Temples
                <Box component="span" sx={{ color: "primary.main" }}>
                    /Add New Temple
                </Box>
            </Typography>

            <Box
                sx={{
                    mt: 4,
                    p: { xs: 2, md: 0 },
                    borderRadius: "20px",
                    backgroundColor: "#fff",
                    position: "relative",
                }}
            >
                <MutationLoadingOverlay open={submitting} />
                <Box sx={{ px: { xs: 2, md: 3 }, py: 1.7, borderBottom: "1px solid #EFEFEF" }}>
                    <Typography sx={{ fontFamily: "Inter", fontSize: "25px", lineHeight: "24px", fontWeight: 500, color: "#2F2F2F" }}>
                        Add Temple Details
                    </Typography>
                </Box>

                <Grid container spacing={1.5} sx={{ p: { xs: 2, md: 3 } }}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography sx={fieldTitleSx}>Temple Name</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter temple name"
                            sx={inputSx}
                            value={formdata.title}
                            disabled={submitting}
                            onChange={handleInputChange("title")}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography sx={fieldTitleSx}>Phone No.</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter phone no."
                            sx={inputSx}
                            value={formdata.phone}
                            disabled={submitting}
                            onChange={handleInputChange("phone")}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography sx={fieldTitleSx}>Email</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter email"
                            sx={inputSx}
                            value={formdata.email}
                            disabled={submitting}
                            onChange={handleInputChange("email")}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography sx={fieldTitleSx}>WhatsApp No. For Accommodation</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter whatsapp no."
                            sx={inputSx}
                            value={formdata.whatsappNumber}
                            disabled={submitting}
                            onChange={handleInputChange("whatsappNumber")}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography sx={fieldTitleSx}>Map Location</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter map url"
                            sx={inputSx}
                            value={formdata.googleMapUrl}
                            disabled={submitting}
                            onChange={handleInputChange("googleMapUrl")}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography sx={fieldTitleSx}>Country</Typography>
                        <TextField
                            select
                            fullWidth
                            size="small"
                            value={formdata.country}
                            disabled={submitting}
                            onChange={handleInputChange("country")}
                            sx={inputSx}
                        >
                            <MenuItem value="" disabled>
                                Select country
                            </MenuItem>
                            {countries.map((country) => (
                                <MenuItem key={country} value={country}>
                                    {country}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography sx={fieldTitleSx}>Daily Darshan</Typography>
                        <TextField
                            fullWidth
                            multiline
                            minRows={4}
                            placeholder="Enter details"
                            value={formdata.introduction}
                            disabled={submitting}
                            onChange={handleInputChange("introduction")}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "6px",
                                    fontSize: "18px",
                                    alignItems: "flex-start",
                                },
                                "& .MuiOutlinedInput-input::placeholder": {
                                    color: "#848286",
                                    opacity: 1,
                                    fontSize: "14px",
                                },
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Typography sx={fieldTitleSx}>
                            Daily Darshan Timing
                        </Typography>
                        <Grid container spacing={1.5}>
                            {darshanTimings.map((timing, index) => (
                                <Grid key={`darshan-${index}`} size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Example: 7:30am to 10:15am"
                                        value={timing}
                                        disabled={submitting}
                                        onChange={(e) => handleTimingChange(index, e.target.value)}
                                        sx={inputSx}
                                    />
                                </Grid>
                            ))}
                            <Grid size={{ xs: 12 }}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleAddMoreTiming}
                                    disabled={submitting}
                                    sx={{
                                        borderRadius: "8px",
                                        px: 2,
                                        height: "34px",
                                        fontSize: "12px",
                                        fontWeight: 500,
                                        borderColor: "#F36100",
                                    }}
                                >
                                    + Add more
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Typography sx={fieldTitleSx}>
                            Temple Images
                        </Typography>
                        <input
                            id="temple-images-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            hidden
                            disabled={submitting || uploadingImages}
                            onChange={handleTempleImagesChange}
                        />
                        <Box
                            component="label"
                            htmlFor="temple-images-upload"
                            sx={{
                                border: "1px dashed #A9A9A9",
                                borderRadius: "8px",
                                minHeight: "180px",
                                backgroundColor: "#F5F5F5",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                gap: 0.6,
                                cursor: submitting || uploadingImages ? "default" : "pointer",
                                opacity: submitting || uploadingImages ? 0.7 : 1,
                            }}
                        >
                            {uploadingImages ? (
                                <CircularProgress size={32} sx={{ color: "primary.main" }} />
                            ) : (
                                <CloudUploadOutlinedIcon sx={{ fontSize: 36, color: "#2F2F2F" }} />
                            )}
                            <Typography sx={{ fontFamily: "Inter", color: "#2F2F2F", fontSize: "18px", lineHeight: "26px", fontWeight: 500 }}>
                                {uploadingImages ? "Uploading…" : "Upload Images"}
                            </Typography>
                            {!uploadingImages && uploadedImageUrls.length > 0 ? (
                                <Typography
                                    sx={{
                                        fontFamily: "Inter",
                                        color: "#848286",
                                        fontSize: "14px",
                                        lineHeight: "20px",
                                        textAlign: "center",
                                        px: 2,
                                    }}
                                >
                                    {uploadedImageUrls.length} image(s) uploaded
                                </Typography>
                            ) : null}
                        </Box>
                        {uploadedImageUrls.length > 0 ? (
                            <Grid container spacing={1.5} sx={{ mt: 1.5 }}>
                                {uploadedImageUrls.map((src, index) => (
                                    <Grid key={`preview-${index}`} size={{ xs: 6, sm: 4, md: 3 }}>
                                        <Box sx={{ position: "relative", borderRadius: "8px", overflow: "hidden" }}>
                                            <Box
                                                component="img"
                                                src={src}
                                                alt={`Temple preview ${index + 1}`}
                                                sx={templeThumbSx}
                                            />
                                            <IconButton
                                                type="button"
                                                size="small"
                                                aria-label="Remove image"
                                                disabled={submitting || uploadingImages}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    removeTempleImageAt(index);
                                                }}
                                                sx={{
                                                    position: "absolute",
                                                    top: 6,
                                                    right: 6,
                                                    width: 28,
                                                    height: 28,
                                                    bgcolor: "rgba(255,255,255,0.95)",
                                                    boxShadow: 1,
                                                    "&:hover": { bgcolor: "#fff" },
                                                }}
                                            >
                                                <CloseIcon sx={{ fontSize: 18 }} />
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : null}
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={CreateTemple}
                            disabled={submitting || uploadingImages}
                            sx={{ mt: 1, height: "40px", fontFamily: "Inter", borderRadius: "6px", fontSize: "16px", fontWeight: 400 }}
                        >
                            {submitting ? <CircularProgress size={24} color="inherit" /> : "Add Temple"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default AddTemple;
