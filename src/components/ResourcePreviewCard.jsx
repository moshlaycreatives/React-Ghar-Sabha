import { Box, Card, IconButton, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";

/**
 * Shared poster card for Events / Donations / Donation History grids.
 * Data + navigation + API calls stay on each page.
 */
export function ResourcePreviewCard({
    image,
    title,
    subtitle,
    footer,
    onMenuOpen,
    onView,
    menuAriaLabel = "Options",
    viewAriaLabel = "View details",
    /** donation-style: larger subtitle + orange footer line */
    variant = "event",
}) {
    const isDonation = variant === "donation";

    return (
        <Card
            sx={{
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0px 4px 30px 0px #0000001A",
                bgcolor: "#FFFFFF",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "100%",
                border: "1px solid rgba(0, 0, 0, 0.06)",
            }}
        >
            <Box sx={{ bgcolor: "#FFFFFF", p: "8px" }}>
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "16 / 10",
                        overflow: "hidden",
                        borderRadius: "10px",
                        bgcolor: "#FFFFFF",
                        lineHeight: 0,
                    }}
                >
                    <Box
                        component="img"
                        src={image}
                        alt=""
                        loading="lazy"
                        sx={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center center",
                            display: "block",
                        }}
                    />
                    <IconButton
                        size="small"
                        onClick={onMenuOpen}
                        aria-label={menuAriaLabel}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            zIndex: 1,
                            width: 36,
                            height: 36,
                            bgcolor: "#FFFFFF",
                            boxShadow: "0px 2px 8px rgba(0,0,0,0.12)",
                            "&:hover": { bgcolor: "#F5F5F5" },
                        }}
                    >
                        <MoreVertIcon sx={{ color: "text.primary", fontSize: 22 }} />
                    </IconButton>
                </Box>
            </Box>

            <Box
                sx={{
                    px: 2,
                    pt: 0,
                    pb: 2,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "#FFFFFF",
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: "16px",
                        lineHeight: 1.35,
                        color: "text.primary",
                        mb: "4px",
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 400,
                        fontSize: isDonation ? "18px" : "14px",
                        lineHeight: 1.4,
                        color: "text.secondary",
                    }}
                >
                    {subtitle}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: isDonation ? 600 : 400,
                            fontSize: "15px",
                            color: isDonation ? "primary.main" : "text.primary",
                        }}
                    >
                        {footer}
                    </Typography>
                    <IconButton
                        size="small"
                        aria-label={viewAriaLabel}
                        onClick={onView}
                        sx={{
                            width: 40,
                            height: 40,
                            minWidth: 40,
                            flexShrink: 0,
                            bgcolor: "primary.main",
                            color: "#FFFFFF",
                            "&:hover": { bgcolor: "primary.dark" },
                        }}
                    >
                        <VisibilityIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
}
