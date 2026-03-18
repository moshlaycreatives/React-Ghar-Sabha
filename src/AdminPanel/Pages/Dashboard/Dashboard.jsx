import { Box, Grid, Typography, Card, CardContent, } from "@mui/material";
import ThirdSection from "./ThirdSection";
import SecondSection from "./SecondSection";
import DonationAnalyticsChart from "./DonationAnalyticsChart";




const Dashboard = () => {
    return (
        <>
            <Box>
                <Typography
                    style={{
                        fontFamily: "Outfit",
                        fontWeight: 600,
                        fontSize: "36px",
                        lineHeight: "31px",
                        color: "#2F2F2F"
                    }}>

                    Dashboard
                </Typography>
            </Box>


            <Box mt={5}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Box sx={{
                            boxShadow: "0px 4px 30px 0px #0000001A",
                            borderRadius: "15px",
                            backgroundColor: "white",
                            padding: "10px 15px 10px 15px",
                            height:"130px"
                        }}>
                            <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', }}>
                                <Typography
                                    style={{
                                        fontFamily: "Outfit",
                                        fontWeight: 600,
                                        fontSize: "25px",
                                        lineHeight: "31px",
                                        color: "#2F2F2F"
                                    }}>

                                    Total Donation
                                </Typography>
                                <Box sx={{ display: 'flex', gap: "10px" }}>
                                    <img src="/image/Dicon.png" />
                                </Box>
                            </Box >
                            <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', }} mt={3}>
                                <Typography
                                    style={{
                                        fontFamily: "Outfit",
                                        fontWeight: 600,
                                        fontSize: "30px",
                                        lineHeight: "31px",
                                        color: "#222222"
                                    }}>

                                    $247,453
                                </Typography>
                            </Box >
                        </Box>
                        <Box sx={{
                            boxShadow: "0px 4px 30px 0px #0000001A",
                            borderRadius: "15px",
                            backgroundColor: "white",
                            padding: "10px 15px 10px 15px",
                            mt: "15px",
                            height:"130px"
                        }}>
                            <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', }}>
                                <Typography
                                    style={{
                                        fontFamily: "Outfit",
                                        fontWeight: 600,
                                        fontSize: "25px",
                                        lineHeight: "31px",
                                        color: "#2F2F2F"
                                    }}>

                                    Temple Donations
                                </Typography>
                                <Box sx={{ display: 'flex', gap: "10px" }}>
                                    <img src="/image/TDIcon.png" />
                                </Box>
                            </Box >
                            <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', }} mt={3}>
                                <Typography
                                    style={{
                                        fontFamily: "Outfit",
                                        fontWeight: 600,
                                        fontSize: "30px",
                                        lineHeight: "31px",
                                        color: "#222222"
                                    }}>

                                    $107,453
                                </Typography>
                            </Box >
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Box sx={{
                            boxShadow: "0px 4px 30px 0px #0000001A",
                            borderRadius: "15px",
                            backgroundColor: "white",
                            padding: "10px 15px 10px 15px",
                            height:"130px"
                        }}>
                            <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', }}>
                                <Typography
                                    style={{
                                        fontFamily: "Outfit",
                                        fontWeight: 600,
                                        fontSize: "25px",
                                        lineHeight: "31px",
                                        color: "#2F2F2F"
                                    }}>

                                    Total Members
                                </Typography>
                                <Box sx={{ display: 'flex', gap: "10px" }}>
                                    <img src="/image/Micon.png" />
                                </Box>
                            </Box >
                            <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', }} mt={3}>
                                <Typography
                                    style={{
                                        fontFamily: "Outfit",
                                        fontWeight: 600,
                                        fontSize: "30px",
                                        lineHeight: "31px",
                                        color: "#222222"
                                    }}>

                                    875,486
                                </Typography>
                            </Box >

                        </Box>

                        <Box sx={{
                            boxShadow: "0px 4px 30px 0px #0000001A",
                            borderRadius: "15px",
                            backgroundColor: "white",
                            padding: "10px 15px 10px 15px",
                            mt: "15px",
                            height:"130px"
                        }}>
                            <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', }}>
                                <Typography
                                    style={{
                                        fontFamily: "Outfit",
                                        fontWeight: 600,
                                        fontSize: "25px",
                                        lineHeight: "31px",
                                        color: "#2F2F2F"
                                    }}>

                                    Other Donations
                                </Typography>
                                <Box sx={{ display: 'flex', gap: "10px" }}>
                                    <img src="/image/Dicon.png" />
                                </Box>
                            </Box >
                            <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', }} mt={3}>
                                <Typography
                                    style={{
                                        fontFamily: "Outfit",
                                        fontWeight: 600,
                                        fontSize: "30px",
                                        lineHeight: "31px",
                                        color: "#222222"
                                    }}>

                                    $140,000
                                </Typography>
                            </Box >
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <DonationAnalyticsChart />
                    </Grid>

                </Grid>
            </Box>




        </>
    )
}

export default Dashboard;