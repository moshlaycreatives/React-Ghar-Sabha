import { useState } from "react";
import { Box, Grid, Typography, Card, CardContent, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
} from "@mui/material";



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
    const navigate = useNavigate();



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
                boxShadow: "0px 4px 30px 0px #0000001A",
                borderRadius: "15px",
                backgroundColor: "white",
                marginTop: "20px"
            }}>

                <Box style={{ overflowX: "auto" }}>
                    <Table sx={{ border: "1px solid #EFEFEF", minWidth: "70rem" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Sr No.</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Member ID</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Name</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Phone</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Mail</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Gender</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Country</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Member Since</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Date & Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {memberData?.map((row) => (
                                <TableRow key={row.Id}>
                                    <TableCell>{row.Id}</TableCell>
                                    <TableCell>{row.MId}</TableCell>
                                    <TableCell>{row.Name}</TableCell>
                                    <TableCell>{row.Phone}</TableCell>
                                    <TableCell>{row.Mail}</TableCell>
                                    <TableCell>{row.Gender}</TableCell>
                                    <TableCell>{row.Country}</TableCell>
                                    <TableCell>{row.MemberS}</TableCell>
                                    <TableCell>{row.Dates}</TableCell>
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