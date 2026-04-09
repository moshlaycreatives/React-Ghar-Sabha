import { useParams } from "react-router-dom";
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
import { useState, useEffect } from "react";





const DonationsDetail = () => {
    const { id } = useParams();
    const [DonationDetailData, setDonationDetailData] = useState(null);

    // Pagination states
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));
    const [listLoaded, setListLoaded] = useState(false);

    const payments = DonationDetailData?.payments ?? [];
    const paymentTableColSpan = DonationDetailData?.stats?.type === "item" ? 8 : 7;


    const GetAllDonation = async (currentPage = page, currentLimit = limit) => {
        if (!id) {
            setListLoaded(true);
            return;
        }
        setListLoaded(false);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.AdminDonations}/${id}/payments?page=${currentPage}&limit=${currentLimit}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const payload = response?.data?.data;
            const normalized =
                payload && typeof payload === "object" && !Array.isArray(payload)
                    ? payload
                    : { payments: [], stats: null };
            setDonationDetailData(normalized);
            setTotalCount(normalized?.pagination?.total || 0);
        } catch (error) {
            setDonationDetailData({ payments: [], stats: null });
            setTotalCount(0);
            toast.error(getApiErrorMessage(error, "Could not load donation details"));
        } finally {
            setListLoaded(true);
        }
    };


    useEffect(() => {
        if (!id) {
            setListLoaded(true);
            return;
        }
        GetAllDonation(page, limit);
    }, [id, page, limit]);


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
                    Dashboard/Other Donations<span style={{ color: "#F36100" }}>/Donation Details</span>
                </Typography>
            </Box>


            <Grid container spacing={2} mt={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{
                        borderRadius: "20px",
                        backgroundColor: "white",
                        padding: "10px 15px 10px 15px",
                        height: "140px"
                    }}>
                        <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', }}>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "25px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F"
                                }}>

                                Total Needed
                            </Typography>
                            <Box sx={{ display: 'flex', gap: "10px" }}>
                                <img src="/image/Dicon.png" />
                            </Box>
                        </Box >
                        <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', }} mt={3}>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "30px",
                                    lineHeight: "31px",
                                    color: "#222222"
                                }}>

                                {DonationDetailData?.stats?.type === "amount" ? DonationDetailData?.stats?.currency : ""}{DonationDetailData?.stats?.totalNeeded || 0}
                            </Typography>
                        </Box >
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{
                        borderRadius: "20px",
                        backgroundColor: "white",
                        padding: "10px 15px 10px 15px",
                        height: "140px"
                    }}>
                        <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', }}>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "23.5px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F"
                                }}>

                                Received
                            </Typography>
                            <Box sx={{ display: 'flex', gap: "10px" }}>
                                <img src="/image/TDIcon.png" />
                            </Box>
                        </Box >
                        <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', }} mt={3}>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "30px",
                                    lineHeight: "31px",
                                    color: "#222222"
                                }}>

                                {DonationDetailData?.stats?.type === "amount" ? DonationDetailData?.stats?.currency : ""}{DonationDetailData?.stats?.received || 0}
                            </Typography>
                        </Box >
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{
                        borderRadius: "20px",
                        backgroundColor: "white",
                        padding: "10px 15px 10px 15px",
                        height: "140px"
                    }}>
                        <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', }}>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "25px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F"
                                }}>

                                Still Needed
                            </Typography>
                            <Box sx={{ display: 'flex', gap: "10px" }}>
                                <img src="/image/Dicon.png" />
                            </Box>
                        </Box >
                        <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', }} mt={3}>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "30px",
                                    lineHeight: "31px",
                                    color: "#222222"
                                }}>

                                {DonationDetailData?.stats?.type === "amount" ? DonationDetailData?.stats?.currency : ""}{DonationDetailData?.stats?.stillNeeded || 0}
                            </Typography>
                        </Box >
                    </Box>
                </Grid>

            </Grid>


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
                                {DonationDetailData?.stats?.type === "item" && (
                                    <TableCell sx={tableHeaderSx}>Qty</TableCell>
                                )}
                                <TableCell sx={tableHeaderSx}>Amount</TableCell>
                                <TableCell sx={tableHeaderSx}>Country</TableCell>
                                <TableCell sx={tableHeaderSx}>State</TableCell>
                                <TableCell sx={tableHeaderSx}>Date & Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!listLoaded ? (
                                <TableLoadingRow colSpan={8} />
                            ) : payments.length === 0 ? (
                                <TableEmptyRow
                                    colSpan={paymentTableColSpan}
                                    title="No donation payments available"
                                    description="No contributions have been recorded for this donation yet."
                                />
                            ) : (
                            DonationDetailData?.payments?.map((row, idx) => (
                                <TableRow key={row._id || row.id || row.Id || idx}>
                                    <TableCell sx={commonMutedTextSx}>{row.memberId}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.name}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.phone}</TableCell>
                                    {DonationDetailData?.stats?.type === "item" && (
                                        <TableCell sx={commonMutedTextSx}>{row.quantity}</TableCell>
                                    )}
                                    <TableCell sx={commonMutedTextSx}>{row.currency}{row.amount}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.country}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.state}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{new Date(row.dateTime).toLocaleString()}</TableCell>
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
                        Showing {payments.length} of <span style={{ fontWeight: 700, color: "#000" }}>{totalCount}</span>
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

export default DonationsDetail;