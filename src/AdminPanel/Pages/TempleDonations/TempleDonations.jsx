import { useState , useEffect } from "react";
import { Box, Grid, Typography, Card, CardContent, } from "@mui/material";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
} from "@mui/material";
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
                boxShadow: "0px 4px 30px 0px #0000001A",
                borderRadius: "15px",
                backgroundColor: "white",
                marginTop: "20px"
            }}>



                <Box style={{ overflowX: "auto" }}>
                    <Table sx={{ border: "1px solid #EFEFEF", minWidth: "70rem" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Donation ID</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Donor Name</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Phone</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Temple Name</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Amount</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Country</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>State</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Date & Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {donationData?.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.donationId}</TableCell>
                                    <TableCell>{row.donorName}</TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <img
                                                src={row.templeImage}
                                                alt={row.templeName}
                                                style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover" }}
                                            />
                                            <Typography sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "14px", color: "#2F2F2F" }}>
                                                {row.templeName}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{row.originalAmount} {row.originalCurrency}</TableCell>
                                    <TableCell>{row.country}</TableCell>
                                    <TableCell>{row.state}</TableCell>
                                    <TableCell>
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