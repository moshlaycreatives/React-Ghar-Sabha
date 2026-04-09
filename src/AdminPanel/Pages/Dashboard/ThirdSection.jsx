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
import {
    commonMutedTextSx,
    tableHeaderSx,
    templeNameSx,
} from "../../CommonStyles.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../../utils/apiErrorMessage.js";
import { TableEmptyRow, TableLoadingRow, ListEmptyPlaceholder } from "../../../components/ListEmptyPlaceholder.jsx";




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
    const navigate = useNavigate();
    const [DashboardStats, setDashboardStats] = useState(null);

    const GetAllDashboardStats = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.AllDashboardStats}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setDashboardStats(response?.data?.data || []);
        } catch (error) {
            setDashboardStats({ topTemples: [], eventBanner: null });
            // toast.error(getApiErrorMessage(error, "Could not load dashboard section"));
        }

    }

    useEffect(() => {
        GetAllDashboardStats();
    }, []);


    const handlenavigate = () => {
        navigate(`/dashboard/temple-donations`)
    }


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
                                            cursor: "pointer"
                                        }}
                                        onClick={() => handlenavigate()}
                                    >
                                        View All
                                    </Typography>
                                </Box>
                            </Box >


                            <Box>
                                <Box style={{ overflowX: "auto" }}>
                                    <Table sx={{
                                        minWidth: "30rem", "& .MuiTableBody-root .MuiTableCell-root": {
                                            padding: "8px 16px",
                                        }
                                    }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={tableHeaderSx}>Temple Name</TableCell>
                                                <TableCell sx={tableHeaderSx}>Country</TableCell>
                                                <TableCell sx={tableHeaderSx}>Total Donation</TableCell>
                                                <TableCell sx={tableHeaderSx}>Total Donors</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {DashboardStats === null ? (
                                                <TableLoadingRow colSpan={4} />
                                            ) : !(DashboardStats?.topTemples?.length) ? (
                                                <TableEmptyRow
                                                    colSpan={4}
                                                    title="No temple donation data available"
                                                    description="Top temples by donation will show here once data exists."
                                                />
                                            ) : (
                                            DashboardStats.topTemples.slice(0, 6).map((row) => (
                                                <TableRow key={row.Id}>
                                                    <TableCell>
                                                        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                            <img
                                                                src={row.image}
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
                                                        ${row.totalDonation}
                                                    </TableCell>
                                                    <TableCell sx={commonMutedTextSx}>
                                                        {row.totalDonors}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                            )}
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
                                {DashboardStats === null ? (
                                    <Box sx={{ aspectRatio: "16 / 9", bgcolor: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Typography sx={{ fontFamily: "Inter", fontSize: 14, color: "#666" }}>Loading…</Typography>
                                    </Box>
                                ) : DashboardStats?.eventBanner?.imageUrl ? (
                                <Box
                                    component="img"
                                    src={DashboardStats.eventBanner.imageUrl}
                                    alt="Upcoming event"
                                    sx={{
                                        width: "100%",
                                        display: "block",
                                        aspectRatio: "16 / 9",
                                        objectFit: "cover",
                                        verticalAlign: "top",
                                    }}
                                />
                                ) : (
                                    <Box sx={{ aspectRatio: "16 / 9", bgcolor: "#FAFAFA" }}>
                                        <ListEmptyPlaceholder
                                            title="No upcoming event banner"
                                            description="No banner image is available from the API right now."
                                            minHeight={140}
                                            compact
                                        />
                                    </Box>
                                )}
                            </Box>

                            {DashboardStats?.eventBanner?.isPollEnabled && (
                                <>
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
                                            {DashboardStats?.eventBanner?.totalPollCount || 0}
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
                                                width: `${DashboardStats?.eventBanner?.percentage}%`,
                                                height: "100%",
                                                borderRadius: "999px",
                                                backgroundColor: "#FF6600",
                                            }}
                                        />
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Grid>

                </Grid>
            </Box>


        </>
    )
}

export default ThirdSection;