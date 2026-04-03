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

import { useLocation } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import toast from "react-hot-toast";
import { commonDetailTitleSx, commonMutedTextSx, tableHeaderSx } from "../../CommonStyles";




const Donation = [
    {
        Id: "1",
        Image: "/image/D1.png",
        Name: "Chairs",
        Total: "4",
        Still: "$750"
    },
    {
        Id: "2",
        Image: "/image/D2.png",
        Name: "Shree Ram Temple",
        Total: "---",
        Still: "$750"
    },
    {
        Id: "3",
        Image: "/image/D3.png",
        Name: "Fans",
        Total: "1000",
        Still: "$750"
    },
    {
        Id: "4",
        Image: "/image/D4.png",
        Name: "Shree Ram Temple",
        Total: "---",
        Still: "$750"
    },
    {
        Id: "5",
        Image: "/image/D5.png",
        Name: "Cleaning",
        Total: "1000",
        Still: "$750"
    },
]



const MemberDetail = () => {
    const location = useLocation();
    const { id } = location.state || ""
    const [memberDetail, setmemberDetail] = useState(null);

    const topCardSx = {

        borderRadius: "15px",
        backgroundColor: "white",
        minHeight: { xs: "auto", sm: "165px" },
        height: "100%",
        p: { xs: 2, sm: "10px 14px" },
    };

    const detailsCardSx = {

        borderRadius: "15px",
        backgroundColor: "white",
        marginTop: "20px",
        minHeight: "550px",
        height: "100%",
    };


    const GetAllmenber = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.GetAdminAllUser}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setmemberDetail(response?.data?.data?.users || []);
        } catch (error) {
            setmemberDetail([]);
            toast.error(error.response?.data?.message);
        }
    };


    useEffect(() => {
        GetAllmenber();
    }, []);

    return (
        <>
            <Box>
                <Typography
                    sx={{
                        fontFamily: "Inter",
                        fontWeight: 600,
                        fontSize: { xs: "23px", md: "36px" },
                        color: "#2F2F2F",
                    }}>
                    Dashboard/Members<span style={{ color: "#F36100" }}>/Member Details</span>
                </Typography>
            </Box>


            <Grid container spacing={2} mt={3}>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                    <Box sx={topCardSx}>
                        <Box
                            display="flex"
                            gap={1.5}
                            sx={{
                                flexDirection: { xs: "column", sm: "row" },
                                alignItems: { xs: "center", sm: "flex-start" },
                            }}
                        >
                            <img
                                src="/image/ProfileImage.png"
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    borderRadius: "50%",
                                    objectFit: "cover"
                                }}
                                alt="Profile"
                            />
                            <Box>
                                <Typography style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "26px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F",
                                    marginTop: "15px"
                                }}>
                                    Rohan Mehta
                                </Typography>
                                <Typography style={{
                                    borderRadius: "10px",
                                    width: "125px",
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    lineHeight: "31px",
                                    color: "#F36100",
                                    backgroundColor: "#FBECDF",
                                    textAlign: "center",
                                    margin: "10px 0px 0px 0px"

                                }}>
                                    ID: 854821
                                </Typography>
                                <Typography style={{
                                    borderRadius: "10px",
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F",
                                    margin: "8px 0px 0px 0px"

                                }}>
                                    Member Since: 2025
                                </Typography>
                            </Box>
                        </Box>

                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2.6, lg: 2.6 }}>
                    <Box sx={topCardSx}>
                        <Box >
                            <Box sx={{ display: 'flex', gap: "10px" }}>
                                <img src="/image/Dicon.png" />
                            </Box>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "22px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F",
                                    marginTop: "10px"
                                }}>

                                Temple Donation
                            </Typography>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "30px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F",
                                    marginTop: "10px"
                                }}>

                                $45,600
                            </Typography>
                        </Box >
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2.6, lg: 2.6 }}>
                    <Box sx={topCardSx}>
                        <Box >
                            <Box sx={{ display: 'flex', gap: "10px" }}>
                                <img src="/image/TDIcon.png" />
                            </Box>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "22px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F",
                                    marginTop: "10px"
                                }}>

                                Other Donations
                            </Typography>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "30px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F",
                                    marginTop: "10px"
                                }}>

                                $65,400
                            </Typography>
                        </Box >

                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2.6, lg: 2.6 }}>
                    <Box sx={topCardSx}>
                        <Box >
                            <Box sx={{ display: 'flex', gap: "10px" }}>
                                <img src="/image/Dicon.png" />
                            </Box>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "22px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F",
                                    marginTop: "10px"
                                }}>

                                Total Donation
                            </Typography>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "30px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F",
                                    marginTop: "10px"
                                }}>

                                $110,000
                            </Typography>
                        </Box >

                    </Box>
                </Grid>
            </Grid>


            <Grid container spacing={2} mb={1}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={detailsCardSx}>

                        <Box sx={{ padding: "20px", display: "flex", flexDirection: "column", gap: 1 }}>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>Phone:</Typography>
                                <Typography sx={{ ...commonMutedTextSx, lineHeight: "31px", wordBreak: "break-word" }}>+91 99743 60038</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>WhatsApp No.:</Typography>
                                <Typography sx={{ ...commonMutedTextSx, lineHeight: "31px", wordBreak: "break-word" }}>+91 99743 60038</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>Email:</Typography>
                                <Typography sx={{ ...commonMutedTextSx, lineHeight: "31px", wordBreak: "break-word" }}>rohan@vadtaldham.com</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>Gender:</Typography>
                                <Typography sx={{ ...commonMutedTextSx, lineHeight: "31px" }}>Male</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>Birthday:</Typography>
                                <Typography sx={{ ...commonMutedTextSx, lineHeight: "31px" }}>21/10/1992</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>Country:</Typography>
                                <Typography sx={{ ...commonMutedTextSx, lineHeight: "31px" }}>India</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>State:</Typography>
                                <Typography sx={commonMutedTextSx}>Gujarat</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>City:</Typography>
                                <Typography sx={commonMutedTextSx}>Ahmedabad</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>District:</Typography>
                                <Typography sx={commonMutedTextSx}>Ahmedabad</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>Tehsil:</Typography>
                                <Typography sx={commonMutedTextSx}>Daskroi</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>ZIP Code:</Typography>
                                <Typography sx={commonMutedTextSx}>380015</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>Address:</Typography>
                                <Typography sx={{ ...commonMutedTextSx, wordBreak: "break-word" }}>
                                    House No. 24, Sector 15, Near City Hospital
                                </Typography>
                            </Box>
                        </Box>



                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={detailsCardSx}>Second box</Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={detailsCardSx}>

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
                                Donation History
                            </Typography>
                        </Box >

                        <Box style={{ overflowX: "auto" }}>
                            <Table sx={{}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={tableHeaderSx}>Donation Type</TableCell>
                                        <TableCell sx={tableHeaderSx}>Qty</TableCell>
                                        <TableCell sx={tableHeaderSx}>Amount</TableCell>
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
                                            <TableCell sx={commonMutedTextSx}>
                                                {row.Total}
                                            </TableCell>
                                            <TableCell sx={commonMutedTextSx}>
                                                {row.Still}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                        </Box>


                    </Box>
                </Grid>

            </Grid >

        </>
    )
}

export default MemberDetail;