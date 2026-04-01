import { useState, useEffect } from "react";
import { Box, Typography, Grid, Divider, Tabs, Tab, Button } from "@mui/material";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
} from "@mui/material";




// Apna event banner yahan path do (public folder: public/image/...)
const UPCOMING_EVENT_IMAGE = "/image/upcoming-event-banner.png";
const TOTAL_ATTENDEES = "12,545";
const ATTENDANCE_PROGRESS = 40; // %


const Data = [
    {
        Id: "1",
        Image: "/image/temimage.png",
        Name: "Shree Ram Temple",
        Country: "india",
        Donaye: "$232,545",
        Donsr: "4,850"
    },
    {
        Id: "2",
        Image: "/image/temimage.png",
        Name: "BAPS Shri Swaminarayan",
        Country: "india",
        Donaye: "$232,545",
        Donsr: "4,850"
    },
    {
        Id: "3",
        Image: "/image/temimage.png",
        Name: "ISKCON Temple",
        Country: "india",
        Donaye: "$232,545",
        Donsr: "4,850"
    },
    {
        Id: "4",
        Image: "/image/temimage.png",
        Name: "Shree Ram Temple",
        Country: "United Kingdom",
        Donaye: "$232,545",
        Donsr: "4,850"
    },
    {
        Id: "5",
        Image: "/image/temimage.png",
        Name: "Shree Ram Temple",
        Country: "india",
        Donaye: "$232,545",
        Donsr: "4,850"
    },
]




const ThirdSection = () => {
    return (
        <>

            <Box>
                <Grid container spacing={2} alignItems="stretch">
                    <Grid size={{ xs: 12, md: 7 }} sx={{ display: "flex" }}>

                        <Box sx={{
                            borderRadius: "20px",
                            backgroundColor: "white",
                            height: "100%",
                            width: "100%",
                        }}>

                            <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', padding: "15px" }}>
                                <Typography
                                    style={{
                                        fontFamily: 'Inter',
                                        fontWeight: 500,
                                        fontSize: '22px',
                                        lineHeight: '31px',
                                        color: '#2F2F2F',
                                    }}
                                >
                                    Top 5 Temples by Donation
                                </Typography>
                                <Box sx={{ display: 'flex', gap: "10px" }}>
                                    <Typography
                                        style={{
                                            fontFamily: 'Inter',
                                            fontWeight: 400,
                                            fontSize: '16px',
                                            lineHeight: '31px',
                                            color: '#F36100',
                                        }}
                                    >
                                        View All
                                    </Typography>
                                </Box>
                            </Box >


                            <Box>
                                <Box style={{ overflowX: "auto" }}>
                                    <Table sx={{ minWidth: "30rem" }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Temple Name</TableCell>
                                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Country</TableCell>
                                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Total Donation</TableCell>
                                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Total Donors</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Data.map((row) => (
                                                <TableRow key={row.Id}>
                                                    <TableCell>
                                                        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                            <img
                                                                src={row.Image}
                                                                alt={row.Name}
                                                                style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover" }}
                                                            />
                                                            <Typography sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "14px", color: "#2F2F2F" }}>
                                                                {row.Name}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell sx={{ fontFamily: "Inter", fontSize: "14px", color: "#2F2F2F", textTransform: "capitalize" }}>
                                                        {row.Country}
                                                    </TableCell>
                                                    <TableCell sx={{ fontFamily: "Inter", fontSize: "14px", color: "#2F2F2F", fontWeight: 500 }}>
                                                        {row.Donaye}
                                                    </TableCell>
                                                    <TableCell sx={{ fontFamily: "Inter", fontSize: "14px", color: "#2F2F2F" }}>
                                                        {row.Donsr}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Box>
                        </Box>

                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }} sx={{ display: "flex" }}>
                        <Box
                            sx={{
                               
                                borderRadius: "20px",
                                backgroundColor: "white",
                                p: "20px",
                                height: "100%",
                                width: "100%",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Inter",
                                    fontWeight: 700,
                                    fontSize: "22px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F",
                                    mb: "16px",
                                }}
                            >
                                Upcoming Event
                            </Typography>

                            <Box
                                sx={{
                                   
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    lineHeight: 0,
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/image/Deventimage.png"
                                    alt="Upcoming event"
                                    sx={{
                                        width: "100%",
                                        display: "block",
                                        aspectRatio: "16 / 9",
                                        objectFit: "cover",
                                        verticalAlign: "top",
                                    }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mt: "16px",
                                    mb: "14px",
                                }}
                            >
                                <Typography
                                    sx={{
                                    fontFamily: "Inter",
                                        fontWeight: 500,
                                        fontSize: "16px",
                                        color: "#2F2F2F",
                                    }}
                                >
                                    Total Attendees:
                                </Typography>
                                <Typography
                                    sx={{
                                    fontFamily: "Inter",
                                        fontWeight: 700,
                                        fontSize: "16px",
                                        color: "#2F2F2F",
                                    }}
                                >
                                    {TOTAL_ATTENDEES}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    height: "12px",
                                    borderRadius: "999px",
                                    backgroundColor: "#FFE5D9",
                                    overflow: "hidden",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: `${ATTENDANCE_PROGRESS}%`,
                                        height: "100%",
                                        borderRadius: "999px",
                                        backgroundColor: "#FF6600",
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>

                </Grid>
            </Box>


        </>
    )
}

export default ThirdSection;