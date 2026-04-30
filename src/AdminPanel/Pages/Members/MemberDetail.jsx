import { useState, useEffect } from "react";
import { Box, Grid, Typography, MenuItem, Select, FormControl, Button } from "@mui/material";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

import { useLocation } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../../utils/apiErrorMessage.js";
import { MutationLoadingOverlay } from "../../../components/MutationLoadingOverlay.jsx";
import { QRCodeSVG } from "qrcode.react";
import { commonDetailTitleSx, commonMutedTextSx, tableHeaderSx } from "../../CommonStyles";




const formatPhone = (phone) => {
    if (!phone || typeof phone !== "object") return "—";
    const cc = phone.countryCode ?? "";
    const num = phone.number ?? "";
    if (!cc && !num) return "—";
    return `${cc} ${num}`.trim();
};

const formatBirthday = (iso) => {
    if (!iso || typeof iso !== "string") return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const formatMoney = (amount, symbol) => {
    const n = Number(amount);
    const sym = symbol ?? "";
    if (Number.isNaN(n)) return `${sym}${amount ?? "—"}`;
    return `${sym}${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
};

/** Gold card top wave (same as pehle design). */
const CARD_HEADER_PNG =
    "https://storage.googleapis.com/codeless-app.appspot.com/uploads%2Fimages%2F0SNz11IwWISrcdILYBXz%2F7c08a841-d94b-43d3-85ab-56565a386699.png";

/** Orange card top wave — `public/image/member-card-header-orange.png` (upload / replace yahi file). */
const CARD_HEADER_ORANGE_PNG = "/image/member-card-header-orange.png";

/** Same placeholder as top profile when API has no `profilePicture`. */
const AVATAR_FALLBACK = "/image/avatorimage.png";

const MEMBER_CARD_THEMES = [
    { id: "golden", label: "Gold", accent: "#FECA38", titleColor: "#2F2F2F", headerImage: CARD_HEADER_PNG },
    { id: "orange", label: "Orange", accent: "#F36100", titleColor: "#FFFFFF", headerImage: CARD_HEADER_ORANGE_PNG },
];

const getMemberCardTheme = (id) =>
    MEMBER_CARD_THEMES.find((t) => t.id === id) ?? MEMBER_CARD_THEMES[0];

/** API: `#F36100`, `F36100`, `#feca38` → `#RRGGBB` uppercase */
const normalizeCardHex = (value) => {
    if (value == null || value === "") return null;
    let s = String(value).trim();
    if (!s) return null;
    if (!s.startsWith("#")) s = `#${s}`;
    if (!/^#[0-9A-Fa-f]{6}$/.test(s)) return null;
    return s.toUpperCase();
};

const getProfileCardHex = (p) => p?.baseColor ?? p?.colorCard?.backgroundColor ?? null;

/** Sirf do allowed accents — inhi se theme map hota hai. */
const hexToCardThemeId = (hex) => {
    const n = normalizeCardHex(hex);
    if (!n) return "golden";
    if (n === "#F36100") return "orange";
    if (n === "#FECA38") return "golden";
    return "golden";
};

const MembershipCard = ({
    themeId,
    memberName,
    memberId,
    locationLabel,
    memberSince,
    profileImageUrl,
    qrValue,
}) => {
    const theme = getMemberCardTheme(themeId);
    const accent = theme.accent;
    const headerImage = theme.headerImage ?? CARD_HEADER_PNG;
    const titleColor = theme.titleColor ?? "#2F2F2F";
    /** Location bar ke dono sides — green asset ki jagah theme accent (gold / orange). */
    const footerBarGradient = `linear-gradient(90deg, ${accent} 0%, color-mix(in srgb, ${accent} 55%, white) 10%, rgba(255,255,255,0.97) 38%, rgba(255,255,255,0.97) 62%, color-mix(in srgb, ${accent} 55%, white) 90%, ${accent} 100%)`;
    const photoSrc = profileImageUrl || AVATAR_FALLBACK;

    const COLORS = {
        darkText: "#2E2E2E",
        white: "#FFFFFF",
        shadow: "0px 0px 12px 0px rgba(0,0,0,0.08)",
    };

    const idText = String(memberId ?? "587413");
    const qrPayload = String(qrValue ?? memberId ?? "587413");

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // height: "100%",
                py: 2,
            }}
        >
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700&display=swap');
        `}
            </style>

            <Box
                sx={{
                    width: 274,
                    height: 505,
                    position: "relative",
                    backgroundColor: COLORS.white,
                    borderRadius: "14px",
                    boxShadow: COLORS.shadow,
                    overflow: "hidden",
                    transform: { xs: "scale(0.9)", sm: "scale(1)" },
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        left: -9,
                        top: 0,
                        zIndex: 3,
                        pointerEvents: "none",
                    }}
                >
                    <img
                        src={headerImage}
                        alt="header-bg"
                        style={{ width: 292, height: 210, objectFit: "contain" }}
                    />
                </Box>

                <Typography
                    className="member-card-title-poetsen"
                    sx={{
                        position: "absolute",
                        left: 42,
                        top: 8,
                        zIndex: 4,
                        color: titleColor,
                        fontSize: "35px",
                        fontWeight: 400,
                    }}
                >
                    Ghar Sabha
                </Typography>

                <Box
                    sx={{
                        position: "absolute",
                        left: 68,
                        top: 54,
                        width: 140,
                        height: 140,
                        zIndex: 2,
                    }}
                >
                    <img
                        src={photoSrc}
                        alt="profile-bg"
                        style={{
                            width: 139,
                            height: 140,
                            borderRadius: "50%",
                            objectFit: "cover",
                            position: "absolute",
                            boxSizing: "border-box",
                            border: `3px solid ${accent}`,
                        }}
                    />
                    <img
                        src={photoSrc}
                        alt="profile-main"
                        style={{
                            width: 140,
                            height: 140,
                            borderRadius: "50%",
                            objectFit: "cover",
                            position: "absolute",
                            boxSizing: "border-box",
                            border: `3px solid ${accent}`,
                        }}
                    />
                </Box>

                <Typography
                    sx={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 221,
                        textAlign: "center",
                        color: COLORS.darkText,
                        fontSize: "25px",
                        fontWeight: "bold",
                        fontFamily: "'Outfit', sans-serif",
                    }}
                >
                    {(memberName ?? "ROHAN GUPTA").toUpperCase()}
                </Typography>

                <Typography
                    sx={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 258,
                        textAlign: "center",
                        color: accent,
                        fontSize: "20px",
                        fontFamily: "'Outfit', sans-serif",
                    }}
                >
                    {idText}
                </Typography>

                <Box
                    sx={{
                        position: "absolute",
                        left: 75,
                        top: 292,
                        width: 124,
                        height: 124,
                        backgroundColor: COLORS.white,
                        border: `2px solid ${accent}`,
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <QRCodeSVG value={qrPayload} size={100} fgColor={accent} bgColor="#FFFFFF" level="M" includeMargin={false} />
                </Box>

                <Box
                    aria-hidden
                    sx={{
                        position: "absolute",
                        left: 0,
                        top: 429,
                        width: 274,
                        height: 33,
                        zIndex: 4,
                        background: footerBarGradient,
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        left: 21,
                        top: 429,
                        width: 233,
                        height: 33,
                        backgroundColor: COLORS.white,
                        border: `1px solid ${accent}`,
                        borderRadius: "17px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 5,
                    }}
                >
                    <Typography
                        sx={{
                            color: accent,
                            fontSize: "16px",
                            fontWeight: 500,
                            fontFamily: "'Outfit', sans-serif",
                        }}
                    >
                        {(locationLabel ?? "AHMADABAD, INDIA").toUpperCase()}
                    </Typography>
                </Box>

                <Typography
                    sx={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 471,
                        textAlign: "center",
                        color: COLORS.darkText,
                        fontSize: "16px",
                        fontFamily: "'Outfit', sans-serif",
                    }}
                >
                    Member since {memberSince ?? "2026"}
                </Typography>
            </Box>
        </Box>
    );
};

const MemberDetail = () => {
    const location = useLocation();
    const { id } = location.state || {};
    const [memberData, setMemberData] = useState(null);
    const [cardThemeId, setCardThemeId] = useState("golden");
    const [patchingCardColor, setPatchingCardColor] = useState(false);
    const [donationPage, setDonationPage] = useState(1);

    const profile = memberData?.profile;
    const stats = memberData?.stats;
    const donationHistory = memberData?.donationHistory ?? [];
    const DONATION_ROWS_PER_PAGE = 6;
    const totalDonationPages = Math.max(1, Math.ceil(donationHistory.length / DONATION_ROWS_PER_PAGE));
    const paginatedDonationHistory = donationHistory.slice(
        (donationPage - 1) * DONATION_ROWS_PER_PAGE,
        donationPage * DONATION_ROWS_PER_PAGE,
    );

    const fullName = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ").trim() || "—";
    const currencySym = profile?.currencySymbol ?? stats?.currency ?? "";
    const addr = profile?.addressDetails ?? profile;
    const cardAccent = getMemberCardTheme(cardThemeId).accent;

    const topCardSx = {

        borderRadius: "15px",
        backgroundColor: "white",
        minHeight: { xs: "auto", sm: "165px" },
        height: "100%",
        p: { xs: 2, sm: "10px 14px" },
    };

    const detailsCardSx = {

        borderRadius: "15px",
        backgroundColor: "white",
        marginTop: "20px",
        minHeight: "550px",
        height: "100%",
    };


    const GetAllmenber = async ({ soft = false } = {}) => {
        if (!id) return;
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${endpoints.GetAdminAllUser}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = response?.data?.data;
            if (data?.profile) {
                setMemberData(data);
            } else if (!soft) {
                setMemberData(null);
            }
        } catch (error) {
            if (!soft) {
                setMemberData(null);
                toast.error(getApiErrorMessage(error, "Failed to load member"));
            }
        }
    };

    useEffect(() => {
        GetAllmenber();
    }, [id]);

    useEffect(() => {
        setDonationPage(1);
    }, [id, donationHistory.length]);

    useEffect(() => {
        if (donationPage > totalDonationPages) {
            setDonationPage(totalDonationPages);
        }
    }, [donationPage, totalDonationPages]);

    /** API `baseColor` / `colorCard.backgroundColor` → card theme (sirf #FECA38 / #F36100). */
    useEffect(() => {
        if (!profile?.id || profile.id !== id) return;
        setCardThemeId(hexToCardThemeId(getProfileCardHex(profile)));
    }, [id, profile?.id, profile?.baseColor, profile?.colorCard?.backgroundColor]);

    const patchMemberCardColor = async (themeId) => {
        if (!id) return;
        setPatchingCardColor(true);
        try {
            const backgroundColor = getMemberCardTheme(themeId).accent;
            const token = localStorage.getItem("token");
            await axios.patch(
                `${endpoints.GetAdminAllUser}/${id}/color`,
                { backgroundColor },
                { headers: { Authorization: `Bearer ${token}` } },
            );
            await GetAllmenber({ soft: true });
        } finally {
            setPatchingCardColor(false);
        }
    };

    return (
        <>
            <Box>
                <Typography
                    sx={{
                        fontFamily: "Inter",
                        fontWeight: 600,
                        fontSize: { xs: "23px", md: "36px" },
                        color: "#2F2F2F",
                    }}>
                    Dashboard/Members<span style={{ color: "#F36100" }}>/Member Details</span>
                </Typography>
            </Box>


            <Grid container spacing={2} mt={3}>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                    <Box sx={topCardSx}>
                        <Box
                            display="flex"
                            gap={1.5}
                            sx={{
                                flexDirection: { xs: "column", sm: "row" },
                                alignItems: { xs: "center", sm: "flex-start" },
                            }}
                        >
                            <img
                                src={profile?.profilePicture || AVATAR_FALLBACK}
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    borderRadius: "50%",
                                    objectFit: "cover"
                                }}
                                alt="Profile"
                            />
                            <Box>
                                <Typography style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "26px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F",
                                    marginTop: "15px"
                                }}>
                                    {fullName}
                                </Typography>
                                <Typography style={{
                                    borderRadius: "10px",
                                    width: "fit-content",
                                    minWidth: "125px",
                                    padding: "0 8px",
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    lineHeight: "31px",
                                    color: "#F36100",
                                    backgroundColor: "#FBECDF",
                                    textAlign: "center",
                                    margin: "10px 0px 0px 0px"

                                }}>
                                    ID: {profile?.customId ?? "—"}
                                </Typography>
                                <Typography style={{
                                    borderRadius: "10px",
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F",
                                    margin: "8px 0px 0px 0px"

                                }}>
                                    Member Since:{" "}
                                    {profile?.createdAt
                                        ? new Date(profile.createdAt).getFullYear()
                                        : "—"}
                                </Typography>
                            </Box>
                        </Box>

                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2.6, lg: 2.6 }}>
                    <Box sx={topCardSx}>
                        <Box >
                            <Box sx={{ display: 'flex', gap: "10px" }}>
                                <img src="/image/Dicon.png" />
                            </Box>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "22px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F",
                                    marginTop: "10px"
                                }}>

                                Temple Donation
                            </Typography>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "30px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F",
                                    marginTop: "10px"
                                }}>

                                {formatMoney(stats?.templeDonation, currencySym)}
                            </Typography>
                        </Box >
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2.6, lg: 2.6 }}>
                    <Box sx={topCardSx}>
                        <Box >
                            <Box sx={{ display: 'flex', gap: "10px" }}>
                                <img src="/image/TDIcon.png" />
                            </Box>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "22px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F",
                                    marginTop: "10px"
                                }}>

                                Other Donations
                            </Typography>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "30px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F",
                                    marginTop: "10px"
                                }}>

                                {formatMoney(stats?.otherDonations, currencySym)}
                            </Typography>
                        </Box >

                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2.6, lg: 2.6 }}>
                    <Box sx={topCardSx}>
                        <Box >
                            <Box sx={{ display: 'flex', gap: "10px" }}>
                                <img src="/image/Dicon.png" />
                            </Box>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "22px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F",
                                    marginTop: "10px"
                                }}>

                                Total Donation
                            </Typography>
                            <Typography
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "30px",
                                    lineHeight: "31px",
                                    color: "#2F2F2F",
                                    marginTop: "10px"
                                }}>

                                {formatMoney(stats?.totalDonation, currencySym)}
                            </Typography>
                        </Box >

                    </Box>
                </Grid>
            </Grid>


            <Grid container spacing={2} mb={1}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={detailsCardSx}>

                        <Box sx={{ padding: "20px", display: "flex", flexDirection: "column", gap: 1 }}>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>Phone:</Typography>
                                <Typography sx={{ ...commonMutedTextSx, lineHeight: "31px", wordBreak: "break-word" }}>
                                    {formatPhone(profile?.phone)}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>WhatsApp No:</Typography>
                                <Typography sx={{ ...commonMutedTextSx, lineHeight: "31px", wordBreak: "break-word" }}>
                                    {profile?.isPhoneOnWhatsApp === false
                                        ? "—"
                                        : formatPhone(profile?.whatsappNumber ?? profile?.phone)}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>Email:</Typography>
                                <Typography sx={{ ...commonMutedTextSx, lineHeight: "31px", wordBreak: "break-word" }}>
                                    {profile?.email ?? "—"}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>Gender:</Typography>
                                <Typography sx={{ ...commonMutedTextSx, lineHeight: "31px" }}>{profile?.gender ?? "—"}</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>Birthday:</Typography>
                                <Typography sx={{ ...commonMutedTextSx, lineHeight: "31px" }}>{formatBirthday(profile?.dateOfBirth)}</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>Country:</Typography>
                                <Typography sx={{ ...commonMutedTextSx, lineHeight: "31px" }}>{addr?.country ?? "—"}</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>State:</Typography>
                                <Typography sx={commonMutedTextSx}>{addr?.state ?? "—"}</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>City:</Typography>
                                <Typography sx={commonMutedTextSx}>{addr?.city ?? "—"}</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>District:</Typography>
                                <Typography sx={commonMutedTextSx}>{addr?.district ?? "—"}</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>Tehsil:</Typography>
                                <Typography sx={commonMutedTextSx}>{addr?.tehsil ?? "—"}</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>ZIP Code:</Typography>
                                <Typography sx={commonMutedTextSx}>{addr?.zipCode ?? "—"}</Typography>
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", columnGap: "12px", alignItems: "start" }}>
                                <Typography sx={commonDetailTitleSx}>Address:</Typography>
                                <Typography
                                    sx={commonMutedTextSx}
                                >
                                    {addr?.address ?? profile?.address ?? "—"}
                                </Typography>
                            </Box>
                        </Box>



                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ ...detailsCardSx, position: "relative" }}>
                        <MutationLoadingOverlay open={patchingCardColor} />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                px: 2,
                                pt: 2,
                                pb: 0,
                            }}
                        >
                            <FormControl size="small" sx={{ minWidth: 160 }}>
                                <Select
                                    labelId="member-card-theme-label"
                                    id="member-card-theme"
                                    value={cardThemeId}
                                    disabled={patchingCardColor}
                                    sx={{
                                        borderRadius: 999,
                                        bgcolor: "#f2f2f2",
                                        color: "#4a4a4a",
                                        fontFamily: "Inter, system-ui, sans-serif",
                                        fontSize: "0.875rem",
                                        fontWeight: 500,
                                        boxShadow: "none",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "none",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            border: "none",
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            border: "none",
                                        },
                                        "&.Mui-focused": {
                                            boxShadow: "none",
                                        },
                                        "& .MuiSelect-select": {
                                            py: 0.75,
                                            px: 2,
                                            pr: 3.75,
                                            minHeight: "unset",
                                            display: "flex",
                                            alignItems: "center",
                                        },
                                        "& .MuiSelect-icon": {
                                            color: "#4a4a4a",
                                            right: 10,
                                        },
                                        "&.Mui-disabled": {
                                            bgcolor: "#f2f2f2",
                                            opacity: 0.72,
                                        },
                                    }}
                                    onChange={async (e) => {
                                        const next = e.target.value;
                                        const previous = cardThemeId;
                                        setCardThemeId(next);
                                        try {
                                            await patchMemberCardColor(next);
                                        } catch (error) {
                                            setCardThemeId(previous);
                                            toast.error(getApiErrorMessage(error, "Could not save card color"));
                                        }
                                    }}
                                >
                                    {MEMBER_CARD_THEMES.map((t) => (
                                        <MenuItem key={t.id} value={t.id}>
                                            {t.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <MembershipCard
                            themeId={cardThemeId}
                            memberName={fullName !== "—" ? fullName : "Member"}
                            memberId={String(profile?.customId ?? profile?.id ?? "—")}
                            locationLabel={
                                addr?.city && addr?.country
                                    ? `${addr.city}, ${addr.country}`
                                    : [addr?.city, addr?.country].filter(Boolean).join(", ") || "—"
                            }
                            memberSince={
                                profile?.createdAt
                                    ? String(new Date(profile.createdAt).getFullYear())
                                    : "—"
                            }
                            profileImageUrl={profile?.profilePicture}
                            qrValue={profile?.qrData ?? profile?.customId}
                        />
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={detailsCardSx}>

                        <Box sx={{ display: 'flex', flexFlow: "row", justifyContent: 'space-between', width: '100%', padding: "15px" }}>
                            <Typography
                                style={{
                                    fontFamily: 'Inter',
                                    fontWeight: 500,
                                    fontSize: '22px',
                                    lineHeight: '31px',
                                    color: '#2F2F2F',
                                }}
                            >
                                Donation History
                            </Typography>
                        </Box >

                        <Box style={{ overflowX: "auto" }}>
                            <Table sx={{}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={tableHeaderSx}>Donation Type</TableCell>
                                        <TableCell sx={tableHeaderSx}>Qty</TableCell>
                                        <TableCell sx={tableHeaderSx}>Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {donationHistory.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={3} sx={{ ...commonMutedTextSx, textAlign: "center", py: 3 }}>
                                                Donation history not available
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        paginatedDonationHistory.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                        {row.icon ? (
                                                            <img
                                                                src={row.icon}
                                                                alt=""
                                                                style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover" }}
                                                            />
                                                        ) : null}
                                                        <Typography sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "14px", color: "#2F2F2F" }}>
                                                            {row.donationType ?? "—"}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={commonMutedTextSx}>
                                                    {row.qty ?? "—"}
                                                </TableCell>
                                                <TableCell sx={commonMutedTextSx}>
                                                    {formatMoney(row.amount, currencySym)}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>

                        </Box>

                        {donationHistory.length > 0 ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    px: 2,
                                    pb: 2,
                                    pt: 1,
                                    gap: 1,
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    size="small"
                                    disabled={donationPage === 1}
                                    onClick={() => setDonationPage((prev) => Math.max(1, prev - 1))}
                                    sx={{ textTransform: "none" }}
                                >
                                    Previous
                                </Button>
                                <Typography sx={{ ...commonMutedTextSx, fontSize: "13px" }}>
                                    Page {donationPage} of {totalDonationPages}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    disabled={donationPage === totalDonationPages}
                                    onClick={() => setDonationPage((prev) => Math.min(totalDonationPages, prev + 1))}
                                    sx={{ textTransform: "none" }}
                                >
                                    Next
                                </Button>
                            </Box>
                        ) : null}


                    </Box>
                </Grid>

            </Grid >

        </>
    )
}

export default MemberDetail;