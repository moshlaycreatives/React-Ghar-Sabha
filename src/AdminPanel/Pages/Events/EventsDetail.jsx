import { useState , useEffect } from "react";
import { Box, Grid, Typography, Card, CardContent, } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
} from "@mui/material"; import {
    commonMutedTextSx,
    tableHeaderSx,
    templeNameSx,
} from "../../CommonStyles.js";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import toast from "react-hot-toast";



const memberData = [
    {
        Id: "1",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        WhatsAppNo: "+91 99743 60038",
        Mail: "rohan@vadtaldham.com",
        Family: "Yes",
        Gender: "Female",
        Country: "India",
        MemberS: "2026",
        Dates: "12/03/2025 - 12:35PM"
    },
    {
        Id: "2",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        WhatsAppNo: "+91 99743 60038",
        Mail: "rohan@vadtaldham.com",
        Family: "Yes",
        Gender: "Female",
        Country: "India",
        MemberS: "2026",
        Dates: "12/03/2025 - 12:35PM"
    },
    {
        Id: "3",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        WhatsAppNo: "+91 99743 60038",
        Mail: "rohan@vadtaldham.com",
        Family: "Yes",
        Gender: "Female",
        Country: "India",
        MemberS: "2026",
        Dates: "12/03/2025 - 12:35PM"
    },
    {
        Id: "4",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        WhatsAppNo: "+91 99743 60038",
        Mail: "rohan@vadtaldham.com",
        Family: "Yes",
        Gender: "Female",
        Country: "India",
        MemberS: "2026",
        Dates: "12/03/2025 - 12:35PM"
    },
    {
        Id: "5",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        WhatsAppNo: "+91 99743 60038",
        Mail: "rohan@vadtaldham.com",
        Family: "Yes",
        Gender: "Female",
        Country: "India",
        MemberS: "2026",
        Dates: "12/03/2025 - 12:35PM"
    },
    {
        Id: "6",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        WhatsAppNo: "+91 99743 60038",
        Mail: "rohan@vadtaldham.com",
        Family: "Yes",
        Gender: "Female",
        Country: "India",
        MemberS: "2026",
        Dates: "12/03/2025 - 12:35PM"
    },
    {
        Id: "7",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        WhatsAppNo: "+91 99743 60038",
        Mail: "rohan@vadtaldham.com",
        Family: "Yes",
        Gender: "Female",
        Country: "India",
        MemberS: "2026",
        Dates: "12/03/2025 - 12:35PM"
    },
    {
        Id: "8",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        WhatsAppNo: "+91 99743 60038",
        Mail: "rohan@vadtaldham.com",
        Family: "Yes",
        Gender: "Female",
        Country: "India",
        MemberS: "2026",
        Dates: "12/03/2025 - 12:35PM"
    },
    {
        Id: "9",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        WhatsAppNo: "+91 99743 60038",
        Mail: "rohan@vadtaldham.com",
        Family: "Yes",
        Gender: "Female",
        Country: "India",
        MemberS: "2026",
        Dates: "12/03/2025 - 12:35PM"
    },
    {
        Id: "10",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        WhatsAppNo: "+91 99743 60038",
        Mail: "rohan@vadtaldham.com",
        Family: "Yes",
        Gender: "Female",
        Country: "India",
        MemberS: "2026",
        Dates: "12/03/2025 - 12:35PM"
    },
]



const EventsDetail = () => {
    const location = useLocation();
    const { id } = location.state || {};
    const [EventDetail, setEventDetail] = useState(null);



    const GetEventDetail = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.AdminCreateNewEvent}/${id}/members`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setEventDetail(response?.data?.data?.members || []);
        } catch (error) {
            setEventDetail([]);
            toast.error(error.response?.data?.message || "Failed to fetch Event");
        }
    };


    useEffect(() => {
        GetEventDetail();
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
                    Dashboard/Events<span style={{ color: "#F36100" }}>/Event Details</span>
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
                            padding: "10px 16px",
                        }
                    }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={tableHeaderSx}>Sr No.</TableCell>
                                <TableCell sx={tableHeaderSx}>Member ID</TableCell>
                                <TableCell sx={tableHeaderSx}>Name</TableCell>
                                <TableCell sx={tableHeaderSx}>Phone</TableCell>
                                <TableCell sx={tableHeaderSx}>Mail</TableCell>
                                <TableCell sx={tableHeaderSx}>Gender</TableCell>
                                <TableCell sx={tableHeaderSx}>Country</TableCell>
                                <TableCell sx={tableHeaderSx}>Member Since</TableCell>
                                <TableCell sx={tableHeaderSx}>Date & Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {EventDetail?.map((row, index) => (
                                <TableRow key={row.memberId || index}>
                                    <TableCell sx={commonMutedTextSx}>{row.srNo}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.memberId}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.name}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.phone}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.mail}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.gender}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.country}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.memberSince}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{new Date(row.dateTime).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>


                    </Table>

                </Box>


            </Box>

        </>
    )
}

export default EventsDetail;