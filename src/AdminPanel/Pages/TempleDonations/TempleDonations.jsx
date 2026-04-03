import { useState, useEffect } from "react";
import { Box, Grid, Typography, Card, CardContent, } from "@mui/material";

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



const TempleDonations = () => {
    const [donationData, setDonationData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllTempleDonations = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.GetTempleDonations}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setDonationData(response?.data?.data?.payments || []);
        } catch (error) {
            setDonationData([]);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getAllTempleDonations();
    }, []);


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
                            {donationData?.map((row) => (
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
                                    <TableCell sx={commonMutedTextSx}>{row.originalAmount} {row.originalCurrency}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.country}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.state}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>
                                        {new Date(row.dateTime).toLocaleDateString()} - {new Date(row.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </TableCell>


                                </TableRow>
                            ))}
                            {donationData.length === 0 && !loading && (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">No donations found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>


                    </Table>

                </Box>


            </Box>

        </>
    )
}

export default TempleDonations;