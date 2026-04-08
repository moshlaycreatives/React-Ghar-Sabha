import { useState, useEffect } from "react";
import { Box, Typography, Grid, Divider, Tabs, Tab, Button, Menu, MenuItem } from "@mui/material";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
    commonMutedTextSx,
    tableHeaderSx,
    templeNameSx,
} from "../../CommonStyles.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import toast from "react-hot-toast";



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




const cardShellSx = {
    borderRadius: "20px",
    backgroundColor: "white",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "100%",
};

const tableSx = {
    width: "100%",
    "& .MuiTableBody-root .MuiTableCell-root": {
        padding: "8px 16px",
        whiteSpace: "nowrap",
    },
    "& .MuiTableHead-root .MuiTableCell-root": {
        whiteSpace: "nowrap",
    }
};


const SecondSection = () => {
    const navigate = useNavigate();

    const decodeEmoji = (emojiU) => {
        if (!emojiU) return "";
        return emojiU
            .split(" ")
            .map((u) => String.fromCodePoint(parseInt(u.replace("U+", ""), 16)))
            .join("");
    };

    const [DashboardStats, setDashboardStats] = useState(null);
    const [countryStats, setCountryStats] = useState([]);
    const [topSupporters, setTopSupporters] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("Month");
    const open = Boolean(anchorEl);

    const [anchorElSupporters, setAnchorElSupporters] = useState(null);
    const [selectedFilterSupporters, setSelectedFilterSupporters] = useState("Month");
    const openSupporters = Boolean(anchorElSupporters);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (filter) => {
        if (filter) {
            setSelectedFilter(filter);
            GetAllCountryStats(filter);
        }
        setAnchorEl(null);
    };

    const handleClickSupporters = (event) => {
        setAnchorElSupporters(event.currentTarget);
    };

    const handleCloseSupporters = (filter) => {
        if (filter) {
            setSelectedFilterSupporters(filter);
            GetTopSupportStats(filter);
        }
        setAnchorElSupporters(null);
    };

    const GetTopSupportStats = async (filter = "month") => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.TopSupportStatsDashboard}?filter=${filter.toLowerCase()}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setTopSupporters(response?.data?.data?.topSupporters || []);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    const GetAllDashboardStats = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.AllDashboardStats}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setDashboardStats(response?.data?.data || []);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }

    }

    useEffect(() => {
        GetAllDashboardStats();
    }, []);



    const GetAllCountryStats = async (filter = "month") => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.CountryStatsDashboard}?filter=${filter.toLowerCase()}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setCountryStats(response?.data?.data?.countryStats || []);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }

    }

    useEffect(() => {
        GetAllCountryStats("month");
        GetTopSupportStats("month");
    }, []);





    const handleNavigate = () => {
        navigate(`/dashboard/donations`)
    }

    return (
        <>

            <Box>
                <Grid container spacing={2} alignItems="stretch">
                    <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex" }}>

                        <Box sx={cardShellSx}>

                            <Box sx={{ padding: "15px" }}>
                                <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                                    <Grid item xs={12} sm="auto">
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
                                    </Grid>
                                    <Grid item xs={12} sm="auto" sx={{ display: 'flex', justifyContent: { xs: 'flex-end', md: 'flex-end' }, width: { xs: '100%', md: 'auto' }, flexGrow: 1 }}>
                                        <Box sx={{ display: 'flex', gap: "10px" }}>
                                            <Box
                                                onClick={handleClick}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    cursor: 'pointer',
                                                    bgcolor: '#F3F3F3',
                                                    borderRadius: '100px',
                                                    px: '12px',
                                                    py: '4px',
                                                    '&:hover': {
                                                        bgcolor: '#E8E8E8'
                                                    }
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontFamily: 'Inter',
                                                        fontWeight: 400,
                                                        fontSize: '14px',
                                                        color: '#2F2F2F',
                                                    }}
                                                >
                                                    {selectedFilter}
                                                </Typography>
                                                <KeyboardArrowDownIcon sx={{ fontSize: '18px', color: '#666' }} />
                                            </Box>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={() => handleClose()}
                                                PaperProps={{
                                                    sx: {
                                                        borderRadius: '12px',
                                                        mt: 1,
                                                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                                                        '& .MuiMenuItem-root': {
                                                            fontFamily: 'Inter',
                                                            fontSize: '14px',
                                                            px: 2,
                                                            py: 1,
                                                        }
                                                    }
                                                }}
                                            >
                                                <MenuItem onClick={() => handleClose("This Week")}>This Week</MenuItem>
                                                <MenuItem onClick={() => handleClose("Month")}>Month</MenuItem>
                                                <MenuItem onClick={() => handleClose("Year")}>Year</MenuItem>
                                            </Menu>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box >
                            <Box sx={{ pb: "15px", width: "100%", overflowX: "auto" }}>
                                <Table sx={tableSx}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={tableHeaderSx}>Country</TableCell>
                                            <TableCell sx={tableHeaderSx}>User</TableCell>
                                            <TableCell sx={tableHeaderSx}>Amount</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {countryStats.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                        <Typography sx={{ fontSize: "24px" }}>
                                                            {decodeEmoji(row.emojiU)}
                                                        </Typography>
                                                        <Typography sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "14px", color: "#2F2F2F" }}>
                                                            {row.country}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={commonMutedTextSx}>
                                                    {row.userCount}
                                                </TableCell>
                                                <TableCell sx={commonMutedTextSx}>
                                                    ${row.amount?.toLocaleString()}
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

                            <Box sx={{ padding: "15px" }}>
                                <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                                    <Grid item xs={12} sm="auto">
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
                                    </Grid>
                                    <Grid item xs={12} sm="auto" sx={{ display: 'flex', justifyContent: { xs: 'flex-end', md: 'flex-end' }, width: { xs: '100%', md: 'auto' }, flexGrow: 1 }}>
                                        <Box sx={{ display: 'flex', gap: "10px" }}>
                                            <Box
                                                onClick={handleClickSupporters}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    cursor: 'pointer',
                                                    bgcolor: '#F3F3F3',
                                                    borderRadius: '100px',
                                                    px: '12px',
                                                    py: '4px',
                                                    '&:hover': {
                                                        bgcolor: '#E8E8E8'
                                                    }
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontFamily: 'Inter',
                                                        fontWeight: 400,
                                                        fontSize: '14px',
                                                        color: '#2F2F2F',
                                                    }}
                                                >
                                                    {selectedFilterSupporters}
                                                </Typography>
                                                <KeyboardArrowDownIcon sx={{ fontSize: '18px', color: '#666' }} />
                                            </Box>
                                            <Menu
                                                anchorEl={anchorElSupporters}
                                                open={openSupporters}
                                                onClose={() => handleCloseSupporters()}
                                                PaperProps={{
                                                    sx: {
                                                        borderRadius: '12px',
                                                        mt: 1,
                                                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                                                        '& .MuiMenuItem-root': {
                                                            fontFamily: 'Inter',
                                                            fontSize: '14px',
                                                            px: 2,
                                                            py: 1,
                                                        }
                                                    }
                                                }}
                                            >
                                                <MenuItem onClick={() => handleCloseSupporters("This Week")}>This Week</MenuItem>
                                                <MenuItem onClick={() => handleCloseSupporters("Month")}>Month</MenuItem>
                                                <MenuItem onClick={() => handleCloseSupporters("Year")}>Year</MenuItem>
                                            </Menu>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box >


                            <Box sx={{ pb: "15px", width: "100%", overflowX: "auto" }}>
                                <Table sx={tableSx}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={tableHeaderSx}>Name</TableCell>
                                            <TableCell sx={tableHeaderSx}>Country</TableCell>
                                            <TableCell sx={tableHeaderSx}>Amount</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {topSupporters.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                        <img
                                                            src={row.profilePicture || "/image/s1.png"}
                                                            alt={row.name}
                                                            style={{ width: "36px", height: "36px", borderRadius: "20px", objectFit: "cover" }}
                                                        />
                                                        <Typography sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "14px", color: "#2F2F2F" }}>
                                                            {row.name}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={commonMutedTextSx}>
                                                    {row.country}
                                                </TableCell>
                                                <TableCell sx={commonMutedTextSx}>
                                                    ${row.amount?.toLocaleString()}
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

                            <Box sx={{ padding: "15px" }}>
                                <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                                    <Grid item xs={12} sm="auto">
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
                                    </Grid>
                                    <Grid item xs={12} sm="auto" sx={{ display: 'flex', justifyContent: { xs: 'flex-end', md: 'flex-end' }, width: { xs: '100%', md: 'auto' }, flexGrow: 1 }}>
                                        <Box sx={{ display: 'flex', gap: "10px" }}>
                                            <Typography
                                                style={{
                                                    fontFamily: 'Inter',
                                                    fontWeight: 400,
                                                    fontSize: '16px',
                                                    lineHeight: '31px',
                                                    color: '#F36100',
                                                    cursor: "pointer"
                                                }}
                                                onClick={() => handleNavigate()}
                                            >
                                                View All
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box >


                            <Box sx={{ pb: "15px", width: "100%", overflowX: "auto" }}>
                                <Table sx={tableSx}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={tableHeaderSx}>Donation Type</TableCell>
                                            <TableCell sx={tableHeaderSx}>Total Needed</TableCell>
                                            <TableCell sx={tableHeaderSx}>Still Needed</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {DashboardStats?.activeDonationNeeds?.map((row) => (
                                            <TableRow key={row.Id}>
                                                <TableCell>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                        <img
                                                            src={row.image}
                                                            alt={row.title}
                                                            style={{ width: "36px", height: "36px", borderRadius: "20px", objectFit: "cover" }}
                                                        />
                                                        <Typography sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "14px", color: "#2F2F2F" }}>
                                                            {row.title}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={commonMutedTextSx}>
                                                    {row.unit === "$" ? `${row.unit}${row.totalNeeded}` : row.totalNeeded}
                                                </TableCell>
                                                <TableCell sx={commonMutedTextSx}>
                                                    {row.unit === "$" ? `${row.unit}${row.stillNeeded}` : row.stillNeeded}
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
