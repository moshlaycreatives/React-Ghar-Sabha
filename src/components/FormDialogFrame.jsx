import { Box, Dialog, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function DialogCloseButton({ onClose }) {
    return (
        <IconButton
            onClick={onClose}
            size="small"
            aria-label="close"
            sx={{
                bgcolor: "rgba(47, 47, 47, 0.06)",
                "&:hover": { bgcolor: "rgba(47, 47, 47, 0.1)" },
            }}
        >
            <CloseIcon sx={{ fontSize: 20, color: "text.primary" }} />
        </IconButton>
    );
}

const paperScrollable = {
    borderRadius: "12px",
    boxShadow: "0px 8px 32px rgba(47, 47, 47, 0.12)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    maxHeight: {
        xs: "calc(100dvh - 16px)",
        sm: "calc(100dvh - 32px)",
    },
    m: { xs: 1, sm: 2 },
};

const paperSimple = {
    borderRadius: "12px",
    boxShadow: "0px 8px 32px rgba(47, 47, 47, 0.12)",
    overflow: "hidden",
};

/**
 * Shared dialog shell: header + optional divider + scrollable body.
 * Form fields and submit handlers stay in each page component.
 */
export function FormDialogFrame({
    open,
    onClose,
    title,
    titleFontWeight = 500,
    titleFontSize = "25px",
    scrollable = true,
    dividerAfterHeader = false,
    headerPaddingBottom = 1.5,
    bodyPaddingTop = 0,
    children,
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: scrollable ? paperScrollable : paperSimple,
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexShrink: 0,
                    px: 2.5,
                    pt: 2.5,
                    pb: headerPaddingBottom,
                }}
            >
                <Typography
                    sx={{
                        fontWeight: titleFontWeight,
                        fontSize: titleFontSize,
                        color: "text.primary",
                    }}
                >
                    {title}
                </Typography>
                <DialogCloseButton onClose={onClose} />
            </Box>

            {dividerAfterHeader ? (
                <Box sx={{ borderBottom: "1px solid rgba(47, 47, 47, 0.08)" }} />
            ) : null}

            {scrollable ? (
                <Box
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        overflowY: "auto",
                        overflowX: "hidden",
                        WebkitOverflowScrolling: "touch",
                        px: 2.5,
                        pt: bodyPaddingTop,
                        pb: 2,
                    }}
                >
                    {children}
                </Box>
            ) : (
                children
            )}
        </Dialog>
    );
}
