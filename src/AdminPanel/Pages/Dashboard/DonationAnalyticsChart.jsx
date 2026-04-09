import { useState, useMemo, useEffect } from "react";
import { Box, Typography, Button, useTheme, CircularProgress } from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import toast from "react-hot-toast";

const FILTERS = [
    { key: "week", label: "This Week" },
    { key: "month", label: "Month" },
    { key: "year", label: "Year" },
];

function formatYAxis(value) {
    if (value >= 1_000_000) {
        return `$${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
    }
    return `$${value.toLocaleString("en-US")}`;
}

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <Box
            sx={{
                bgcolor: "white",
                border: "1px solid #E8E8E8",
                borderRadius: "20px",
                px: 1.5,
                py: 1,

            }}
        >
            <Typography sx={{ fontFamily: "Inter", fontSize: 12, color: "#666", mb: 0.5 }}>
                {label}
            </Typography>
            {payload.map((entry) => (
                <Typography
                    key={entry.dataKey}
                    sx={{
                        fontFamily: "Inter",
                        fontSize: 13,
                        fontWeight: 600,
                        color: entry.color,
                    }}
                >
                    {entry.name}: {formatYAxis(entry.value)}
                </Typography>
            ))}
        </Box>
    );
}

const DonationAnalyticsChart = () => {
    const theme = useTheme();
    const primaryBar = "#F36100";
    const secondaryBar = "#2F2F2F";

    const [range, setRange] = useState("month");
    const [analyticsData, setAnalyticsData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAnalytics = async (filter) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.AdminDashboardAnalytics}?filter=${filter}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.success) {
                const formattedData = response.data.data.analytics.map(item => ({
                    label: item.date, // You might want to format this date based on the filter
                    primary: Number(item.templeDonations) || 0,
                    secondary: Number(item.otherDonations) || 0
                }));
                setAnalyticsData(formattedData);
            }
        } catch (error) {
            console.error("Error fetching donation analytics:", error);
            toast.error(error.response?.data?.message || "Failed to fetch analytics");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics(range);
    }, [range]);

    const data = analyticsData;

    const { chartMaxY, chartTicks } = useMemo(() => {
        if (data.length === 0) return { chartMaxY: 1000, chartTicks: [0, 500, 1000] };

        const m = Math.max(...data.flatMap((d) => [d.primary, d.secondary]), 1);
        
        // Dynamic scaling based on max value
        let step;
        if (m > 1_000_000) step = 1_000_000;
        else if (m > 100_000) step = 100_000;
        else if (m > 10_000) step = 10_000;
        else if (m > 1_000) step = 1_000;
        else if (m > 100) step = 100;
        else step = 10;

        const maxY = Math.ceil(m / step) * step || step;
        
        return {
            chartMaxY: maxY,
            chartTicks: [0, maxY / 2, maxY],
        };
    }, [data]);

    console.log("Analytics Data for Chart:", data);
    console.log("Chart Max Y:", chartMaxY);

    return (
        <Box
            sx={{
               
                borderRadius: "24px",
                backgroundColor: "white",
                boxSizing: "border-box",
                height: "300px",
                maxHeight: "300px",
                minHeight: "300px",
                p: "10px 12px 8px",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    rowGap: 0.5,
                    mb: 0.75,
                    flexShrink: 0,
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "Inter",
                        fontWeight: 600,
                        fontSize: "22px",
                        lineHeight: 1.2,
                        color: "#2F2F2F",
                    }}
                >
                    Donation Analytics
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "6px",
                    }}
                >
                    {FILTERS.map((f) => {
                        const selected = range === f.key;
                        return (
                            <Button
                                key={f.key}
                                disableElevation
                                onClick={() => setRange(f.key)}
                                sx={{
                                    minWidth: "auto",
                                    px: 1.25,
                                    py: 0.35,
                                    borderRadius: "100px",
                                    fontFamily: "Inter",
                                    fontSize: "11px",
                                    fontWeight: selected ? 600 : 500,
                                    textTransform: "none",
                                    color: "#4A4A4A",
                                    bgcolor: "#EFEFEF",
                                    border: selected
                                        ? "1px solid #2D2D2D"
                                        : "1px solid transparent",
                                    boxShadow: "none",
                                    "&:hover": {
                                        bgcolor: "#E8E8E8",
                                        borderColor: selected ? "#2D2D2D" : "transparent",
                                    },
                                }}
                            >
                                {f.label}
                            </Button>
                        );
                    })}
                </Box>
            </Box>

            <Box
                sx={{
                    width: "100%",
                    flex: 1,
                    minHeight: 0,
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                {loading ? (
                    <CircularProgress size={40} />
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 2, right: 2, left: 0, bottom: 0 }}
                            barCategoryGap="22%"
                            barGap={4}
                        >
                            <CartesianGrid
                                strokeDasharray="0"
                                stroke="#ECECEC"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="label"
                                axisLine={false}
                                tickLine={false}
                                interval={0}
                                tick={{
                                    fill: "#8A8A8A",
                                    fontSize: 9,
                                    fontFamily: "Inter",
                                }}
                                height={28}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: "#8A8A8A",
                                    fontSize: 9,
                                    fontFamily: "Inter",
                                }}
                                tickFormatter={formatYAxis}
                                domain={[0, chartMaxY]}
                                ticks={chartTicks}
                                width={56}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ fill: "rgba(0,0,0,0.02)" }}
                            />
                            <Bar
                                dataKey="primary"
                                name="Temple"
                                fill={primaryBar}
                                radius={[4, 4, 0, 0]}
                                maxBarSize={28}
                                minPointSize={10}
                            />
                            <Bar
                                dataKey="secondary"
                                name="Other"
                                fill={secondaryBar}
                                radius={[4, 4, 0, 0]}
                                maxBarSize={28}
                                minPointSize={2}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </Box>
        </Box>
    );
};

export default DonationAnalyticsChart;
