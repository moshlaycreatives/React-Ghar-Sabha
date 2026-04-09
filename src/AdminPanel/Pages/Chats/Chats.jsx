import { useState, useEffect, useRef, useCallback } from "react";
import {
    Box,
    Grid,
    Typography,
    IconButton,
    Avatar,
    InputBase,
    LinearProgress,
    CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
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
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../../utils/apiErrorMessage.js";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';





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

const FIXED_CAROUSEL_ITEM = { id: 0, kind: "brand", caption: "Ghar Sabha Group" };

const Chats = () => {
    const [EventDetailData, setEventDetailData] = useState([]);
    const [selectedCarouselId, setSelectedCarouselId] = useState(0);
    const [createNewGroupOpen, setCreateNewGroupOpen] = useState(false);
    const [sendMessageOpen, setSendMessageOpen] = useState(false);
    const [chatGroups, setChatGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [SendText, setSendText] = useState({
        chatGroupId: "",
        text: "",
        imageUrl: "",
        fileUrl: "",
        country: "",
        state: "",
        city: "",
        district: "",
        tehsil: "",
        isPollEnabled: false,
        pollContent: ""
    })
    const [messages, setMessages] = useState([]);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const imageInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const groupSearchInputRef = useRef(null);

    const [groupSearchOpen, setGroupSearchOpen] = useState(false);
    const [groupSearch, setGroupSearch] = useState("");
    const [debouncedGroupSearch, setDebouncedGroupSearch] = useState("");

    // Fetch messages for selected group
    const fetchMessages = async (groupId) => {
        if (!groupId) return;
        setIsMessagesLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.AdminSendMessage}/${groupId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Updated to match your response structure: response.data.data.messages
            setMessages(response?.data?.data?.messages || []);
        } catch (error) {
            console.error("Failed to fetch messages", error);
            setMessages([]);
            toast.error(getApiErrorMessage(error, "Could not load messages"));
        } finally {
            setIsMessagesLoading(false);
        }
    };

    const handleUploadMedia = async (file, type) => {
        if (!file) return;
        setIsUploading(true);
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('file', file);

            // Using UploadMediaSingle endpoint which is used in ImageUploadZone logic
            const response = await axios.post(
                `${endpoints.UploadMediaSingle}?path=chats`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );

            const uploadedUrl = response?.data?.data?.file?.url;
            if (uploadedUrl) {
                if (type === 'image') {
                    setSendText(prev => ({ ...prev, imageUrl: uploadedUrl }));
                    toast.success("Image uploaded successfully");
                } else {
                    setSendText(prev => ({ ...prev, fileUrl: uploadedUrl }));
                    toast.success("File uploaded successfully");
                }
            }
        } catch (error) {
            console.error("Upload failed", error);
            toast.error(getApiErrorMessage(error, "Failed to upload media"));
        } finally {
            setIsUploading(false);
        }
    };

    // Get groups for selected event; optional search matches backend ?eventId=&search=
    const fetchGroups = useCallback(async (eventId, searchTerm = "") => {
        try {
            const token = localStorage.getItem('token');
            const params = new URLSearchParams();
            params.set("eventId", eventId === 0 ? "" : String(eventId));
            const trimmed = (searchTerm || "").trim();
            if (trimmed) {
                params.set("search", trimmed);
            }
            const url = `${endpoints.CreateChatGroup}?${params.toString()}`;

            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const groups = response?.data?.data?.groups || [];
            setChatGroups(groups);
            if (groups.length > 0) {
                setSelectedGroupId(groups[0].id);
            } else {
                setSelectedGroupId(null);
            }
        } catch (error) {
            setChatGroups([]);
            setSelectedGroupId(null);
            console.error("Failed to fetch groups", error);
            toast.error(getApiErrorMessage(error, "Could not load chat groups"));
        }
    }, []);

    useEffect(() => {
        if (!groupSearchOpen) {
            setDebouncedGroupSearch("");
            return;
        }
        const id = setTimeout(() => setDebouncedGroupSearch(groupSearch.trim()), 300);
        return () => clearTimeout(id);
    }, [groupSearch, groupSearchOpen]);

    useEffect(() => {
        const q = groupSearchOpen ? debouncedGroupSearch.trim() : "";
        fetchGroups(selectedCarouselId, q);
    }, [selectedCarouselId, debouncedGroupSearch, groupSearchOpen, fetchGroups]);

    const toggleGroupSearch = () => {
        if (groupSearchOpen) {
            setGroupSearch("");
            setGroupSearchOpen(false);
        } else {
            setGroupSearchOpen(true);
            requestAnimationFrame(() => groupSearchInputRef.current?.focus());
        }
    };

    const activeGroup = chatGroups.find(g => g.id === selectedGroupId);

    // Update chatGroupId and fetch messages when activeGroup changes
    useEffect(() => {
        if (activeGroup) {
            setSendText(prev => ({ ...prev, chatGroupId: activeGroup.id }));
            fetchMessages(activeGroup.id);
        } else {
            setSendText(prev => ({ ...prev, chatGroupId: "" }));
            setMessages([]);
        }
    }, [activeGroup]);

    const handleDownloadQRCode = () => {
        if (!activeGroup?.qrCode) {
            toast.error("QR Code not available for this group");
            return;
        }

        try {
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = activeGroup.qrCode;
            link.download = `${activeGroup.name.replace(/\s+/g, '_')}_QRCode.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Download failed", error);
            toast.error(getApiErrorMessage(error, "Failed to download QR code"));
        }
    };

    // Combine fixed item with fetched event data
    const carouselItemsToDisplay = [
        FIXED_CAROUSEL_ITEM,
        ...(EventDetailData || []).map((event) => ({
            id: event.id,
            kind: "image",
            caption: event.name,
            image: event.image,
        })),
    ];

    const handleCreateGroup = (data) => {
        console.log("Creating new group:", data);
        if (selectedCarouselId !== 0) {
            const q = groupSearchOpen ? debouncedGroupSearch.trim() : "";
            fetchGroups(selectedCarouselId, q);
        }
    };

    const handleSendMessage = (data) => {
        console.log("Sending information from popup:", data);
        // Combine SendText (which has chatGroupId, text, imageUrl, fileUrl) with popup data
        const finalPayload = {
            ...SendText,
            country: data.country || "",
            state: data.state || "",
            city: data.city || "",
            district: data.district || "",
            tehsil: data.tehsil || "",
            isPollEnabled: data.poll === "Yes" ? true : false,
            pollContent: data.pollContent || ""
        };

        console.log("Final Payload for Ghar Sabha Group:", finalPayload);

        const sendGharSabhaMsg = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`${endpoints.AdminSendMessage}`, finalPayload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success("Message sent successfully to Ghar Sabha Group");
                // Clear input after sending
                setSendText(prev => ({
                    ...prev,
                    text: "",
                    imageUrl: "",
                    fileUrl: "",
                    isPollEnabled: false,
                    pollContent: ""
                }));
                setSendMessageOpen(false);
            } catch (error) {
                toast.error(getApiErrorMessage(error, "Failed to send message"));
            }
        };

        sendGharSabhaMsg();
    };



    const GetAllEvent = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.AdminCreateNewEvent}?status=false`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setEventDetailData(response?.data?.data?.events || []);
        } catch (error) {
            setEventDetailData([]);
            toast.error(getApiErrorMessage(error, "Failed to load events"));
        }
    };


    useEffect(() => {
        GetAllEvent();
    }, []);



    const CreateGroupMsg = async () => {
        if (!SendText.chatGroupId) {
            toast.error("Please select a group first");
            return;
        }

        // Debugging: check the state before sending
        console.log("Current SendText state:", SendText);

        if (!SendText.text && !SendText.imageUrl && !SendText.fileUrl) {
            toast.error("Please enter a message or upload a file");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            // Ensure we are sending the latest state
            const payload = {
                ...SendText,
                // Double check these are exactly what the API expects
                imageUrl: SendText.imageUrl || "",
                fileUrl: SendText.fileUrl || "",
                text: SendText.text || ""
            };

            console.log("Sending payload:", payload);

            const response = await axios.post(`${endpoints.AdminSendMessage}`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Message sent successfully");

            // Refresh messages after sending
            fetchMessages(SendText.chatGroupId);

            // Clear input after sending
            setSendText(prev => ({
                ...prev,
                text: "",
                imageUrl: "",
                fileUrl: "",
                isPollEnabled: false,
                pollContent: ""
            }));
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Failed to send message"));
        }
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
                {carouselItemsToDisplay.map((item) => {
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
                                            src={item.image || carouselThumb}
                                            alt={item.caption}
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
                                        fontWeight: 600,
                                        fontSize: "14px",
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
                                gap: 1,
                                px: 2,
                                py: 2,
                                borderBottom: "1px solid rgba(0,0,0,0.06)",
                                minWidth: 0,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Inter",
                                    fontWeight: 700,
                                    fontSize: "18px",
                                    color: "#2F2F2F",
                                    flexShrink: 0,
                                }}
                            >
                                Messages
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    flex: groupSearchOpen ? 1 : 0,
                                    minWidth: 0,
                                    justifyContent: "flex-end",
                                }}
                            >
                                {groupSearchOpen && (
                                    <InputBase
                                        inputRef={groupSearchInputRef}
                                        placeholder="Search groups or messages…"
                                        value={groupSearch}
                                        onChange={(e) => setGroupSearch(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Escape") {
                                                e.preventDefault();
                                                toggleGroupSearch();
                                            }
                                        }}
                                        sx={{
                                            flex: 1,
                                            minWidth: 0,
                                            fontFamily: "Inter",
                                            fontSize: "14px",
                                            color: "#2F2F2F",
                                            border: "1px solid #E0E0E0",
                                            borderRadius: "10px",
                                            px: 1.5,
                                            py: 0.75,
                                            bgcolor: "#FAFAFA",
                                        }}
                                        inputProps={{
                                            "aria-label": "Search chat groups",
                                        }}
                                    />
                                )}
                                <IconButton
                                    size="small"
                                    onClick={toggleGroupSearch}
                                    aria-label={groupSearchOpen ? "Close search" : "Search"}
                                    aria-expanded={groupSearchOpen}
                                    sx={{
                                        border: "1px solid #E0E0E0",
                                        borderRadius: "10px",
                                        width: 40,
                                        height: 40,
                                        flexShrink: 0,
                                        color: "#2F2F2F",
                                    }}
                                >
                                    {groupSearchOpen ? (
                                        <CloseIcon fontSize="small" />
                                    ) : (
                                        <SearchIcon fontSize="small" />
                                    )}
                                </IconButton>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                flex: 1,
                                overflowY: "auto",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {/* Show all groups for the selected event (including Ghar Sabha Group) */}
                            {chatGroups.map((group) => {
                                const isGroupSelected = selectedGroupId === group.id;
                                return (
                                    <Box
                                        key={group.id}
                                        onClick={() => setSelectedGroupId(group.id)}
                                        sx={{
                                            px: 2,
                                            py: 1.5,
                                            display: "flex",
                                            gap: 1.5,
                                            alignItems: "flex-start",
                                            cursor: "pointer",
                                            bgcolor: isGroupSelected ? "rgba(243, 97, 0, 0.06)" : "transparent",
                                            borderLeft: isGroupSelected ? `3px solid ${ORANGE}` : "3px solid transparent",
                                            "&:hover": {
                                                bgcolor: isGroupSelected ? "rgba(243, 97, 0, 0.06)" : "rgba(0,0,0,0.02)",
                                            },
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 48,
                                                height: 48,
                                                bgcolor: group.colorCode || ORANGE,
                                                fontFamily: "Inter",
                                                fontWeight: 700,
                                                fontSize: "14px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                "& .MuiAvatar-fallback": {
                                                    display: "none"
                                                }
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: "12px",
                                                    fontWeight: 700,
                                                    textAlign: "center",
                                                    lineHeight: 1.2,
                                                    px: 0.5,
                                                    wordBreak: "break-word",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden"
                                                }}
                                            >
                                                {group.profile || group.name?.substring(0, 2).toUpperCase()}
                                            </Typography>
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
                                                    {group.name}
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
                                                    {group.lastMessageAt ? new Date(group.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "10:32 AM"}
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
                                                {group.lastMessage || "No messages yet"}
                                            </Typography>
                                        </Box>
                                    </Box>
                                );
                            })}
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
                                    bgcolor: activeGroup?.colorCode || ORANGE,
                                    fontFamily: "Inter",
                                    fontWeight: 700,
                                    fontSize: "14px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "12px",
                                        fontWeight: 700,
                                        textAlign: "center",
                                        lineHeight: 1.2,
                                        px: 0.5,
                                        wordBreak: "break-word",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden"
                                    }}
                                >
                                    {activeGroup?.profile || activeGroup?.name?.substring(0, 2).toUpperCase() || "GS"}
                                </Typography>
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    sx={{
                                        fontFamily: "Inter",
                                        fontWeight: 700,
                                        fontSize: "16px",
                                        color: "#2F2F2F",
                                    }}
                                >
                                    {activeGroup?.name || "Select a group"}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "13px",
                                        color: GREY_MUTED,
                                    }}
                                >
                                    {activeGroup ? `Members: ${activeGroup.totalMembers?.toLocaleString() || 0}` : ""}
                                </Typography>
                            </Box>
                            {activeGroup && selectedCarouselId !== 0 && (
                                <DashboardToolbarButton
                                    variant="outlined"
                                    startIcon={<FileDownloadOutlinedIcon />}
                                    onClick={handleDownloadQRCode}
                                    sx={{
                                        bgcolor: "#2F2F2F",
                                        color: "#FFFFFF",
                                        borderRadius: "8px",
                                        fontSize: "13px",
                                        "&:hover": { bgcolor: "#1a1a1a" }
                                    }}
                                >
                                    Download QR Code
                                </DashboardToolbarButton>
                            )}
                        </Box>

                        <Box
                            sx={{
                                flex: 1,
                                overflowY: "auto",
                                px: 2,
                                py: 2,
                                bgcolor: "#FAFAFA",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {isMessagesLoading ? (
                                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                                    <CircularProgress size={30} sx={{ color: ORANGE }} />
                                </Box>
                            ) : messages.length > 0 ? (
                                messages.map((msg, index) => {
                                    const isLast = index === messages.length - 1;
                                    const time = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                                    return (
                                        <Box key={msg.id} sx={{ mb: isLast ? 0 : 2 }}>
                                            {msg.isPollEnabled ? (
                                                <OutgoingEventPoll
                                                    time={time}
                                                    imageSrc={msg.imageUrl}
                                                    pollContent={msg.pollContent}
                                                    totalPollCount={msg.totalPollCount}
                                                    percentage={msg.percentage}
                                                    senderName={msg.senderName}
                                                    profile={activeGroup?.profile}
                                                    colorCode={activeGroup?.colorCode}
                                                />
                                            ) : msg.imageUrl ? (
                                                <OutgoingImage
                                                    time={time}
                                                    src={msg.imageUrl}
                                                    text={msg.text}
                                                    senderName={msg.senderName}
                                                    profile={activeGroup?.profile}
                                                    colorCode={activeGroup?.colorCode}
                                                />
                                            ) : msg.fileUrl ? (
                                                <OutgoingFile
                                                    time={time}
                                                    fileUrl={msg.fileUrl}
                                                    text={msg.text}
                                                    senderName={msg.senderName}
                                                    profile={activeGroup?.profile}
                                                    colorCode={activeGroup?.colorCode}
                                                />
                                            ) : (
                                                <OutgoingText
                                                    text={msg.text}
                                                    time={time}
                                                    senderName={msg.senderName}
                                                    profile={activeGroup?.profile}
                                                    colorCode={activeGroup?.colorCode}
                                                />
                                            )}
                                        </Box>
                                    );
                                })
                            ) : (
                                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                                    <Typography sx={{ color: GREY_MUTED, fontSize: "14px" }}>
                                        No messages yet
                                    </Typography>
                                </Box>
                            )}
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
                                    placeholder={isUploading ? "Uploading media..." : "Type your message..."}
                                    fullWidth
                                    value={SendText.text}
                                    disabled={isUploading}
                                    onChange={(e) => setSendText(prev => ({ ...prev, text: e.target.value }))}
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
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    ref={imageInputRef}
                                    onChange={(e) => handleUploadMedia(e.target.files[0], 'image')}
                                />
                                <input
                                    type="file"
                                    hidden
                                    ref={fileInputRef}
                                    onChange={(e) => handleUploadMedia(e.target.files[0], 'file')}
                                />
                                <IconButton
                                    size="small"
                                    sx={{
                                        color: SendText.imageUrl ? ORANGE : "#5C5C5C",
                                        bgcolor: SendText.imageUrl ? `${ORANGE}11` : "transparent",
                                        borderRadius: "8px",
                                        p: 0.5
                                    }}
                                    aria-label="Gallery"
                                    disabled={isUploading}
                                    onClick={() => imageInputRef.current?.click()}
                                >
                                    {isUploading ? <CircularProgress size={20} color="inherit" /> : <ImageOutlinedIcon fontSize="small" />}
                                </IconButton>
                                <IconButton
                                    size="small"
                                    sx={{
                                        color: SendText.fileUrl ? ORANGE : "#5C5C5C",
                                        bgcolor: SendText.fileUrl ? `${ORANGE}11` : "transparent",
                                        borderRadius: "8px",
                                        p: 0.5
                                    }}
                                    aria-label="Attach"
                                    disabled={isUploading}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <AttachFileIcon fontSize="small" sx={{ transform: "rotate(45deg)" }} />
                                </IconButton>
                                <IconButton
                                    aria-label="Send"
                                    onClick={() => {
                                        if (selectedCarouselId === 0) {
                                            setSendMessageOpen(true);
                                        } else {
                                            // Call CreateGroupMsg for regular event groups
                                            CreateGroupMsg();
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
                eventId={selectedCarouselId}
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

function OutgoingText({ text, time, senderName, profile, colorCode }) {
    if (!text) return null;
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
                    bgcolor: colorCode || ORANGE,
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: "11px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Typography
                    sx={{
                        fontSize: "9px",
                        fontWeight: 700,
                        textAlign: "center",
                        lineHeight: 1.1,
                        px: 0.3,
                        wordBreak: "break-word",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                    }}
                >
                    {profile || senderName?.substring(0, 2).toUpperCase() || "GS"}
                </Typography>
            </Avatar>
        </Box>
    );
}

function OutgoingImage({ time, src, text, senderName, profile, colorCode }) {
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
                {text && (
                    <Typography
                        sx={{
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: 1.45,
                            color: "#2F2F2F",
                            px: 1.5,
                            pt: 1,
                        }}
                    >
                        {text}
                    </Typography>
                )}
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
                    bgcolor: colorCode || ORANGE,
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: "11px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Typography
                    sx={{
                        fontSize: "9px",
                        fontWeight: 700,
                        textAlign: "center",
                        lineHeight: 1.1,
                        px: 0.3,
                        wordBreak: "break-word",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                    }}
                >
                    {profile || senderName?.substring(0, 2).toUpperCase() || "GS"}
                </Typography>
            </Avatar>
        </Box>
    );
}

function OutgoingFile({ time, fileUrl, text, senderName, profile, colorCode }) {
    const fileName = fileUrl.split('/').pop();
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
                    component="a"
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 1.5,
                        textDecoration: "none",
                        color: "#2F2F2F",
                        bgcolor: "rgba(0,0,0,0.05)",
                        "&:hover": { bgcolor: "rgba(0,0,0,0.08)" }
                    }}
                >
                    <AttachFileIcon sx={{ color: ORANGE, transform: "rotate(45deg)" }} />
                    <Typography
                        sx={{
                            fontFamily: "Inter",
                            fontSize: "13px",
                            fontWeight: 500,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}
                    >
                        {fileName}
                    </Typography>
                </Box>
                {text && (
                    <Typography
                        sx={{
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: 1.45,
                            color: "#2F2F2F",
                            px: 1.5,
                            pt: 1,
                        }}
                    >
                        {text}
                    </Typography>
                )}
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
                    bgcolor: colorCode || ORANGE,
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: "11px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Typography
                    sx={{
                        fontSize: "9px",
                        fontWeight: 700,
                        textAlign: "center",
                        lineHeight: 1.1,
                        px: 0.3,
                        wordBreak: "break-word",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                    }}
                >
                    {profile || senderName?.substring(0, 2).toUpperCase() || "GS"}
                </Typography>
            </Avatar>
        </Box>
    );
}

function OutgoingEventPoll({ time, imageSrc, pollContent, totalPollCount, percentage, senderName, profile, colorCode }) {
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
                {imageSrc && imageSrc !== "string" && (
                    <Box
                        component="img"
                        src={imageSrc}
                        alt=""
                        sx={{ width: "100%", maxHeight: 180, objectFit: "cover", display: "block" }}
                    />
                )}
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
                        {pollContent || "Will you be attending this event?"}
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={percentage || 0}
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
                        {totalPollCount?.toLocaleString() || 0} Joined
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
                    bgcolor: colorCode || ORANGE,
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: "11px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Typography
                    sx={{
                        fontSize: "9px",
                        fontWeight: 700,
                        textAlign: "center",
                        lineHeight: 1.1,
                        px: 0.3,
                        wordBreak: "break-word",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                    }}
                >
                    {profile || senderName?.substring(0, 2).toUpperCase() || "GS"}
                </Typography>
            </Avatar>
        </Box>
    );
}

export default Chats;
