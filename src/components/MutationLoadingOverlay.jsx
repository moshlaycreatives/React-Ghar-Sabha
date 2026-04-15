import { Box, CircularProgress } from "@mui/material";

/**
 * Covers a position:relative parent (e.g. dialog paper or form card).
 * Blocks pointer events until the mutation finishes.
 */
export function MutationLoadingOverlay({ open }) {
    if (!open) return null;
    return (
        <Box
            aria-busy="true"
            aria-live="polite"
            sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(255, 255, 255, 0.78)",
                zIndex: (theme) => theme.zIndex.modal + 2,
                borderRadius: "inherit",
                pointerEvents: "auto",
            }}
        >
            <CircularProgress size={48} thickness={4} />
        </Box>
    );
}
