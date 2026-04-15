import { useEffect, useState } from "react";
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

const labelSx = {
    fontWeight: 400,
    fontSize: "18px",
    color: "text.primary",
    mb: "5px",
};

const EditEvent = ({ open = false, onClose, onUpdateEvent, eventId }) => {
    const {
        fileInputRef,
        file,
        previewUrl,
        setPreviewUrl,
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
    const [fetching, setFetching] = useState(false);

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const token = "w1XWZhLiOGDD0nbRoNrdIzK4";

    // Fetch Countries
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(endpoints.GetAllCountry, {
                    headers: { "x-api-key": token },
                });
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
                    headers: { "x-api-key": token },
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
                    { headers: { "x-api-key": token } }
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

    // Fetch Event Data
    useEffect(() => {
        const fetchEvent = async () => {
            if (!eventId || !open) return;
            setFetching(true);
            try {
                const authToken = localStorage.getItem("token");
                const response = await axios.get(`${endpoints.AdminCreateNewEvent}/${eventId}`, {
                    headers: {
                        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
                    },
                });
                // Fix: Handle different response structures
                const rawData = response.data.data || response.data;
                const event = (rawData && rawData.event) ? rawData.event : rawData;

                if (event) {
                    setEventName(event.name || "");
                    setCountry(event.country || "");
                    setState(event.state || "");
                    setCity(event.city || "");
                    // Ensure dates are in YYYY-MM-DD format for input
                    if (event.startDate) {
                        setStartDate(new Date(event.startDate).toISOString().split('T')[0]);
                    }
                    if (event.endDate) {
                        setEndDate(new Date(event.endDate).toISOString().split('T')[0]);
                    }
                    if (event.image) {
                        setPreviewUrl(event.image);
                    }
                }
            } catch (error) {
                console.error("Error fetching event details:", error);
                toast.error(getApiErrorMessage(error, "Failed to load event details"));
            } finally {
                setFetching(false);
            }
        };
        fetchEvent();
    }, [eventId, open, setPreviewUrl]);

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
        if (loading) return;
        resetForm();
        onClose?.();
    };

    const canUpdate =
        (Boolean(file) || Boolean(previewUrl)) &&
        eventName.trim().length > 0 &&
        country &&
        state &&
        city &&
        startDate &&
        endDate;

    const handleUpdate = async () => {
        if (!canUpdate || loading) return;

        setLoading(true);
        try {
            let imageUrl = previewUrl;

            // Step 1: Upload image if a new one is selected
            if (file) {
                const uploadRes = await uploadSingleMedia(file, { path: "events" });
                imageUrl = uploadRes.url;
            }

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

            const authToken = localStorage.getItem("token");
            const response = await axios.patch(
                `${endpoints.AdminCreateNewEvent}/${eventId}`,
                payload,
                {
                    headers: {
                        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
                    },
                }
            );

            toast.success(response.data?.message ?? "Event updated successfully");
            onUpdateEvent?.();
            handleClose();
        } catch (error) {
            console.error("Error updating event:", error);
            toast.error(getApiErrorMessage(error, "Failed to update event"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormDialogFrame
            open={open}
            onClose={handleClose}
            title="Edit Event"
            titleFontSize="25px"
            bodyPaddingTop={0}
            loading={loading}
        >
            {fetching ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
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
                        disabled={loading}
                        minHeight={{ xs: 120, sm: 170 }}
                    />

                    <Box sx={{ mt: 2 }}>
                        <Typography sx={labelSx}>Event Name</Typography>
                        <TextField
                            fullWidth
                            placeholder="Enter event name"
                            value={eventName}
                            disabled={loading}
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
                                    disabled={loading}
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
                                    disabled={loading}
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
                                    disabled={loading}
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
                                    disabled={loading}
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
                                    disabled={loading}
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
                            disabled={!canUpdate || loading}
                            onClick={handleUpdate}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Update Event"}
                        </FormSubmitButton>
                    </Box>
                </>
            )}
        </FormDialogFrame>
    );
};

export default EditEvent;