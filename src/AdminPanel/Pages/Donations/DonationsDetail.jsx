import { Box, Grid, Typography, Card, CardContent, } from "@mui/material";
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
        Qty: "15",
        Amount: "$ 30,000",
        Country: "India",
        State: "Gujarat",
        Dates: "12/03/2025 - 12:35PM"
    },
    {
        Id: "1",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        Qty: "15",
        Amount: "$ 30,000",
        Country: "India",
        State: "Gujarat",
        Dates: "12/03/2025 - 12:35PM"
    },
    {
        Id: "1",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        Qty: "15",
        Amount: "$ 30,000",
        Country: "India",
        State: "Gujarat",
        Dates: "12/03/2025 - 12:35PM"
    },
    {
        Id: "1",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        Qty: "15",
        Amount: "$ 30,000",
        Country: "India",
        State: "Gujarat",
        Dates: "12/03/2025 - 12:35PM"
    },
    {
        Id: "1",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        Qty: "15",
        Amount: "$ 30,000",
        Country: "India",
        State: "Gujarat",
        Dates: "12/03/2025 - 12:35PM"
    },
    {
        Id: "1",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        Qty: "15",
        Amount: "$ 30,000",
        Country: "India",
        State: "Gujarat",
        Dates: "12/03/2025 - 12:35PM"
    },
    {
        Id: "1",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        Qty: "15",
        Amount: "$ 30,000",
        Country: "India",
        State: "Gujarat",
        Dates: "12/03/2025 - 12:35PM"
    },
    {
        Id: "1",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        Qty: "15",
        Amount: "$ 30,000",
        Country: "India",
        State: "Gujarat",
        Dates: "12/03/2025 - 12:35PM"
    },

]


const DonationsDetail = () => {
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
                    Dashboard/Other Donations<span style={{ color: "#F36100" }}>/Donation Details</span>
                </Typography>
            </Box>


            <Grid container spacing={2} mt={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{
                        boxShadow: "0px 4px 30px 0px #0000001A",
                        borderRadius: "15px",
                        backgroundColor: "white",
                        padding: "10px 15px 10px 15px",
                        height: "140px"
                    }}>
                        <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', }}>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "25px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F"
                                }}>

                                Total Needed
                            </Typography>
                            <Box sx={{ display: 'flex', gap: "10px" }}>
                                <img src="/image/Dicon.png" />
                            </Box>
                        </Box >
                        <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', }} mt={3}>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "30px",
                                    lineHeight: "31px",
                                    color: "#222222"
                                }}>

                                $247,453
                            </Typography>
                        </Box >
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{
                        boxShadow: "0px 4px 30px 0px #0000001A",
                        borderRadius: "15px",
                        backgroundColor: "white",
                        padding: "10px 15px 10px 15px",
                        height: "140px"
                    }}>
                        <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', }}>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "23.5px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F"
                                }}>

                                Received
                            </Typography>
                            <Box sx={{ display: 'flex', gap: "10px" }}>
                                <img src="/image/TDIcon.png" />
                            </Box>
                        </Box >
                        <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', }} mt={3}>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
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
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{
                        boxShadow: "0px 4px 30px 0px #0000001A",
                        borderRadius: "15px",
                        backgroundColor: "white",
                        padding: "10px 15px 10px 15px",
                        height: "140px"
                    }}>
                        <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', }}>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "25px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F"
                                }}>

                                Still Needed
                            </Typography>
                            <Box sx={{ display: 'flex', gap: "10px" }}>
                                <img src="/image/Dicon.png" />
                            </Box>
                        </Box >
                        <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', }} mt={3}>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "30px",
                                    lineHeight: "31px",
                                    color: "#222222"
                                }}>

                                $200,000
                            </Typography>
                        </Box >
                    </Box>
                </Grid>

            </Grid>


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
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Member ID</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Name</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Phone</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Qty</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Amount</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Country</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>State</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Date & Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {memberData?.map((row) => (
                                <TableRow key={row.Id}>
                                    <TableCell>{row.MId}</TableCell>
                                    <TableCell>{row.Name}</TableCell>
                                    <TableCell>{row.Phone}</TableCell>
                                    <TableCell>{row.Qty}</TableCell>
                                    <TableCell>{row.Amount}</TableCell>
                                    <TableCell>{row.Country}</TableCell>
                                    <TableCell>{row.State}</TableCell>
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

export default DonationsDetail;