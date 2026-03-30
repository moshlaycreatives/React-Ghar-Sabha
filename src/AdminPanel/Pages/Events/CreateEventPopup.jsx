import { useMemo, useState } from "react";
import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { FormDialogFrame } from "../../../components/FormDialogFrame.jsx";
import { ImageUploadZone } from "../../../components/ImageUploadZone.jsx";
import { FormSubmitButton } from "../../../components/FormSubmitButton.jsx";
import { useImageFilePicker } from "../../../hooks/useImageFilePicker.js";

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

    const locationData = useMemo(
        () => [
            {
                country: "India",
                states: [
                    {
                        state: "Gujarat",
                        cities: ["Ahmedabad"],
                    },
                ],
            },
        ],
        []
    );

    const selectedCountry = useMemo(() => {
        return locationData.find((x) => x.country === country) || null;
    }, [country, locationData]);

    const availableStates = useMemo(() => {
        return selectedCountry?.states?.map((s) => s.state) || [];
    }, [selectedCountry]);

    const selectedState = useMemo(() => {
        if (!selectedCountry) return null;
        return selectedCountry.states.find((s) => s.state === state) || null;
    }, [selectedCountry, state]);

    const availableCities = useMemo(() => {
        return selectedState?.cities || [];
    }, [selectedState]);

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

    const handleCreate = () => {
        if (!canCreate) return;

        onCreateEvent?.({
            file,
            eventName: eventName.trim(),
            country,
            state,
            city,
            startDate,
            endDate,
        });

        handleClose();
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
                            {locationData.map((c) => (
                                <MenuItem key={c.country} value={c.country}>
                                    {c.country}
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
                            {availableStates.map((s) => (
                                <MenuItem key={s} value={s}>
                                    {s}
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
                            {availableCities.map((ct) => (
                                <MenuItem key={ct} value={ct}>
                                    {ct}
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
                    disabled={!canCreate}
                    onClick={handleCreate}
                >
                    Create Event
                </FormSubmitButton>
            </Box>
        </FormDialogFrame>
    );
};

export default CreateEventPopup;
