import { Box, Button, Grid, Typography } from "@mui/material";

/**
 * Breadcrumb: Dashboard / {accentSegment}
 * Optional toolbar action (e.g. Add) — each page passes its own onClick + label.
 */
export function DashboardPageHeader({ accentSegment, action }) {
    return (
        <Box>
            <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{ justifyContent: "space-between" }}
            >
                <Grid size={{ xs: 12, md: "auto" }}>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: { xs: "26px", md: "36px" },
                            color: "text.primary",
                        }}
                    >
                        Dashboard
                        <Box component="span" sx={{ color: "primary.main" }}>
                            /{accentSegment}
                        </Box>
                    </Typography>
                </Grid>
                {action ? (
                    <Grid
                        size={{ xs: 12, md: "auto" }}
                        sx={{
                            display: "flex",
                            justifyContent: { xs: "stretch", md: "flex-end" },
                        }}
                    >
                        {action}
                    </Grid>
                ) : null}
            </Grid>
        </Box>
    );
}

export function DashboardToolbarButton({ children, startIcon, onClick, ...props }) {
    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={startIcon}
            onClick={onClick}
            sx={{
                fontSize: "16px",
                lineHeight: "16px",
                fontWeight: 400,
                width: { xs: "100%", md: "auto" },
                minWidth: { md: 160 },
                height: "50px",
                borderRadius: "10px",
            }}
            {...props}
        >
            {children}
        </Button>
    );
}
