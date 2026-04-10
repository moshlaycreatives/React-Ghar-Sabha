import { useState , useEffect } from "react";
import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddBannerPopup from "./AddBannerPopup.jsx";
import EditBanner from "./EditBanner.jsx";
import DeleteBanner from "./DeleteBanner.jsx";
import {
    DashboardPageHeader,
    DashboardToolbarButton,
} from "../../../components/DashboardPageHeader.jsx";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../../utils/apiErrorMessage.js";
import { ListEmptyPlaceholder } from "../../../components/ListEmptyPlaceholder.jsx";





const formatCount = (n) => n.toLocaleString("en-IN");

const EventBanners = () => {
    const [BannerData, setBannerData] = useState([]);
    const [addBannerOpen, setAddBannerOpen] = useState(false);
    const [editBannerOpen, setEditBannerOpen] = useState(false);
    const [deleteBannerOpen, setDeleteBannerOpen] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [menuForId, setMenuForId] = useState(null);
    const [listLoaded, setListLoaded] = useState(false);

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

    const handleOpenEditBanner = () => {
        setEditBannerOpen(true);
        setMenuAnchor(null);
    };
    const handleCloseEditBanner = () => {
        setEditBannerOpen(false);
        setMenuForId(null);
    };

    const handleOpenDeleteBanner = () => {
        setDeleteBannerOpen(true);
        setMenuAnchor(null);
    };
    const handleCloseDeleteBanner = () => {
        setDeleteBannerOpen(false);
        setMenuForId(null);
    };



    const GetAllBanner = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.AdminEventBanner}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setBannerData(response?.data?.data?.banners || []);
        } catch (error) {
            setBannerData([]);
            toast.error(getApiErrorMessage(error, "Failed to fetch banners"));
        } finally {
            setListLoaded(true);
        }
    };


    useEffect(() => {
        GetAllBanner();
    }, []);



    return (
        <>
            <DashboardPageHeader
                accentSegment="Event Banners"
                action={
                    <DashboardToolbarButton
                        type="button"
                        startIcon={<AddIcon />}
                        onClick={handleOpenAddBanner}
                    >
                        Add Banner
                    </DashboardToolbarButton>
                }
            />

            <Grid container spacing={3} sx={{ mt: { xs: 1, md: 2 } }}>
                {!listLoaded ? (
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ borderRadius: "20px", bgcolor: "white", py: 6 }}>
                            <ListEmptyPlaceholder title="Loading…" minHeight={120} />
                        </Box>
                    </Grid>
                ) : BannerData.length === 0 ? (
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ borderRadius: "20px", bgcolor: "white" }}>
                            <ListEmptyPlaceholder
                                title="No event banners available"
                                description="Add a banner to promote upcoming events on the app."
                            />
                        </Box>
                    </Grid>
                ) : (
                BannerData.map((item, index) => (
                    <Grid key={item.id} size={{ xs: 12, sm: 6, lg: 6 }}>
                        <Card
                            elevation={0}
                            sx={{
                                borderRadius: "20px",
                                bgcolor: "#FFFFFF",
                              
                                border: "1px solid #FFFFFF",
                                overflow: "visible",
                            }}
                        >
                            <CardContent
                                sx={{
                                    p: "12px 14px !important",
                                    "&:last-child": { pb: "12px !important" },
                                }}
                            >
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
                                            fontWeight: 700,
                                            fontSize: "15px",
                                            lineHeight: 1.2,
                                            color: "text.primary",
                                        }}
                                    >
                                        Upcoming Event {index + 1}
                                    </Typography>
                                    <IconButton
                                        size="small"
                                        onClick={(e) =>
                                            handleMenuOpen(e, item.id)
                                        }
                                        sx={{
                                            bgcolor: "primary.main",
                                            width: 32,
                                            height: 32,
                                            "&:hover": {
                                                bgcolor: "primary.dark",
                                            },
                                        }}
                                    >
                                        <MoreVertIcon
                                            sx={{ color: "#fff", fontSize: 18 }}
                                        />
                                    </IconButton>
                                    <Menu
                                        anchorEl={menuAnchor}
                                        open={
                                            Boolean(menuAnchor) &&
                                            menuForId === item.id
                                        }
                                        onClose={handleMenuClose}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "right",
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        slotProps={{
                                            paper: {
                                                sx: { borderRadius: "10px", minWidth: 160 },
                                            },
                                        }}
                                    >
                                        <MenuItem onClick={handleOpenEditBanner} sx={{ fontSize: 14, gap: 1 }}>
                                            <EditOutlinedIcon sx={{ fontSize: 18 }} />
                                            Edit
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleOpenDeleteBanner}
                                            sx={{ fontSize: 14, color: "error.main", gap: 1 }}
                                        >
                                            <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
                                            Delete
                                        </MenuItem>
                                    </Menu>
                                </Box>

                                <Box
                                    component="img"
                                    src={item.imageUrl}
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

                                {item.isPollEnabled && (
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
                                                    fontWeight: 500,
                                                    fontSize: "18px",
                                                    lineHeight: 1.2,
                                                    color: "text.primary",
                                                }}
                                            >
                                                Total Attendees:
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontWeight: 700,
                                                    fontSize: "13px",
                                                    lineHeight: 1.2,
                                                    color: "text.primary",
                                                }}
                                            >
                                                {formatCount(item.totalUserCount || 0)}
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
                                                    width: `${item.percentage || 0}%`,
                                                    borderRadius: 999,
                                                    bgcolor: "primary.main",
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))
                )}
            </Grid>

            <AddBannerPopup
                open={addBannerOpen}
                onClose={handleCloseAddBanner}
                onAddBanner={() => {
                    GetAllBanner();
                }}
            />

            <EditBanner
                open={editBannerOpen}
                onClose={handleCloseEditBanner}
                id={menuForId}
                onUpdateBanner={() => {
                    GetAllBanner();
                }}
            />

            <DeleteBanner
                open={deleteBannerOpen}
                onClose={handleCloseDeleteBanner}
                id={menuForId}
                onDelete={() => {
                    GetAllBanner();
                }}
            />
        </>
    );
};

export default EventBanners;
