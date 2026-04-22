import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
    DashboardPageHeader,
    DashboardToolbarButton,
} from "../../../components/DashboardPageHeader.jsx";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../../utils/apiErrorMessage.js";
import { TableEmptyRow, TableLoadingRow } from "../../../components/ListEmptyPlaceholder.jsx";
import DeleteTemple from "./DeleteTemple.jsx";
import {
    commonMutedTextSx,
    tableHeaderSx,
    templeNameSx,
} from "../../CommonStyles.js";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    Select,
    Button,
} from "@mui/material";

function templeRowImageUrl(images) {
    const first = images?.[0];
    if (!first) return null;
    if (typeof first === "string") return first;
    if (typeof first === "object") {
        return first.url ?? first.fileUrl ?? first.mediaUrl ?? first.path ?? first.location ?? null;
    }
    return null;
}


const Temples = () => {
    const navigate = useNavigate();
    const [templeData, settempleData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuUserId, setMenuUserId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const open = Boolean(anchorEl);

    // Pagination states
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));
    const [listLoaded, setListLoaded] = useState(false);



    const handleMenuClick = (event, userId) => {
        setAnchorEl(event.currentTarget);
        setMenuUserId(userId);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setMenuUserId(null);
    };

    const handleAddtemple = () => {
        navigate(`/dashboard/add-temple`)
    };

    const patchTempleInactive = async (templeId, nextInactive) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(
                endpoints.AdminTempleInactive(templeId),
                { inactive: nextInactive },
                { headers: { Authorization: `Bearer ${token}` } },
            );
            toast.success(nextInactive ? "Temple deactivated" : "Temple activated");
            handleClose();
            await GetAlltemple(page, limit);
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Failed to update temple status"));
        }
    };

    const GetAlltemple = async (currentPage = page, currentLimit = limit) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.AdminAddTemple}?page=${currentPage}&limit=${currentLimit}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            settempleData(response?.data?.data?.temples || []);
            setTotalCount(response?.data?.data?.pagination?.total || 0);
        } catch (error) {
            settempleData([]);
            setTotalCount(0);
            toast.error(getApiErrorMessage(error, "Failed to load temples"));
        } finally {
            setListLoaded(true);
        }
    };


    useEffect(() => {
        GetAlltemple(page, limit);
    }, [page, limit]);



    return (
        <>
            <DashboardPageHeader
                accentSegment="Temples"
                action={
                    <DashboardToolbarButton onClick={handleAddtemple} startIcon={<AddIcon />}>
                        Add Temple
                    </DashboardToolbarButton>
                }
            />

            <Box sx={{
                borderRadius: "20px",
                backgroundColor: "white",
                marginTop: "20px"
            }}>

                <Box style={{ overflowX: "auto" }}>
                    <Table sx={{
                        minWidth: "70rem",
                        "& .MuiTableBody-root .MuiTableCell-root": {
                            padding: "8px 16px",
                        }
                    }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={tableHeaderSx}>Temple ID</TableCell>
                                <TableCell sx={tableHeaderSx}>Temple Name</TableCell>
                                <TableCell sx={tableHeaderSx}>Phone</TableCell>
                                <TableCell sx={tableHeaderSx}>Mail</TableCell>
                                <TableCell sx={tableHeaderSx}>WhatsApp No.</TableCell>
                                <TableCell sx={tableHeaderSx}>Country</TableCell>
                                <TableCell sx={tableHeaderSx}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!listLoaded ? (
                                <TableLoadingRow colSpan={7} />
                            ) : templeData.length === 0 ? (
                                <TableEmptyRow
                                    colSpan={7}
                                    title="No temples available"
                                    description="No temple listings were returned. Add a temple to see it here."
                                />
                            ) : (
                            templeData?.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell sx={commonMutedTextSx}>{row.customId}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <img
                                                src={templeRowImageUrl(row.images) || "/image/Tpimage.png"}
                                                alt={row.title}
                                                style={{ width: "36px", height: "36px", borderRadius: "20px", objectFit: "cover" }}
                                            />
                                            <Typography sx={commonMutedTextSx}>
                                                {row.title}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.phone}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.email}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.whatsappNumber}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.country}</TableCell>

                                    <TableCell>
                                        <IconButton
                                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={(e) => handleMenuClick(e, row.id)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="demo-positioned-menu"
                                            aria-labelledby="demo-positioned-button"
                                            anchorEl={anchorEl}
                                            open={open && menuUserId === row.id}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            slotProps={{
                                                paper: {
                                                    sx: { borderRadius: "10px", minWidth: 160 },
                                                },
                                            }}
                                        >

                                            <MenuItem
                                                onClick={() => navigate(`/dashboard/edit-temple/${menuUserId}`)}
                                                sx={{ fontSize: 14, gap: 1 }}
                                            >
                                                <EditOutlinedIcon sx={{ fontSize: 18 }} />
                                                Edit
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => patchTempleInactive(row.id, !row.inactive)}
                                                sx={{ fontSize: 14, gap: 1 }}
                                            >
                                                <ToggleOffOutlinedIcon sx={{ fontSize: 18 }} />
                                                {row.inactive ? "Activate" : "Deactivate"}
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    setIsDeleteModalOpen(true);
                                                    setAnchorEl(null);
                                                }}
                                                sx={{ fontSize: 14, color: "error.main", gap: 1 }}
                                            >
                                                <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
                                                Delete
                                            </MenuItem>

                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))
                            )}
                        </TableBody>


                    </Table>

                </Box>


                {/* Pagination Section */}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "20px",
                        borderTop: "1px solid #EFEFEF",
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "Inter",
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#666666",
                        }}
                    >
                        Showing {templeData.length} of <span style={{ fontWeight: 700, color: "#000" }}>{totalCount}</span>
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Button
                            onClick={() => {
                                if (page > 1) setPage(page - 1);
                            }}
                            disabled={page === 1}
                            sx={{
                                textTransform: "none",
                                minWidth: "auto",
                                p: 0,
                                color: page === 1 ? "#999 !important" : "#666",
                                fontFamily: "Inter",
                                fontSize: "14px",
                                fontWeight: 500,
                                "&:hover": {
                                    backgroundColor: "transparent",
                                    color: page === 1 ? "#999" : "#000",
                                },
                            }}
                        >
                            Previous
                        </Button>

                        {/* Pagination Numbers */}
                        <Box sx={{ display: "flex", gap: "5px" }}>
                            {(() => {
                                const pages = [];
                                const maxVisiblePages = 5;

                                if (totalPages <= maxVisiblePages + 2) {
                                    for (let i = 1; i <= totalPages; i++) {
                                        pages.push(i);
                                    }
                                } else {
                                    if (page <= 3) {
                                        for (let i = 1; i <= 4; i++) {
                                            pages.push(i);
                                        }
                                        pages.push("...");
                                        pages.push(totalPages);
                                    } else if (page >= totalPages - 2) {
                                        pages.push(1);
                                        pages.push("...");
                                        for (let i = totalPages - 3; i <= totalPages; i++) {
                                            pages.push(i);
                                        }
                                    } else {
                                        pages.push(1);
                                        pages.push("...");
                                        pages.push(page - 1);
                                        pages.push(page);
                                        pages.push(page + 1);
                                        pages.push("...");
                                        pages.push(totalPages);
                                    }
                                }

                                return pages.map((p, index) => {
                                    if (p === "...") {
                                        return (
                                            <Typography key={`ellipsis-${index}`} sx={{ alignSelf: "center", color: "#666", px: 0.5 }}>
                                                ...
                                            </Typography>
                                        );
                                    }
                                    return (
                                        <Box
                                            key={p}
                                            onClick={() => setPage(p)}
                                            sx={{
                                                width: "32px",
                                                height: "32px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: "8px",
                                                cursor: "pointer",
                                                backgroundColor: page === p ? "#F36100" : "transparent",
                                                color: page === p ? "white" : "#666",
                                                fontFamily: "Inter",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                "&:hover": {
                                                    backgroundColor: page === p ? "#F36100" : "#F5F5F5",
                                                },
                                            }}
                                        >
                                            {p}
                                        </Box>
                                    );
                                });
                            })()}
                        </Box>

                        <Button
                            onClick={() => {
                                if (page < totalPages) setPage(page + 1);
                            }}
                            disabled={page >= totalPages}
                            sx={{
                                textTransform: "none",
                                minWidth: "auto",
                                p: 0,
                                color: page >= totalPages ? "#999 !important" : "#666",
                                fontFamily: "Inter",
                                fontSize: "14px",
                                fontWeight: 500,
                                "&:hover": {
                                    backgroundColor: "transparent",
                                    color: page >= totalPages ? "#999" : "#000",
                                },
                            }}
                        >
                            Next
                        </Button>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Select
                            value={limit}
                            onChange={(e) => {
                                setLimit(parseInt(e.target.value, 10));
                                setPage(1); // Reset to page 1 when limit changes
                            }}
                            size="small"
                            sx={{
                                height: "32px",
                                fontSize: "14px",
                                fontFamily: "Inter",
                                minWidth: "70px",
                                ".MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#EFEFEF",
                                },
                            }}
                        >
                            {[5, 10, 15, 20, 50].map((l) => (
                                <MenuItem key={l} value={l}>
                                    {l}
                                </MenuItem>
                            ))}
                        </Select>
                        <Typography
                            sx={{
                                fontFamily: "Inter",
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "#666666",
                            }}
                        >
                            Rows per page
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <DeleteTemple
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                id={menuUserId}
                onDelete={GetAlltemple}
            />

        </>
    )
}

export default Temples;