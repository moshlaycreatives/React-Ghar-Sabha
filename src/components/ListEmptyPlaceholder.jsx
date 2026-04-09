import { Box, Typography, TableRow, TableCell } from "@mui/material";

/**
 * Centered empty / informational message for grids and sections.
 */
export function ListEmptyPlaceholder({ title, description, minHeight = 200, compact = false }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: compact ? 2 : 4,
                px: 2,
                minHeight: compact ? "auto" : minHeight,
                textAlign: "center",
            }}
        >
            <Typography
                sx={{
                    fontFamily: "Inter",
                    fontWeight: 600,
                    fontSize: compact ? "15px" : { xs: "16px", sm: "17px" },
                    color: "#2F2F2F",
                }}
            >
                {title}
            </Typography>
            {description ? (
                <Typography
                    sx={{
                        fontFamily: "Inter",
                        fontWeight: 400,
                        fontSize: "13px",
                        color: "#666666",
                        mt: 0.75,
                        maxWidth: 440,
                    }}
                >
                    {description}
                </Typography>
            ) : null}
        </Box>
    );
}

/**
 * Single table row spanning all columns — keeps table headers visible.
 */
export function TableEmptyRow({ colSpan, title, description }) {
    return (
        <TableRow>
            <TableCell colSpan={colSpan} sx={{ border: "none", py: 0 }}>
                <ListEmptyPlaceholder title={title} description={description} compact />
            </TableCell>
        </TableRow>
    );
}

export function TableLoadingRow({ colSpan }) {
    return (
        <TableRow>
            <TableCell
                colSpan={colSpan}
                sx={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    color: "#666666",
                    textAlign: "center",
                    py: 4,
                    border: "none",
                }}
            >
                Loading…
            </TableCell>
        </TableRow>
    );
}
