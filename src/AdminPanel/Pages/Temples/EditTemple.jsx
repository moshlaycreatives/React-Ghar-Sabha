import { useState, useEffect, useCallback } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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

const EditTemple = () => {
    const { id } = useParams();
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
    const [templeImages, setTempleImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchTempleDetails = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${endpoints.AdminAddTemple}/${id}`, {
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });
            const data = response.data?.data?.temple;
            if (data) {
                setformdata({
                    title: data.title || "",
                    images: data.images || [],
                    phone: data.phone || "",
                    whatsappNumber: data.whatsappNumber || "",
                    googleMapUrl: data.googleMapUrl || "",
                    country: data.country || "",
                    email: data.email || "",
                    introduction: data.introduction || "",
                    timeSlots: data.timeSlots || []
                });
                setDarshanTimings(data.timeSlots?.length > 0 ? data.timeSlots : ["", "", ""]);
                setExistingImages(data.images || []);
            }
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Failed to load temple details"));
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchTempleDetails();
    }, [fetchTempleDetails]);

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

    const handleTempleImagesChange = (event) => {
        const selectedFiles = Array.from(event.target.files || []);
        if (!selectedFiles.length) return;
        setTempleImages(selectedFiles);
    };

    const UpdateTemple = async () => {
        if (submitting) return;

        setSubmitting(true);
        try {
            let uploadedImageUrls = [...existingImages];
            if (templeImages.length > 0) {
                const { urls } = await uploadMultipleMedia(templeImages, { path: "temples" });
                uploadedImageUrls = [...uploadedImageUrls, ...urls];
            }

            const payload = {
                ...formdata,
                id,
                images: uploadedImageUrls,
                timeSlots: darshanTimings.filter((t) => t.trim() !== ""),
            };

            const token = localStorage.getItem("token");
            const response = await axios.patch(
                `${endpoints.AdminAddTemple}/${id}`,
                payload,
                {
                    headers: {
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                }
            );

            toast.success(response.data?.message ?? "Temple updated successfully");
            navigate("/dashboard/temples");
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Could not update temple"));
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Typography sx={{ fontFamily: "Inter", fontSize: { xs: "25px", md: "36px" }, fontWeight: 600, }}>
                Dashboard/Temples
                <Box component="span" sx={{ color: "primary.main" }}>
                    /Edit Temple
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
                        Edit Temple Details
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
                            disabled={submitting}
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
                                cursor: "pointer",
                            }}
                        >
                            <CloudUploadOutlinedIcon sx={{ fontSize: 36, color: "#2F2F2F" }} />
                            <Typography sx={{ fontFamily: "Inter", color: "#2F2F2F", fontSize: "18px", lineHeight: "26px", fontWeight: 500 }}>
                                Upload Images
                            </Typography>
                            {templeImages.length > 0 ? (
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
                                    {templeImages.length} image(s) selected
                                </Typography>
                            ) : null}
                            {existingImages.length > 0 && templeImages.length === 0 ? (
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
                                    {existingImages.length} existing image(s)
                                </Typography>
                            ) : null}
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={UpdateTemple}
                            disabled={submitting}
                            sx={{ mt: 1, height: "40px", fontFamily: "Inter", borderRadius: "6px", fontSize: "16px", fontWeight: 400 }}
                        >
                            {submitting ? <CircularProgress size={24} color="inherit" /> : "Update Temple"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default EditTemple;
