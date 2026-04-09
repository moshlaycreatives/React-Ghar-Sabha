import React from "react";
import { Box, Container, Link as MuiLink, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { alpha } from "@mui/material/styles";

const PublicLegalLayout = ({ title, children, otherPageLabel, otherPagePath }) => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#FCF6F2",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                component="header"
                sx={{
                    py: 2,
                    px: { xs: 2, sm: 3 },
                    borderBottom: "1px solid",
                    borderColor: alpha("#F36100", 0.15),
                    backgroundColor: "#fff",
                    boxShadow: `0 1px 0 ${alpha("#000", 0.04)}`,
                }}
            >
                <Container maxWidth="md" sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 1.5 }}>
                    <Typography
                        component={RouterLink}
                        to="/"
                        variant="subtitle1"
                        sx={{
                            fontWeight: 800,
                            color: "#F36100",
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" },
                        }}
                    >
                        Ghar Sabha
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
                        <MuiLink
                            component={RouterLink}
                            to="/terms-and-conditions"
                            underline="hover"
                            sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#374151" }}
                        >
                            Terms
                        </MuiLink>
                        <MuiLink
                            component={RouterLink}
                            to="/privacy-policy"
                            underline="hover"
                            sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#374151" }}
                        >
                            Privacy
                        </MuiLink>
                        <MuiLink
                            component={RouterLink}
                            to="/"
                            underline="hover"
                            sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#F36100" }}
                        >
                            Admin login
                        </MuiLink>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="md" sx={{ flex: 1, py: { xs: 3, md: 5 }, px: { xs: 2, sm: 3 } }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: "#111827", mb: 1 }}>
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#6B7280", mb: 3 }}>
                    Last updated: {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                </Typography>
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        p: { xs: 2.5, sm: 4 },
                        boxShadow: `0 1px 3px ${alpha("#000", 0.06)}`,
                        border: `1px solid ${alpha("#F36100", 0.12)}`,
                        "& h2": { fontSize: "1.125rem", fontWeight: 700, color: "#1F2937", mt: 3, mb: 1.5, "&:first-of-type": { mt: 0 } },
                        "& p": { color: "#4B5563", lineHeight: 1.7, mb: 1.5 },
                        "& ul": { pl: 2.5, color: "#4B5563", lineHeight: 1.7, mb: 1.5 },
                        "& li": { mb: 0.75 },
                    }}
                >
                    {children}
                </Box>
                {otherPageLabel && otherPagePath ? (
                    <Typography variant="body2" sx={{ mt: 3, textAlign: "center", color: "#6B7280" }}>
                        See also:{" "}
                        <MuiLink component={RouterLink} to={otherPagePath} fontWeight={600}>
                            {otherPageLabel}
                        </MuiLink>
                    </Typography>
                ) : null}
            </Container>
        </Box>
    );
};

export default PublicLegalLayout;
