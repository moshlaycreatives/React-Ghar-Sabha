import { useState } from "react";
import { Box, Grid, TextField, Typography, IconButton, Divider } from "@mui/material";
import { FormDialogFrame } from "../../../components/FormDialogFrame.jsx";
import { FormSubmitButton } from "../../../components/FormSubmitButton.jsx";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../../utils/apiErrorMessage.js";




const labelSx = {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "18px",
    color: "#2F2F2F",
    mb: "8px",
};



const COLORS = [
    "#ED6161",
    "#296B4E",
    "#28B446",
    "#A3C702",
    "#AC4C0C",
    "#F40000",
    "#002FA7",
    "#4177FF",
    "#CF02BB",
    "#8200BE",
    "#E48D01",
];

const CreateNewGroup = ({ open, onClose, onCreate, eventId }) => {

    const [groupName, setGroupName] = useState("");
    const [profileName, setProfileName] = useState("");
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = async () => {
        if (!groupName || !profileName) return;
        setIsCreating(true);
        try {
            const token = localStorage.getItem("token");
            const payload = {
                name: groupName,
                profile: profileName,
                colorCode: selectedColor,
                eventId: eventId
            };

            const response = await axios.post(
                endpoints.CreateChatGroup,
                payload,
                {
                    headers: {
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                }
            );

            toast.success(response.data?.message || "Group created successfully");
            onCreate?.(payload);
            handleClose();
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Failed to create group"));
        } finally {
            setIsCreating(false);
        }
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
                    disabled={!groupName || !profileName || isCreating}
                    sx={{
                        width: { xs: "100%", sm: "auto" },
                        minWidth: 200,
                    }}
                >
                    {isCreating ? "Creating..." : "Create Group"}
                </FormSubmitButton>
            </Box>
        </FormDialogFrame>
    );
};

export default CreateNewGroup;
