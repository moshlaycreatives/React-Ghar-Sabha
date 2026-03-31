import { useState } from "react";
import {
    Box,
    Grid,
    Typography,
    IconButton,
    Avatar,
    InputBase,
    LinearProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import {
    DashboardPageHeader,
    DashboardToolbarButton,
} from "../../../components/DashboardPageHeader.jsx";
import CreateNewGroup from "./CreateNewGroup.jsx";
import SendMessage from "./SendMessage.jsx";

const ORANGE = "#F36100";
const GREY_MUTED = "#7A7A7A";
const BUBBLE_BG = "#EEEEEE";
const CARD_SHADOW = "0px 4px 24px rgba(0, 0, 0, 0.06)";

const carouselThumb = "/image/Deventimage.png";

/** Base shell; selected = orange ring, unselected = subtle grey border */
const carouselCardShellBaseSx = {
    flexShrink: 0,
    width: { xs: 184, sm: 240 },
    boxSizing: "border-box",
    borderRadius: "18px",
    bgcolor: "#FFFFFF",
    overflow: "hidden",
    cursor: "pointer",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const carouselShellSelectedSx = {
    border: `2px solid ${ORANGE}`,
    boxShadow: `0 0 0 1px ${ORANGE}33`,
};

const carouselShellIdleSx = {
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "none",
};

const carouselInnerPadSx = { p: "5px" };

const carouselVisualBoxSx = {
    width: "100%",
    height: { xs: 100, sm: 120 },
    borderRadius: "14px",
    overflow: "hidden",
    lineHeight: 0,
    fontSize: 0,
};

const CAROUSEL_ITEMS = [
    { id: 0, kind: "brand", caption: "Ghar Sabha Group" },
    { id: 1, kind: "image", caption: "Second Event" },
    { id: 2, kind: "image", caption: "Third Event" },
];

const Chats = () => {
    const [selectedCarouselId, setSelectedCarouselId] = useState(0);
    const [createNewGroupOpen, setCreateNewGroupOpen] = useState(false);
    const [sendMessageOpen, setSendMessageOpen] = useState(false);

    const handleCreateGroup = (data) => {
        console.log("Creating new group:", data);
        // Add your logic here
    };

    const handleSendMessage = (data) => {
        console.log("Sending information:", data);
        // Add your logic here
    };

    return (
        <Box
            sx={{
                bgcolor: "transparent",
                minHeight: "100%",
                pb: 2,
            }}
        >
            <DashboardPageHeader
                accentSegment="Chats"
                action={
                    selectedCarouselId !== 0 && (
                        <DashboardToolbarButton
                            startIcon={<AddIcon />}
                            onClick={() => setCreateNewGroupOpen(true)}
                        >
                            Create Group
                        </DashboardToolbarButton>
                    )
                }
            />
            <Box sx={{ mb: 2 }} />

            {/* Top shortcut carousel */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    overflowX: "auto",
                    mb: 2,
                    "&::-webkit-scrollbar": { height: 6 },
                    "&::-webkit-scrollbar-thumb": {
                        bgcolor: "rgba(0,0,0,0.12)",
                        borderRadius: 3,
                    },
                }}
            >
                {CAROUSEL_ITEMS.map((item) => {
                    const isSelected = selectedCarouselId === item.id;
                    return (
                        <Box
                            key={item.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => setSelectedCarouselId(item.id)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setSelectedCarouselId(item.id);
                                }
                            }}
                            sx={{
                                ...carouselCardShellBaseSx,
                                ...(isSelected ? carouselShellSelectedSx : carouselShellIdleSx),
                            }}
                        >
                            <Box sx={carouselInnerPadSx}>
                                {item.kind === "brand" ? (
                                    <Box
                                        sx={{
                                            ...carouselVisualBoxSx,
                                            bgcolor: ORANGE,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: "Inter",
                                                fontWeight: 700,
                                                fontSize: { xs: "18px", sm: "22px" },
                                                lineHeight: 1.2,
                                                color: "#FFFFFF",
                                                textAlign: "center",
                                                px: 1,
                                            }}
                                        >
                                            Ghar Sabha
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Box sx={carouselVisualBoxSx}>
                                        <Box
                                            component="img"
                                            src={carouselThumb}
                                            alt=""
                                            sx={{
                                                width: "100%",
                                                height: { xs: 100, sm: 120 },
                                                objectFit: "cover",
                                                objectPosition: "center center",
                                                display: "block",
                                                m: 0,
                                                p: 0,
                                            }}
                                        />
                                    </Box>
                                )}
                                <Typography
                                    sx={{
                                        fontFamily: "Inter",
                                        fontWeight: item.kind === "brand" ? 600 : 600,
                                        fontSize: item.kind === "brand" ? "14px" : "14px",
                                        lineHeight: 1.35,
                                        color: "#2F2F2F",
                                        margin: "10px 0px 10px 10px"
                                    }}
                                >
                                    {item.caption}
                                </Typography>
                            </Box>
                        </Box>
                    );
                })}
            </Box>

            <Grid container spacing={2} alignItems="stretch">
                {/* Left: Messages list */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                        sx={{
                            bgcolor: "#FFFFFF",
                            borderRadius: "18px",
                            boxShadow: CARD_SHADOW,
                            border: "1px solid rgba(0,0,0,0.06)",
                            overflow: "hidden",
                            height: { xs: "auto", md: 620 },
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                px: 2,
                                py: 2,
                                borderBottom: "1px solid rgba(0,0,0,0.06)",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Inter",
                                    fontWeight: 700,
                                    fontSize: "18px",
                                    color: "#2F2F2F",
                                }}
                            >
                                Messages
                            </Typography>
                            <IconButton
                                size="small"
                                aria-label="Search"
                                sx={{
                                    border: "1px solid #E0E0E0",
                                    borderRadius: "10px",
                                    width: 40,
                                    height: 40,
                                    color: "#2F2F2F",
                                }}
                            >
                                <SearchIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        <Box
                            sx={{
                                px: 2,
                                py: 1.5,
                                display: "flex",
                                gap: 1.5,
                                alignItems: "flex-start",
                                cursor: "pointer",
                                bgcolor: "rgba(243, 97, 0, 0.06)",
                                borderLeft: `3px solid ${ORANGE}`,
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 48,
                                    height: 48,
                                    bgcolor: ORANGE,
                                    fontFamily: "Inter",
                                    fontWeight: 700,
                                    fontSize: "14px",
                                }}
                            >
                                GS
                            </Avatar>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                        gap: 1,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: "Inter",
                                            fontWeight: 700,
                                            fontSize: "15px",
                                            color: "#2F2F2F",
                                        }}
                                    >
                                        Ghar Sabha
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: "Inter",
                                            fontWeight: 400,
                                            fontSize: "12px",
                                            color: GREY_MUTED,
                                            flexShrink: 0,
                                        }}
                                    >
                                        10:32 AM
                                    </Typography>
                                </Box>
                                <Typography
                                    sx={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "13px",
                                        color: GREY_MUTED,
                                        mt: 0.5,
                                        lineHeight: 1.4,
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                    }}
                                >
                                    Lorem ipsum dolor sit amet, consectetur.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>

                {/* Right: Active chat */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Box
                        sx={{
                            bgcolor: "#FFFFFF",
                            borderRadius: "18px",
                            boxShadow: CARD_SHADOW,
                            border: "1px solid rgba(0,0,0,0.06)",
                            height: { xs: "auto", md: 620 },
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                px: 2,
                                py: 2,
                                borderBottom: "1px solid rgba(0,0,0,0.06)",
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 48,
                                    height: 48,
                                    bgcolor: ORANGE,
                                    fontFamily: "Inter",
                                    fontWeight: 700,
                                    fontSize: "14px",
                                }}
                            >
                                GS
                            </Avatar>
                            <Box>
                                <Typography
                                    sx={{
                                        fontFamily: "Inter",
                                        fontWeight: 700,
                                        fontSize: "16px",
                                        color: "#2F2F2F",
                                    }}
                                >
                                    Ghar Sabha
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "13px",
                                        color: GREY_MUTED,
                                    }}
                                >
                                    Members: 235,234
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                flex: 1,
                                overflowY: "auto",
                                px: 2,
                                py: 2,
                                bgcolor: "#FAFAFA",
                            }}
                        >
                            <DateDivider label="Yesterday" />
                            <OutgoingText
                                text="Lorem ipsum dolor sit amet consectetur."
                                time="10:56 AM"
                            />

                            <DateDivider label="Today" />
                            <OutgoingImage time="7:10 PM" src={carouselThumb} />
                            <OutgoingEventPoll time="7:10 PM" imageSrc={carouselThumb} />
                        </Box>

                        <Box
                            sx={{
                                px: 2,
                                py: 2,
                                borderTop: "1px solid rgba(0,0,0,0.06)",
                                bgcolor: "#FFFFFF",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    bgcolor: "#F0F0F0",
                                    borderRadius: "14px",
                                    px: 1.5,
                                    py: 0.5,
                                }}
                            >
                                <InputBase
                                    placeholder="Type your message..."
                                    fullWidth
                                    sx={{
                                        fontFamily: "Inter",
                                        fontSize: "15px",
                                        color: "#2F2F2F",
                                        py: 1,
                                        "& .MuiInputBase-input::placeholder": {
                                            color: GREY_MUTED,
                                            opacity: 1,
                                        },
                                    }}
                                />
                                <IconButton size="small" sx={{ color: "#5C5C5C" }} aria-label="Gallery">
                                    <ImageOutlinedIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" sx={{ color: "#5C5C5C" }} aria-label="Attach">
                                    <AttachFileIcon fontSize="small" sx={{ transform: "rotate(45deg)" }} />
                                </IconButton>
                                <IconButton
                                    aria-label="Send"
                                    onClick={() => {
                                        if (selectedCarouselId === 0) {
                                            setSendMessageOpen(true);
                                        } else {
                                            // Handle regular message sending for other groups
                                            console.log("Normal send clicked");
                                        }
                                    }}
                                    sx={{
                                        bgcolor: ORANGE,
                                        color: "#FFFFFF",
                                        width: 44,
                                        height: 44,
                                        "&:hover": { bgcolor: "#d95600" },
                                    }}
                                >
                                    <SendIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <CreateNewGroup
                open={createNewGroupOpen}
                onClose={() => setCreateNewGroupOpen(false)}
                onCreate={handleCreateGroup}
            />

            <SendMessage
                open={sendMessageOpen}
                onClose={() => setSendMessageOpen(false)}
                onSend={handleSendMessage}
            />
        </Box>
    );
};

