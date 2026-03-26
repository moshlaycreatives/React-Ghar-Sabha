import { useMemo, useRef, useState } from "react";
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


const CreateEventPopup = ({ open = false, onClose, onCreateEvent }) => {
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
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
        setFile(null);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);

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
                        fontSize: "25px",
                        color: TEXT,
                    }}
                >
                    Create New Event
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
                    pt: 0,
                    pb: 2,
                }}
            >
                <Typography
                    component="label"
                    sx={{
                        display: "block",
                        fontFamily: "Inter",
                        fontWeight: 400,
                        fontSize: "18px",
                        color: TEXT,
                        mb: 1.5,
                    }}
                >
                    Event Banner*
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
                        minHeight: { xs: 120, sm: 170 },
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
                            alt="Event banner preview"
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

                <Box sx={{ mt: 2 }}>
                    <Typography
                        sx={{
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontSize: "18px",
                            color: "#2F2F2F",
                            mb: "5px"
                        }}
                    >
                        Event Name
                    </Typography>
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
                        <Grid item size={{ xs: 12, md: 4 }}>
                            <Typography
                                sx={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: "18px",
                                    color: "#2F2F2F",
                                    mb: "5px"
                                }}
                            >
                                Country
                            </Typography>
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
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
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

                        <Grid item size={{ xs: 12, md: 4 }}>
                            <Typography
                                sx={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: "18px",
                                    color: "#2F2F2F",
                                    mb: "5px"
                                }}
                            >
                                State
                            </Typography>
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
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
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

                        <Grid item size={{ xs: 12, md: 4 }}>
                            <Typography
                                sx={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: "18px",
                                    color: "#2F2F2F",
                                    mb: "5px"
                                }}
                            >
                                City
                            </Typography>
                            <TextField
                                select
                                fullWidth
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                SelectProps={{ displayEmpty: true }}
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
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
                        <Grid item size={{ xs: 12, md: 6 }}>
                            <Typography
                                sx={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: "18px",
                                    color: "#2F2F2F",
                                    mb: "5px"
                                }}
                            >
                                Start Date
                            </Typography>
                            <TextField
                                fullWidth
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                            />
                        </Grid>
                        <Grid item size={{ xs: 12, md: 6 }}>
                            <Typography
                                sx={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: "18px",
                                    color: "#2F2F2F",
                                    mb: "5px"
                                }}
                            >
                                End Date
                            </Typography>
                            <TextField
                                fullWidth
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
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
                    <Button
                        onClick={handleCreate}
                        disabled={!canCreate}
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
                        Create Event
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};

export default CreateEventPopup;