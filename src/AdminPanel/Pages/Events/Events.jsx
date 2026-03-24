import { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";




const eventsData = [
    {
        id: "1",
        image: "/image/Deventimage.png",
        title: "Lorem Ipsum is simply du mmy text",
        location: "India - Gujraat - Ahmadabad",
        dateRange: "16 Mar 2026 - 20 Mar 2026",
    },
    {
        id: "2",
        image: "/image/Deventimage.png",
        title: "Lorem Ipsum is simply du mmy text",
        location: "India - Gujraat - Ahmadabad",
        dateRange: "16 Mar 2026 - 20 Mar 2026",
    },
    {
        id: "3",
        image: "/image/Deventimage.png",
        title: "Lorem Ipsum is simply du mmy text",
        location: "India - Gujraat - Ahmadabad",
        dateRange: "16 Mar 2026 - 20 Mar 2026",
    },
    {
        id: "4",
        image: "/image/Deventimage.png",
        title: "Lorem Ipsum is simply du mmy text",
        location: "India - Gujraat - Ahmadabad",
        dateRange: "16 Mar 2026 - 20 Mar 2026",
    },
];



const Event = () => {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const menuOpen = Boolean(menuAnchor);

    const handleMenuOpen = (e) => {
        e.stopPropagation();
        setMenuAnchor(e.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    return (
        <>
            <Box>
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    sx={{ justifyContent: "space-between" }}
                >
                    <Grid size={{ xs: 12, md: "auto" }}>
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: "Outfit",
                                    fontWeight: 600,
                                    fontSize: { xs: "26px", md: "36px" },
                                    color: "#2F2F2F",
                                }}
                            >
                                Dashboard
                                <span style={{ color: "#F36100" }}>/Events</span>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid
                        size={{ xs: 12, md: "auto" }}
                        sx={{
                            display: "flex",
                            justifyContent: { xs: "stretch", md: "flex-end" },
                        }}
                    >
                        <Button
                            sx={{
                                backgroundColor: "#F36100",
                                border: "1px solid #F36100",
                                color: "#FFFFFF",
                                fontSize: "16px",
                                lineHeight: "16px",
                                fontWeight: 400,
                                textTransform: "none",
                                width: { xs: "100%", md: "auto" },
                                minWidth: { md: 160 },
                                height: "50px",
                                borderRadius: "10px",
                                "&:hover": {
                                    backgroundColor: "#d95600",
                                    borderColor: "#d95600",
                                },
                            }}
                            variant="outlined"
                            startIcon={<AddIcon />}
                        >
                            Create Event
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Grid container spacing={2} sx={{ mt: { xs: 1, md: 2 } }}>
                {eventsData.map((ev) => (
                    <Grid key={ev.id} size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card
                           
                            sx={{
                                borderRadius: "14px",
                                overflow: "hidden",
                                boxShadow: "0px 4px 30px 0px #0000001A",
                                bgcolor: "#FFFFFF",
                                backgroundColor: "#FFFFFF",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                maxWidth: "100%",
                                border: "1px solid rgba(0, 0, 0, 0.06)",
                            }}
                        >
                            {/* Reference: white card clearly visible — poster sits inside padded white frame (top/sides) */}
                            <Box
                                sx={{
                                    bgcolor: "#FFFFFF",
                                    backgroundColor: "#FFFFFF",
                                    p: "8px",
                                    // pb: "10px",
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: "100%",
                                        aspectRatio: "16 / 10",
                                        overflow: "hidden",
                                        borderRadius: "10px",
                                        bgcolor: "#FFFFFF",
                                        lineHeight: 0,
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={ev.image}
                                        alt=""
                                        loading="lazy"
                                        sx={{
                                            position: "absolute",
                                            inset: 0,
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            objectPosition: "center center",
                                            display: "block",
                                        }}
                                    />
                                    <IconButton
                                        size="small"
                                        onClick={handleMenuOpen}
                                        aria-label="Event options"
                                        sx={{
                                            position: "absolute",
                                            top: 8,
                                            right: 8,
                                            zIndex: 1,
                                            width: 36,
                                            height: 36,
                                            bgcolor: "#FFFFFF",
                                            boxShadow: "0px 2px 8px rgba(0,0,0,0.12)",
                                            "&:hover": { bgcolor: "#F5F5F5" },
                                        }}
                                    >
                                        <MoreVertIcon sx={{ color: "#2F2F2F", fontSize: 22 }} />
                                    </IconButton>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    px: 2,
                                    pt: 0,
                                    pb: 2,
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                    bgcolor: "#FFFFFF",
                                    backgroundColor: "#FFFFFF",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: "Outfit",
                                        fontWeight: 600,
                                        fontSize: "16px",
                                        lineHeight: 1.35,
                                        color: "#2F2F2F",
                                    }}
                                >
                                    {ev.title}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: "Outfit",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: 1.4,
                                        color: "#7A7A7A",
                                    }}
                                >
                                    {ev.location}
                                </Typography>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: "Outfit",
                                            fontWeight: 400,
                                            fontSize: "13px",
                                            color: "#7A7A7A",
                                        }}
                                    >
                                        {ev.dateRange}
                                    </Typography>
                                    <IconButton
                                        size="small"
                                        aria-label="View event"
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            minWidth: 40,
                                            flexShrink: 0,
                                            bgcolor: "#F36100",
                                            color: "#FFFFFF",
                                            "&:hover": { bgcolor: "#d95600" },
                                        }}
                                    >
                                        <VisibilityIcon sx={{ fontSize: 20 }} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Menu
                anchorEl={menuAnchor}
                open={menuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{
                    paper: {
                        sx: { borderRadius: "10px", minWidth: 160 },
                    },
                }}
            >
                <MenuItem
                    onClick={handleMenuClose}
                    sx={{ fontFamily: "Outfit", fontSize: 14 }}
                >
                    Edit
                </MenuItem>
                <MenuItem
                    onClick={handleMenuClose}
                    sx={{ fontFamily: "Outfit", fontSize: 14, color: "error.main" }}
                >
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
};

export default Event;
