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




const Country = [
    {
        Id: "1",
        Image: "/image/C1.png",
        Country: "India",
        User: "204,532",
        Amount: "$232,545"
    },
    {
        Id: "2",
        Image: "/image/C2.png",
        Country: "India",
        User: "204,532",
        Amount: "$232,545"
    },
    {
        Id: "3",
        Image: "/image/C3.png",
        Country: "India",
        User: "204,532",
        Amount: "$232,545"
    },
    {
        Id: "4",
        Image: "/image/C4.png",
        Country: "India",
        User: "204,532",
        Amount: "$232,545"
    },
    {
        Id: "5",
        Image: "/image/C5.png",
        Country: "India",
        User: "204,532",
        Amount: "$232,545"
    },
]


const Supporters = [
    {
        Id: "1",
        Image: "/image/s1.png",
        Name: "Vikram Mehta",
        Country: "India",
        Amount: "$232,545"
    },
    {
        Id: "2",
        Image: "/image/S2.png",
        Name: "Vikram Mehta",
        Country: "India",
        Amount: "$232,545"
    },
    {
        Id: "3",
        Image: "/image/S3.png",
        Name: "Vikram Mehta",
        Country: "India",
        Amount: "$232,545"
    },
    {
        Id: "4",
        Image: "/image/S4.png",
        Name: "Vikram Mehta",
        Country: "India",
        Amount: "$232,545"
    },
    {
        Id: "5",
        Image: "/image/S5.png",
        Name: "Vikram Mehta",
        Country: "India",
        Amount: "$232,545"
    },
]


const Donation = [
    {
        Id: "1",
        Image: "/image/D1.png",
        Name: "Chairs",
        Total: "1000",
        Still: "750"
    },
    {
        Id: "2",
        Image: "/image/D2.png",
        Name: "Fans",
        Total: "1000",
        Still: "750"
    },
    {
        Id: "3",
        Image: "/image/D3.png",
        Name: "Lights",
        Total: "1000",
        Still: "750"
    },
    {
        Id: "4",
        Image: "/image/D4.png",
        Name: "Water Cooler",
        Total: "1000",
        Still: "750"
    },
    {
        Id: "5",
        Image: "/image/D5.png",
        Name: "Cleaning",
        Total: "1000",
        Still: "750"
    },
]


const cardShellSx = {
    boxShadow: "0px 4px 30px 0px #0000001A",
    borderRadius: "20px",
    backgroundColor: "white",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "100%",
};

const tableSx = { border: "1px solid #EFEFEF", width: "100%" };


const SecondSection = () => {
    return (
        <>

            <Box>
                <Grid container spacing={2} alignItems="stretch">
                    <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex" }}>

                        <Box sx={cardShellSx}>

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
                                    Country Stats
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
                            <Box sx={{ pb: "15px", width: "100%" }}>
                                <Table sx={tableSx}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Country</TableCell>
                                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>User</TableCell>
                                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Amount</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Country.map((row) => (
                                                <TableRow key={row.Id}>
                                                    <TableCell>
                                                        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                            <img
                                                                src={row.Image}
                                                                alt={row.Country}
                                                                style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover" }}
                                                            />
                                                            <Typography sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "14px", color: "#2F2F2F" }}>
                                                                {row.Country}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell sx={{ fontFamily: "Inter", fontSize: "14px", color: "#2F2F2F", textTransform: "capitalize" }}>
                                                        {row.User}
                                                    </TableCell>
                                                    <TableCell sx={{ fontFamily: "Inter", fontSize: "14px", color: "#2F2F2F", fontWeight: 500 }}>
                                                        {row.Amount}
                                                    </TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                            </Box>
                        </Box>

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex" }}>

                        <Box sx={cardShellSx}>

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
                                    Our Top Supporters
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


                            <Box sx={{ pb: "15px", width: "100%" }}>
                                <Table sx={tableSx}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Name</TableCell>
                                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Country</TableCell>
                                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Amount</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Supporters.map((row) => (
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
                                                        {row.Amount}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                            </Box>
                        </Box>

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex" }}>

                        <Box sx={cardShellSx}>

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
                                    Active Donation Needs
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


                            <Box sx={{ pb: "15px", width: "100%" }}>
                                <Table sx={tableSx}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Donation Type</TableCell>
                                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Total Needed</TableCell>
                                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Still Needed</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Donation.map((row) => (
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
                                                        {row.Total}
                                                    </TableCell>
                                                    <TableCell sx={{ fontFamily: "Inter", fontSize: "14px", color: "#2F2F2F", fontWeight: 500 }}>
                                                        {row.Still}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                            </Box>
                        </Box>

                    </Grid>

                </Grid>
            </Box>


        </>
    )
}

export default SecondSection;
