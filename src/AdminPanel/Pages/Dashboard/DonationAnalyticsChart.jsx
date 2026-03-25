import { useState, useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const ORANGE = "#FF5C00";
const CHARCOAL = "#2D2D2D";

const MONTHLY_DATA = [
    { label: "Jan", primary: 400000, secondary: 260000 },
    { label: "Feb", primary: 210000, secondary: 450000 },
    { label: "Mar", primary: 350000, secondary: 320000 },
    { label: "Apr", primary: 240000, secondary: 270000 },
    { label: "May", primary: 30000, secondary: 120000 },
    { label: "Jun", primary: 310000, secondary: 140000 },
    { label: "Jul", primary: 450000, secondary: 470000 },
    { label: "Aug", primary: 410000, secondary: 270000 },
    { label: "Sep", primary: 140000, secondary: 270000 },
    { label: "Oct", primary: 120000, secondary: 30000 },
    { label: "Nov", primary: 80000, secondary: 320000 },
    { label: "Dec", primary: 320000, secondary: 210000 },
];

const WEEKLY_DATA = [
    { label: "Mon", primary: 120000, secondary: 95000 },
    { label: "Tue", primary: 180000, secondary: 140000 },
    { label: "Wed", primary: 95000, secondary: 210000 },
    { label: "Thu", primary: 220000, secondary: 165000 },
    { label: "Fri", primary: 275000, secondary: 190000 },
    { label: "Sat", primary: 310000, secondary: 240000 },
    { label: "Sun", primary: 145000, secondary: 88000 },
];

const YEARLY_DATA = [
    { label: "2021", primary: 3200000, secondary: 2800000 },
    { label: "2022", primary: 4100000, secondary: 3650000 },
    { label: "2023", primary: 3800000, secondary: 4200000 },
    { label: "2024", primary: 4500000, secondary: 3900000 },
    { label: "2025", primary: 2950000, secondary: 3100000 },
];

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
                borderRadius: "10px",
                px: 1.5,
                py: 1,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
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
    const [range, setRange] = useState("month");

    const data = useMemo(() => {
        if (range === "week") return WEEKLY_DATA;
        if (range === "year") return YEARLY_DATA;
        return MONTHLY_DATA;
    }, [range]);

    const { chartMaxY, chartTicks } = useMemo(() => {
        if (range === "month") {
            return {
                chartMaxY: 500000,
                chartTicks: [0, 100000, 200000, 300000, 400000, 500000],
            };
        }
        const m = Math.max(...data.flatMap((d) => [d.primary, d.secondary]), 1);
        if (range === "year") {
            const step = 1_000_000;
            const maxY = Math.max(5_000_000, Math.ceil(m / step) * step);
            return {
                chartMaxY: maxY,
                chartTicks: [0, maxY / 2, maxY],
            };
        }
        const step = 100_000;
        const maxY = Math.ceil(m / step) * step;
        return { chartMaxY: maxY, chartTicks: undefined };
    }, [data, range]);

    return (
        <Box
            sx={{
                boxShadow: "0px 4px 30px 0px #0000001A",
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
                        fontWeight: 700,
                        fontSize: "15px",
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
                }}
            >
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
                            name="Online"
                            fill={ORANGE}
                            radius={[4, 4, 0, 0]}
                            maxBarSize={28}
                        />
                        <Bar
                            dataKey="secondary"
                            name="In-person"
                            fill={CHARCOAL}
                            radius={[4, 4, 0, 0]}
                            maxBarSize={28}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default DonationAnalyticsChart;