function DateDivider({ label }) {
    return (
        <Typography
            sx={{
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: "12px",
                color: GREY_MUTED,
                textAlign: "center",
                my: 2,
            }}
        >
            {label}
        </Typography>
    );
}

function OutgoingText({ text, time }) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                gap: 1,
                mb: 2,
            }}
        >
            <Box
                sx={{
                    maxWidth: "72%",
                    bgcolor: BUBBLE_BG,
                    borderRadius: "16px 16px 4px 16px",
                    px: 1.75,
                    py: 1.25,
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "Inter",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: 1.45,
                        color: "#2F2F2F",
                    }}
                >
                    {text}
                </Typography>
                <Typography
                    sx={{
                        fontFamily: "Inter",
                        fontSize: "11px",
                        color: GREY_MUTED,
                        textAlign: "right",
                        mt: 0.75,
                    }}
                >
                    {time}
                </Typography>
            </Box>
            <Avatar
                sx={{
                    width: 36,
                    height: 36,
                    bgcolor: ORANGE,
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: "11px",
                }}
            >
                GS
            </Avatar>
        </Box>
    );
}

function OutgoingImage({ time, src }) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                gap: 1,
                mb: 2,
            }}
        >
            <Box
                sx={{
                    maxWidth: "72%",
                    borderRadius: "16px",
                    overflow: "hidden",
                    bgcolor: BUBBLE_BG,
                }}
            >
                <Box
                    component="img"
                    src={src}
                    alt=""
                    sx={{ width: "100%", maxHeight: 220, objectFit: "cover", display: "block" }}
                />
                <Typography
                    sx={{
                        fontFamily: "Inter",
                        fontSize: "11px",
                        color: GREY_MUTED,
                        textAlign: "right",
                        px: 1.5,
                        py: 1,
                    }}
                >
                    {time}
                </Typography>
            </Box>
            <Avatar
                sx={{
                    width: 36,
                    height: 36,
                    bgcolor: ORANGE,
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: "11px",
                }}
            >
                GS
            </Avatar>
        </Box>
    );
}

