import { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Typography,
    Button,
    TextField,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import {
    DashboardPageHeader,
} from "../../../components/DashboardPageHeader.jsx";
import EditStream from "./EditStream.jsx";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import toast from "react-hot-toast";


const LiveStream = () => {
    // Mock data for initial state
    const [liveStreamData, setLiveStreamData] = useState([]);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedStream, setSelectedStream] = useState(null);

    const handleCopyLink = (link) => {
        navigator.clipboard.writeText(link || "");
        toast.success("Link copied to clipboard!");
    };

    const handleEdit = (stream) => {
        setSelectedStream(stream);
        setIsEditModalOpen(true);
    };

    const handleSave = () => {
        GetLiveStream();
    };


    const GetLiveStream = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.LiveStreamlink}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = response?.data?.data?.liveStream || response?.data?.data || [];
            setLiveStreamData(Array.isArray(data) ? data : [data]);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };


    useEffect(() => {
        GetLiveStream();
    }, []);



    return (
        <Box sx={{ pb: 4 }}>
            <DashboardPageHeader accentSegment="Live Stream" />

            <Box sx={{ mt: 1 }}>
                <Grid container spacing={3}>
                    {liveStreamData?.map((stream, index) => (
                        <Grid item key={index}  size={{ xs: 12, sm: 12, md: 6, lg: 5 }}>
                            <Card
                                sx={{
                                    borderRadius: "24px",
                                    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.08)",
                                    overflow: "hidden",
                                    border: "1px solid rgba(0, 0, 0, 0.06)",
                                    p: 2,
                                    bgcolor: "#FFFFFF",
                                }}
                            >
                                {/* 1. First Image */}
                                <CardMedia
                                    component="img"
                                    image={stream.image}
                                    alt={stream.title}
                                    sx={{
                                        borderRadius: "18px",
                                        height: 200,
                                        width: "100%",
                                        objectFit: "cover",
                                        mb: 2,
                                    }}
                                />

                                <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
                                    {/* 2. Second Title */}
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 800,
                                            fontSize: "1.25rem",
                                            mb: 1,
                                            color: "#1A1A1A",
                                        }}
                                    >
                                        {stream.title}
                                    </Typography>

                                    {/* 3. Third Date or Time */}
                                    <Box sx={{ display: "flex", gap: 1, mb: 2.5 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "#F36100",
                                                fontWeight: 600,
                                                bgcolor: "rgba(243, 97, 0, 0.1)",
                                                px: 1.5,
                                                py: 0.5,
                                                borderRadius: "8px",
                                            }}
                                        >
                                            {stream.date}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "#7A7A7A",
                                                fontWeight: 600,
                                                bgcolor: "#F5F5F5",
                                                px: 1.5,
                                                py: 0.5,
                                                borderRadius: "8px",
                                            }}
                                        >
                                            {stream.time}
                                        </Typography>
                                    </Box>

                                    {/* 4. Fourth YouTube Link */}
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={stream.youtubeLiveLink || stream.link || ""}
                                        InputProps={{
                                            readOnly: true,
                                            sx: {
                                                borderRadius: "14px",
                                                bgcolor: "#FAFAFA",
                                                "& fieldset": { borderColor: "rgba(0,0,0,0.12)" },
                                                fontSize: "0.9rem",
                                                color: "#555",
                                                height: "50px",
                                            },
                                        }}
                                        sx={{ mb: 3 }}
                                    />

                                    {/* 5. Last Buttons */}
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                startIcon={<ContentCopyIcon />}
                                                onClick={() => handleCopyLink(stream.youtubeLiveLink || stream.link)}
                                                sx={{
                                                    borderRadius: "14px",
                                                    textTransform: "none",
                                                    fontWeight: 700,
                                                    color: "#F36100",
                                                    borderColor: "#F36100",
                                                    borderWidth: "1.5px",
                                                    height: "48px",
                                                    "&:hover": {
                                                        borderColor: "#D45400",
                                                        borderWidth: "1.5px",
                                                        bgcolor: "rgba(243, 97, 0, 0.04)",
                                                    },
                                                }}
                                            >
                                                Copy
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                startIcon={<EditIcon />}
                                                onClick={() => handleEdit(stream)}
                                                sx={{
                                                    borderRadius: "14px",
                                                    textTransform: "none",
                                                    fontWeight: 700,
                                                    bgcolor: "#F36100",
                                                    height: "48px",
                                                    "&:hover": { bgcolor: "#D45400" },
                                                    boxShadow: "0px 4px 12px rgba(243, 97, 0, 0.2)",
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <EditStream
                open={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedStream(null);
                }}
                data={selectedStream}
                onSave={handleSave}
            />
        </Box>
    );
};

export default LiveStream;
