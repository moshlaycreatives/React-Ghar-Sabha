import { useEffect, useMemo, useState } from "react";
import { Box, Grid, MenuItem, TextField, Typography, CircularProgress } from "@mui/material";
import { FormDialogFrame } from "../../../components/FormDialogFrame.jsx";
import { ImageUploadZone } from "../../../components/ImageUploadZone.jsx";
import { FormSubmitButton } from "../../../components/FormSubmitButton.jsx";
import { useImageFilePicker } from "../../../hooks/useImageFilePicker.js";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import toast from "react-hot-toast";
import { uploadSingleMedia } from "../../../api/uploadMedia.js";






const labelSx = {
    fontWeight: 400,
    fontSize: "18px",
    color: "text.primary",
    mb: "5px",
};

const CreateEventPopup = ({ open = false, onClose, onCreateEvent }) => {
    const {
        fileInputRef,
        file,
        previewUrl,
        handleZoneClick,
        handleFileChange,
        reset: resetImage,
    } = useImageFilePicker();

    const [eventName, setEventName] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);


    const token = "w1XWZhLiOGDD0nbRoNrdIzK4";

    // Fetch Countries
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(endpoints.GetAllCountry, {
                    headers: {
                        "x-api-key": token
                    },
                });
                // Fix: Access response.data.data.countries as per provided response structure
                const rawData = response.data.data || response.data;
                const countriesList = Array.isArray(rawData) ? rawData : (rawData.countries || []);
                setCountries(countriesList);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        if (open) {
            fetchCountries();
        }
    }, [open]);

    // Fetch States
    useEffect(() => {
        const fetchStates = async () => {
            if (!country) {
                setStates([]);
                return;
            }
            try {
                const response = await axios.get(`${endpoints.GetAllStates}?country=${country}`, {
                    headers: {
                        "x-api-key": token
                    },
                });
                const rawData = response.data.data || response.data;
                const statesList = Array.isArray(rawData) ? rawData : (rawData.states || []);
                setStates(statesList);
            } catch (error) {
                console.error("Error fetching states:", error);
            }
        };
        fetchStates();
    }, [country]);

    // Fetch Cities
    useEffect(() => {
        const fetchCities = async () => {
            if (!country || !state) {
                setCities([]);
                return;
            }
            try {
                const response = await axios.get(
                    `${endpoints.GetAllCity}?country=${country}&state=${state}`,
                    {
                        headers: {
                            "x-api-key": token
                        },
                    }
                );
                const rawData = response.data.data || response.data;
                const citiesList = Array.isArray(rawData) ? rawData : (rawData.cities || []);
                setCities(citiesList);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };
        fetchCities();
    }, [country, state]);

    const resetForm = () => {
        resetImage();
        setEventName("");
        setCountry("");
        setState("");
        setCity("");
        setStartDate("");
        setEndDate("");
    };

    const handleClose = () => {
        resetForm();
        onClose?.();
    };

    const canCreate =
        Boolean(file) &&
        eventName.trim().length > 0 &&
        country &&
        state &&
        city &&
        startDate &&
        endDate;

    const handleCreate = async () => {
        if (!canCreate || loading) return;

        setLoading(true);
        try {
            // Step 1: Upload image first
            const uploadRes = await uploadSingleMedia(file, { path: "events" });
            const imageUrl = uploadRes.url;

            // Step 2: Prepare payload
            const payload = {
                name: eventName.trim(),
                country,
                state,
                city,
                startDate: new Date(startDate).toISOString(),
                endDate: new Date(endDate).toISOString(),
                image: imageUrl
            };

            const token = localStorage.getItem("token");
            const response = await axios.post(
                endpoints.AdminCreateNewEvent,
                payload,
                {
                    headers: {
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                }
            );

            toast.success(response.data?.message ?? "Event added successfully");
            onCreateEvent?.();
            handleClose();
        } catch (error) {
            console.error("Error creating event:", error);
            const msg = error.response?.data?.message || error.message || "Failed to create event";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };






    return (
        <FormDialogFrame
            open={open}
            onClose={handleClose}
            title="Create New Event"
            titleFontSize="25px"
            bodyPaddingTop={0}
        >
            <Typography
                component="label"
                sx={{
                    display: "block",
                    fontWeight: 400,
                    fontSize: "18px",
                    color: "text.primary",
                    mb: 1.5,
                }}
            >
                Event Banner*
            </Typography>

            <ImageUploadZone
                fileInputRef={fileInputRef}
                previewUrl={previewUrl}
                onZoneClick={handleZoneClick}
                onFileChange={handleFileChange}
                minHeight={{ xs: 120, sm: 170 }}
            />

            <Box sx={{ mt: 2 }}>
                <Typography sx={labelSx}>Event Name</Typography>
                <TextField
                    fullWidth
                    placeholder="Enter event name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "10px",
                        },
                    }}
                />
            </Box>

            <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography sx={labelSx}>Country</Typography>
                        <TextField
                            select
                            fullWidth
                            value={country}
                            onChange={(e) => {
                                const nextCountry = e.target.value;
                                setCountry(nextCountry);
                                setState("");
                                setCity("");
                            }}
                            SelectProps={{ displayEmpty: true }}
                            sx={{
                                "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                            }}
                        >
                            <MenuItem value="" disabled>
                                Select country
                            </MenuItem>
                            {countries.map((c) => (
                                <MenuItem key={typeof c === "object" ? c.name || c.id : c} value={typeof c === "object" ? c.name : c}>
                                    {typeof c === "object" ? c.name : c}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography sx={labelSx}>State</Typography>
                        <TextField
                            select
                            fullWidth
                            value={state}
                            onChange={(e) => {
                                const nextState = e.target.value;
                                setState(nextState);
                                setCity("");
                            }}
                            SelectProps={{ displayEmpty: true }}
                            sx={{
                                "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                            }}
                        >
                            <MenuItem value="" disabled>
                                Select state
                            </MenuItem>
                            {states.map((s) => (
                                <MenuItem key={typeof s === "object" ? s.name || s.id : s} value={typeof s === "object" ? s.name : s}>
                                    {typeof s === "object" ? s.name : s}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography sx={labelSx}>City</Typography>
                        <TextField
                            select
                            fullWidth
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            SelectProps={{ displayEmpty: true }}
                            sx={{
                                "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                            }}
                        >
                            <MenuItem value="" disabled>
                                Select city
                            </MenuItem>
                            {cities.map((ct) => (
                                <MenuItem key={typeof ct === "object" ? ct.name || ct.id : ct} value={typeof ct === "object" ? ct.name : ct}>
                                    {typeof ct === "object" ? ct.name : ct}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography sx={labelSx}>Start Date</Typography>
                        <TextField
                            fullWidth
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography sx={labelSx}>End Date</Typography>
                        <TextField
                            fullWidth
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2.5,
                }}
            >
                <FormSubmitButton
                    disabled={!canCreate || loading}
                    onClick={handleCreate}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Create Event"}
                </FormSubmitButton>
            </Box>
        </FormDialogFrame>
    );
};

export default CreateEventPopup;