function OutgoingEventPoll({ time, imageSrc }) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                gap: 1,
                mb: 1,
            }}
        >
            <Box
                sx={{
                    maxWidth: "78%",
                    borderRadius: "16px",
                    overflow: "hidden",
                    bgcolor: "#FFFFFF",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
            >
                <Box
                    component="img"
                    src={imageSrc}
                    alt=""
                    sx={{ width: "100%", maxHeight: 180, objectFit: "cover", display: "block" }}
                />
                <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography
                        sx={{
                            fontFamily: "Inter",
                            fontWeight: 600,
                            fontSize: "14px",
                            color: "#2F2F2F",
                            mb: 1.5,
                        }}
                    >
                        Will you be attending this event?
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={72}
                        sx={{
                            height: 10,
                            borderRadius: "6px",
                            bgcolor: "#E8E8E8",
                            "& .MuiLinearProgress-bar": {
                                borderRadius: "6px",
                                bgcolor: ORANGE,
                            },
                        }}
                    />
                    <Typography
                        sx={{
                            fontFamily: "Inter",
                            fontWeight: 600,
                            fontSize: "13px",
                            color: ORANGE,
                            mt: 1,
                        }}
                    >
                        12,345 Joined
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Inter",
                            fontSize: "11px",
                            color: GREY_MUTED,
                            textAlign: "right",
                            mt: 1,
                        }}
                    >
                        {time}
                    </Typography>
                </Box>
            </Box>
            <Avatar
                sx={{
                    width: 36,
                    height: 36,
                    bgcolor: ORANGE,
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: "11px",
                }}
            >
                GS
            </Avatar>
        </Box>
    );
}

export default Chats;
