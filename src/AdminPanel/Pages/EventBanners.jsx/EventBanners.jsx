import { useState } from "react";
import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    Button,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddBannerPopup from "./AddBannerPopup.jsx";


const ACCENT = "#F36100";
const TEXT = "#2F2F2F";


const bannerCards = [
    {
        id: "1",
        title: "Upcoming Event",
        image: "/image/Deventimage.png",
        totalAttendees: 12545,
        progressPercent: 40,
    },
];

const formatCount = (n) => n.toLocaleString("en-IN");



const EventBanners = () => {
    const [addBannerOpen, setAddBannerOpen] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [menuForId, setMenuForId] = useState(null);

    const handleMenuOpen = (event, id) => {
        setMenuAnchor(event.currentTarget);
        setMenuForId(id);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
        setMenuForId(null);
    };

    const handleOpenAddBanner = () => setAddBannerOpen(true);
    const handleCloseAddBanner = () => setAddBannerOpen(false);

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
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: { xs: "26px", md: "36px" },
                                    color: "#2F2F2F",
                                }}
                            >
                                Dashboard<span style={{ color: ACCENT }}>/Event Banners</span>
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
                            type="button"
                            onClick={handleOpenAddBanner}
                            sx={{
                                backgroundColor: ACCENT,
                                border: `1px solid ${ACCENT}`,
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
                            Add Banner
                        </Button>
                    </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ mt: { xs: 1, md: 2 } }}>
                    {bannerCards.map((item) => (
                        <Grid key={item.id} size={{ xs: 12, sm: 6, lg: 6 }}>
                            <Card
                                elevation={0}
                                sx={{
                                    borderRadius: "14px",
                                    bgcolor: "#FFFFFF",
                                    boxShadow: "0px 2px 12px rgba(47, 47, 47, 0.08)",
                                    border: "1px solid rgba(47, 47, 47, 0.06)",
                                    overflow: "visible",
                                }}
                            >
                                <CardContent sx={{ p: "12px 14px !important", "&:last-child": { pb: "12px !important" } }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            mb: 1.25,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: "Inter",
                                                fontWeight: 700,
                                                fontSize: "15px",
                                                lineHeight: 1.2,
                                                color: TEXT,
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            onClick={(e) => handleMenuOpen(e, item.id)}
                                            sx={{
                                                bgcolor: ACCENT,
                                                width: 32,
                                                height: 32,
                                                "&:hover": { bgcolor: "#d95600" },
                                            }}
                                        >
                                            <MoreVertIcon
                                                sx={{ color: "#fff", fontSize: 18 }}
                                            />
                                        </IconButton>
                                        <Menu
                                            anchorEl={menuAnchor}
                                            open={Boolean(menuAnchor) && menuForId === item.id}
                                            onClose={handleMenuClose}
                                            anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "right",
                                            }}
                                            transformOrigin={{
                                                vertical: "top",
                                                horizontal: "right",
                                            }}
                                        >
                                            <MenuItem onClick={handleMenuClose}>
                                                Edit
                                            </MenuItem>
                                            <MenuItem
                                                onClick={handleMenuClose}
                                                sx={{ color: "#ED4040" }}
                                            >
                                                Delete
                                            </MenuItem>
                                        </Menu>
                                    </Box>

                                    <Box
                                        component="img"
                                        src={item.image}
                                        alt=""
                                        sx={{
                                            width: "100%",
                                            height: "250px",
                                            display: "block",
                                            borderRadius: "10px",
                                            objectFit: "cover",
                                            bgcolor: "#f5f5f5",
                                        }}
                                    />

                                    <Box sx={{ mt: 1.25 }}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                mb: 0.75,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: "Inter",
                                                    fontWeight: 500,
                                                    fontSize: "18px",
                                                    lineHeight: 1.2,
                                                    color: "#2F2F2F",
                                                }}
                                            >
                                                Total Attendees:
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontFamily: "Inter",
                                                    fontWeight: 700,
                                                    fontSize: "13px",
                                                    lineHeight: 1.2,
                                                    color: "#2F2F2F",
                                                }}
                                            >
                                                {formatCount(item.totalAttendees)}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                height: 8,
                                                borderRadius: 999,
                                                bgcolor: "rgba(243, 97, 0, 0.15)",
                                                overflow: "hidden",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    height: "100%",
                                                    width: `${item.progressPercent}%`,
                                                    borderRadius: 999,
                                                    bgcolor: ACCENT,
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <AddBannerPopup
                open={addBannerOpen}
                onClose={handleCloseAddBanner}
                onAddBanner={(_payload) => {
                    /* _payload: { file, attendancePoll } — wire API when ready */
                }}
            />
        </>
    );
};

export default EventBanners;
