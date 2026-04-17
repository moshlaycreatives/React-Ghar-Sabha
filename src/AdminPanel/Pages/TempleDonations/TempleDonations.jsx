import { useState, useEffect } from "react";
import { Box, Grid, Typography, Card, CardContent, MenuItem, Select, Button } from "@mui/material";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
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



const TempleDonations = () => {
    const [donationData, setDonationData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination states
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));

    const getAllTempleDonations = async (currentPage = page, currentLimit = limit) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.GetTempleDonations}?page=${currentPage}&limit=${currentLimit}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setDonationData(response?.data?.data?.payments || []);
            setTotalCount(response?.data?.data?.pagination?.total || 0);
        } catch (error) {
            setDonationData([]);
            setTotalCount(0);
            toast.error(getApiErrorMessage(error, "Could not load temple donations"));
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getAllTempleDonations(page, limit);
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
                    Dashboard<span style={{ color: "#F36100" }}>/Temple Donations</span>
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
                                <TableCell sx={tableHeaderSx}>Donation ID</TableCell>
                                <TableCell sx={tableHeaderSx}>Donor Name</TableCell>
                                <TableCell sx={tableHeaderSx}>Phone</TableCell>
                                <TableCell sx={tableHeaderSx}>Temple Name</TableCell>
                                <TableCell sx={tableHeaderSx}>Amount</TableCell>
                                <TableCell sx={tableHeaderSx}>Country</TableCell>
                                <TableCell sx={tableHeaderSx}>State</TableCell>
                                <TableCell sx={tableHeaderSx}>Date & Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableLoadingRow colSpan={8} />
                            ) : donationData.length === 0 ? (
                                <TableEmptyRow
                                    colSpan={8}
                                    title="No temple donations available"
                                    description="No temple donation payments were found for this list."
                                />
                            ) : (
                            donationData?.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell sx={commonMutedTextSx}>{row.donationId}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.donorName}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.phone}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <img
                                                src={row.templeImage}
                                                alt={row.templeName}
                                                style={{ width: "36px", height: "36px", borderRadius: "20px", objectFit: "cover" }}
                                            />
                                            <Typography sx={commonMutedTextSx}>
                                                {row.templeName}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.currencySymbol}{row.amount}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.country}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.state}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>
                                        {new Date(row.dateTime).toLocaleDateString()} - {new Date(row.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                        Showing {donationData.length} of <span style={{ fontWeight: 700, color: "#000" }}>{totalCount}</span>
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

export default TempleDonations;