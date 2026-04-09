import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
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
import {
    commonMutedTextSx,
    tableHeaderSx,
    templeNameSx,
} from "../../CommonStyles.js";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../../utils/apiErrorMessage.js";
import { TableEmptyRow, TableLoadingRow } from "../../../components/ListEmptyPlaceholder.jsx";






const Members = () => {
    const navigate = useNavigate();
    const [memberData, setmemberData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuUserId, setMenuUserId] = useState(null);
    const open = Boolean(anchorEl);

    // Pagination states
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
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


    const hanldememberDetail = (id) => {
        navigate(`/dashboard/member-detail`, { state: { id } })
    }


    const GetAllmenber = async (currentPage = page, currentLimit = limit) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.GetAdminAllUser}?page=${currentPage}&limit=${currentLimit}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setmemberData(response?.data?.data?.users || []);
            setTotalCount(response?.data?.data?.pagination?.total || 0);
        } catch (error) {
            setmemberData([]);
            setTotalCount(0);
            toast.error(getApiErrorMessage(error, "Could not load members"));
        } finally {
            setListLoaded(true);
        }
    };


    useEffect(() => {
        GetAllmenber(page, limit);
    }, [page, limit]);


    return (
        <>
            <Box>
                <Typography
                    sx={{
                        fontFamily: "Inter",
                        fontWeight: 600,
                        fontSize: { xs: "26px", md: "36px" },
                        color: "#2F2F2F",
                    }}>
                    Dashboard<span style={{ color: "#F36100" }}>/Members</span>
                </Typography>
            </Box>



            <Box sx={{

                borderRadius: "20px",
                backgroundColor: "white",
                marginTop: "20px"
            }}>

                <Box style={{ overflowX: "auto" }}>
                    <Table sx={{
                        minWidth: "70rem", "& .MuiTableBody-root .MuiTableCell-root": {
                            padding: "8px 16px",
                        }
                    }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={tableHeaderSx}>Member ID</TableCell>
                                <TableCell sx={tableHeaderSx}>Name</TableCell>
                                <TableCell sx={tableHeaderSx}>Phone</TableCell>
                                <TableCell sx={tableHeaderSx}>WhatsApp No.</TableCell>
                                <TableCell sx={tableHeaderSx}>Mail</TableCell>
                                <TableCell sx={tableHeaderSx}>Family</TableCell>
                                <TableCell sx={tableHeaderSx}>Gender</TableCell>
                                <TableCell sx={tableHeaderSx}>Country</TableCell>
                                <TableCell sx={tableHeaderSx}>Member Since</TableCell>
                                <TableCell sx={tableHeaderSx}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!listLoaded ? (
                                <TableLoadingRow colSpan={10} />
                            ) : memberData.length === 0 ? (
                                <TableEmptyRow
                                    colSpan={10}
                                    title="No members available"
                                    description="No member records were returned. New members will appear here once they register."
                                />
                            ) : (
                            memberData?.map((row) => (
                                <TableRow key={row.id || row._id}>
                                    <TableCell sx={commonMutedTextSx}>{row.customId || "-"}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{`${row.firstName || ""} ${row.lastName || ""}`.trim() || "-"}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{`${row?.phone?.countryCode || ""} ${row?.phone?.number || ""}`.trim() || "-"}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{`${row?.whatsappNumber?.countryCode || ""} ${row?.whatsappNumber?.number || ""}`.trim() || "-"}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.email || "-"}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.hasFamilyMember ? "Yes" : "No"}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.gender || "-"}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.country || "-"}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.createdAt ? new Date(row.createdAt).getFullYear() : "-"}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={(e) => handleMenuClick(e, row.id || row._id)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="demo-positioned-menu"
                                            aria-labelledby="demo-positioned-button"
                                            anchorEl={anchorEl}
                                            open={open && menuUserId === (row.id || row._id)}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >

                                            <MenuItem onClick={() => hanldememberDetail(row.id)}>Member Details</MenuItem>

                                            {/* <MenuItem sx={{ color: "#ED4040", gap: "5px" }}>
                                                <RiDeleteBinLine fontSize="20px" />
                                                Delete</MenuItem> */}

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
                        Showing {memberData.length} of <span style={{ fontWeight: 700, color: "#000" }}>{totalCount}</span>
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

        </>
    )
}

export default Members;