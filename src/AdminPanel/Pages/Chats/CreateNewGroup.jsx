import { useState } from "react";
import { Box, Grid, TextField, Typography, IconButton, Divider } from "@mui/material";
import { FormDialogFrame } from "../../../components/FormDialogFrame.jsx";
import { FormSubmitButton } from "../../../components/FormSubmitButton.jsx";

const labelSx = {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "18px",
    color: "#2F2F2F",
    mb: "8px",
};

const COLORS = [
    "#FF5D5D", // Coral
    "#006D44", // Dark Green
    "#00B140", // Green
    "#98D22C", // Lime
    "#A64B00", // Brown
    "#FF0000", // Red
    "#002395", // Dark Blue
    "#0081FF", // Blue
    "#E60099", // Magenta
    "#8E00B1", // Purple
    "#F36100", // Orange
];

const CreateNewGroup = ({ open, onClose, onCreate }) => {
    const [groupName, setGroupName] = useState("");
    const [profileName, setProfileName] = useState("");
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);

    const handleCreate = () => {
        if (!groupName || !profileName) return;
        onCreate?.({ groupName, profileName, color: selectedColor });
        handleClose();
    };

    const handleClose = () => {
        setGroupName("");
        setProfileName("");
        setSelectedColor(COLORS[0]);
        onClose();
    };

    return (
        <FormDialogFrame
            open={open}
            onClose={handleClose}
            title="Create New Group"
            titleFontSize="24px"
            titleFontWeight={600}
            dividerAfterHeader={true}
            bodyPaddingTop={2.5}
        >
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography sx={labelSx}>Group Name</Typography>
                    <TextField
                        fullWidth
                        placeholder="Enter group name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                bgcolor: "#FFFFFF",
                            },
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography sx={labelSx}>Profile Picture Name</Typography>
                    <TextField
                        fullWidth
                        placeholder="Enter profile picture name"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                bgcolor: "#FFFFFF",
                            },
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Typography sx={labelSx}>Select Card Color</Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {COLORS.map((color) => (
                            <IconButton
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                sx={{
                                    width: 36,
                                    height: 36,
                                    bgcolor: color,
                                    borderRadius: "8px",
                                    border: selectedColor === color ? "2px solid #2F2F2F" : "none",
                                    "&:hover": {
                                        bgcolor: color,
                                        opacity: 0.8,
                                    },
                                    p: 0,
                                }}
                            />
                        ))}
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                <FormSubmitButton
                    onClick={handleCreate}
                    disabled={!groupName || !profileName}
                    sx={{
                        width: { xs: "100%", sm: "auto" },
                        minWidth: 200,
                    }}
                >
                    Create Group
                </FormSubmitButton>
            </Box>
        </FormDialogFrame>
    );
};

export default CreateNewGroup;
