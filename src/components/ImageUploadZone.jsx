import { Box, Typography } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

/**
 * Dashed drop zone + hidden file input. Ref + handlers from useImageFilePicker.
 */
export function ImageUploadZone({
    fileInputRef,
    previewUrl,
    onZoneClick,
    onFileChange,
    minHeight = { xs: 120, sm: 170 },
    height, // Added height prop
    previewImageSx,
    mb = 0,
    emptyLabel = "Upload Image",
}) {
    const defaultPreviewSx = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
    };

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={onFileChange}
            />
            <Box
                onClick={onZoneClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onZoneClick();
                    }
                }}
                sx={{
                    border: "2px dashed rgba(47, 47, 47, 0.2)",
                    borderRadius: "10px",
                    height: height || minHeight, // Prioritize height, fallback to minHeight
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    bgcolor: "rgba(47, 47, 47, 0.02)",
                    overflow: "hidden",
                    mb,
                    "&:hover": {
                        borderColor: "rgba(243, 97, 0, 0.45)",
                        bgcolor: "rgba(243, 97, 0, 0.03)",
                    },
                }}
            >
                {previewUrl ? (
                    <Box
                        component="img"
                        src={previewUrl}
                        alt=""
                        sx={previewImageSx ?? defaultPreviewSx}
                    />
                ) : (
                    <>
                        <CloudUploadOutlinedIcon
                            sx={{
                                fontSize: 48,
                                color: "rgba(47, 47, 47, 0.35)",
                                mb: 1,
                            }}
                        />
                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: "15px",
                                color: "rgba(47, 47, 47, 0.55)",
                            }}
                        >
                            {emptyLabel}
                        </Typography>
                    </>
                )}
            </Box>
        </>
    );
}
