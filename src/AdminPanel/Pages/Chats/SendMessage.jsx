import { useEffect, useState } from "react";
import { Box, CircularProgress, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { FormDialogFrame } from "../../../components/FormDialogFrame.jsx";
import { FormSubmitButton } from "../../../components/FormSubmitButton.jsx";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";

const labelSx = {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "18px",
    color: "#2F2F2F",
    mb: "4px",
};

const inputSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        bgcolor: "#FFFFFF",
        height: "50px"
    },
};

const SendMessage = ({ open, onClose, onSend }) => {
    const [sending, setSending] = useState(false);
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [tehsil, setTehsil] = useState("");
    const [poll, setPoll] = useState("");
    const [pollContent, setPollContent] = useState("");

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [tehsils, setTehsils] = useState([]);

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

    // Fetch Districts
    useEffect(() => {
        const fetchDistricts = async () => {
            if (!country || !state) {
                setDistricts([]);
                return;
            }
            try {
                const response = await axios.get(
                    `${endpoints.GetAllDistricts}?country=${country}&state=${state}`,
                    {
                        headers: {
                            "x-api-key": token
                        },
                    }
                );
                const rawData = response.data.data || response.data;
                const districtsList = Array.isArray(rawData) ? rawData : (rawData.districts || []);
                setDistricts(districtsList);
            } catch (error) {
                console.error("Error fetching districts:", error);
            }
        };
        fetchDistricts();
    }, [country, state]);

    // Fetch Tehsils
    useEffect(() => {
        const fetchTehsils = async () => {
            if (!country || !state || !district) {
                setTehsils([]);
                return;
            }
            try {
                const response = await axios.get(
                    `${endpoints.GetAllTehsils}?country=${country}&state=${state}&district=${district}`,
                    {
                        headers: {
                            "x-api-key": token
                        },
                    }
                );
                const rawData = response.data.data || response.data;
                const tehsilsList = Array.isArray(rawData) ? rawData : (rawData.tehsils || []);
                setTehsils(tehsilsList);
            } catch (error) {
                console.error("Error fetching tehsils:", error);
            }
        };
        fetchTehsils();
    }, [country, state, district]);

    const resetForm = () => {
        setCountry("");
        setState("");
        setCity("");
        setDistrict("");
        setTehsil("");
        setPoll("");
        setPollContent("");
    };

    const handleSend = async () => {
        if (sending) return;
        setSending(true);
        try {
            await onSend?.({ country, state, city, district, tehsil, poll, pollContent });
        } catch {
            // Parent shows toast and rethrows
        } finally {
            setSending(false);
        }
    };

    const handleClose = () => {
        if (sending) return;
        resetForm();
        onClose();
    };


    useEffect(() => {
        if (!open) {
            setCountry("");
            setState("");
            setCity("");
            setDistrict("");
            setTehsil("");
            setPoll("");
            setPollContent("");
            setSending(false);
        }
    }, [open]);

    return (
        <FormDialogFrame
            open={open}
            onClose={handleClose}
            title="Complete the Information to Send Message"
            titleFontSize="20px"
            titleFontWeight={600}
            dividerAfterHeader={true}
            bodyPaddingTop={2.5}
            loading={sending}
        >
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography sx={labelSx}>Country</Typography>
                    <TextField
                        select
                        fullWidth
                        disabled={sending}
                        value={country}
                        onChange={(e) => {
                            setCountry(e.target.value);
                            setState("");
                            setCity("");
                            setDistrict("");
                            setTehsil("");
                        }}
                        variant="outlined"
                        sx={inputSx}
                        SelectProps={{ displayEmpty: true }}
                    >
                        <MenuItem value="" disabled>Select country</MenuItem>
                        {countries.map((c) => (
                            <MenuItem key={typeof c === "object" ? c.name || c.id : c} value={typeof c === "object" ? c.name : c}>
                                {typeof c === "object" ? c.name : c}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography sx={labelSx}>State</Typography>
                    <TextField
                        select
                        fullWidth
                        disabled={sending}
                        value={state}
                        onChange={(e) => {
                            setState(e.target.value);
                            setCity("");
                            setDistrict("");
                            setTehsil("");
                        }}
                        variant="outlined"
                        sx={inputSx}
                        SelectProps={{ displayEmpty: true }}
                    >
                        <MenuItem value="" disabled>Select State</MenuItem>
                        {states.map((s) => (
                            <MenuItem key={typeof s === "object" ? s.name || s.id : s} value={typeof s === "object" ? s.name : s}>
                                {typeof s === "object" ? s.name : s}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography sx={labelSx}>City</Typography>
                    <TextField
                        select
                        fullWidth
                        disabled={sending}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        variant="outlined"
                        sx={inputSx}
                        SelectProps={{ displayEmpty: true }}
                    >
                        <MenuItem value="" disabled>Select city</MenuItem>
                        {cities.map((ct) => (
                            <MenuItem key={typeof ct === "object" ? ct.name || ct.id : ct} value={typeof ct === "object" ? ct.name : ct}>
                                {typeof ct === "object" ? ct.name : ct}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography sx={labelSx}>District</Typography>
                    <TextField
                        select
                        fullWidth
                        disabled={sending}
                        value={district}
                        onChange={(e) => {
                            setDistrict(e.target.value);
                            setTehsil("");
                        }}
                        variant="outlined"
                        sx={inputSx}
                        SelectProps={{ displayEmpty: true }}
                    >
                        <MenuItem value="" disabled>Select district</MenuItem>
                        {districts.map((d) => (
                            <MenuItem key={typeof d === "object" ? d.name || d.id : d} value={typeof d === "object" ? d.name : d}>
                                {typeof d === "object" ? d.name : d}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography sx={labelSx}>Tehsil</Typography>
                    <TextField
                        select
                        fullWidth
                        disabled={sending}
                        value={tehsil}
                        onChange={(e) => setTehsil(e.target.value)}
                        variant="outlined"
                        sx={inputSx}
                        SelectProps={{ displayEmpty: true }}
                    >
                        <MenuItem value="" disabled>Select tehsil</MenuItem>
                        {tehsils.map((t) => (
                            <MenuItem key={typeof t === "object" ? t.name || t.id : t} value={typeof t === "object" ? t.name : t}>
                                {typeof t === "object" ? t.name : t}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography sx={labelSx}>Create Poll</Typography>
                    <TextField
                        select
                        fullWidth
                        disabled={sending}
                        value={poll}
                        onChange={(e) => setPoll(e.target.value)}
                        variant="outlined"
                        sx={inputSx}
                        SelectProps={{ displayEmpty: true }}
                    >
                        <MenuItem value="" disabled>Select</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                    </TextField>
                </Grid>

                {poll === "Yes" && (
                    <Grid size={{ xs: 12 }}>
                        <Typography sx={labelSx}>Add Poll content</Typography>
                        <TextField
                            fullWidth
                            placeholder="Enter poll content"
                            value={pollContent}
                            disabled={sending}
                            onChange={(e) => setPollContent(e.target.value)}
                            variant="outlined"
                            sx={inputSx}
                        />
                    </Grid>
                )}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                <FormSubmitButton
                    disabled={sending}
                    onClick={handleSend}
                    sx={{
                        width: { xs: "100%", sm: "auto" },
                        minWidth: 200,
                    }}
                >
                    {sending ? <CircularProgress size={24} color="inherit" /> : "Send Message"}
                </FormSubmitButton>
            </Box>
        </FormDialogFrame>
    );
};

export default SendMessage;
