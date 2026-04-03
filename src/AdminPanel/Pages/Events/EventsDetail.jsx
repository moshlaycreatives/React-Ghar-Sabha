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
} from "@mui/material"; import {
    commonMutedTextSx,
    tableHeaderSx,
    templeNameSx,
} from "../../CommonStyles.js";



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
                            {memberData?.map((row) => (
                                <TableRow key={row.Id}>
                                    <TableCell sx={commonMutedTextSx}>{row.Id}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.MId}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.Name}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.Phone}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.Mail}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.Gender}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.Country}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.MemberS}</TableCell>
                                    <TableCell sx={commonMutedTextSx}>{row.Dates}</TableCell>
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