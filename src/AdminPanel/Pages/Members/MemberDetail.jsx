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
        boxShadow: "0px 4px 30px 0px #0000001A",
        borderRadius: "15px",
        backgroundColor: "white",
        minHeight: { xs: "auto", sm: "165px" },
        height: "100%",
        p: { xs: 2, sm: "10px 14px" },
    };

    const detailsCardSx = {
        boxShadow: "0px 4px 30px 0px #0000001A",
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
                                <Typography style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px", lineHeight: "31px", color: "#2F2F2F" }}>Phone:</Typography>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "18px", lineHeight: "31px", color: "#848286", wordBreak: "break-word" }}>+91 99743 60038</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px", lineHeight: "31px", color: "#2F2F2F" }}>WhatsApp No.:</Typography>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "18px", lineHeight: "31px", color: "#848286", wordBreak: "break-word" }}>+91 99743 60038</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px", lineHeight: "31px", color: "#2F2F2F" }}>Email:</Typography>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "18px", lineHeight: "31px", color: "#848286", wordBreak: "break-word" }}>rohan@vadtaldham.com</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px", lineHeight: "31px", color: "#2F2F2F" }}>Gender:</Typography>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "18px", lineHeight: "31px", color: "#848286" }}>Male</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px", lineHeight: "31px", color: "#2F2F2F" }}>Birthday:</Typography>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "18px", lineHeight: "31px", color: "#848286" }}>21/10/1992</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px", lineHeight: "31px", color: "#2F2F2F" }}>Country:</Typography>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "18px", lineHeight: "31px", color: "#848286" }}>India</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px", lineHeight: "31px", color: "#2F2F2F" }}>State:</Typography>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "18px", color: "#848286" }}>Gujarat</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px", lineHeight: "31px", color: "#2F2F2F" }}>City:</Typography>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "18px", color: "#848286" }}>Ahmedabad</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px", lineHeight: "31px", color: "#2F2F2F" }}>District:</Typography>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "18px", color: "#848286" }}>Ahmedabad</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px", lineHeight: "31px", color: "#2F2F2F" }}>Tehsil:</Typography>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "18px", color: "#848286" }}>Daskroi</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px", lineHeight: "31px", color: "#2F2F2F" }}>ZIP Code:</Typography>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "18px", color: "#848286" }}>380015</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px", lineHeight: "31px", color: "#2F2F2F" }}>Address:</Typography>
                                <Typography style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "18px", color: "#848286", wordBreak: "break-word" }}>
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
                            <Table sx={{ border: "1px solid #EFEFEF", }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Donation Type</TableCell>
                                        <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Qty</TableCell>
                                        <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Amount</TableCell>
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

            </Grid >

        </>
    )
}

export default MemberDetail;