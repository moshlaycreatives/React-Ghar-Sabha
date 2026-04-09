import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Paper,
    Container,
    alpha,
    Checkbox,
    FormControlLabel,
    Link as MuiLink,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
    Visibility,
    VisibilityOff,
    EmailOutlined,
    LockOutlined
} from "@mui/icons-material";
import axios from "axios";
import { endpoints } from "../apiEndpoints";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../utils/apiErrorMessage.js";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(endpoints.LoginUser, {
                email: email,
                password: password,
            });

            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                toast.success(response.data.message || "Login successful!");
                navigate('/dashboard');
            } else {
                toast.error(response.data.message || "Login failed");
            }
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Login failed"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                backgroundColor: "#FCF6F2",
                overflow: "hidden", // Prevent main container from scrolling
            }}
        >
            {/* Left Side - Visual/Branding (Hidden on mobile) */}
            <Box
                sx={{
                    flex: { md: 0.5 }, // Content side at 50%
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    background: `linear-gradient(135deg, ${alpha("#F36100", 0.95)} 0%, #F36100 100%)`,
                    position: "relative",
                    overflow: "hidden",
                    color: "white",
                    p: 6,
                }}
            >
                {/* ... existing decorative elements ... */}
                <Box
                    sx={{
                        position: "absolute",
                        top: -150,
                        right: -150,
                        width: 500,
                        height: 500,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                        filter: "blur(40px)",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: -100,
                        left: -100,
                        width: 350,
                        height: 350,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)",
                        filter: "blur(30px)",
                    }}
                />
                
                {/* Floating dots pattern */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0.1,
                        backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                    }}
                />

                <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                    <Box
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        sx={{
                            backgroundColor: "white",
                            width: { md: "120px", lg: "140px" },
                            height: { md: "120px", lg: "140px" },
                            borderRadius: "32px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "0 auto 40px",
                            boxShadow: isHovered 
                                ? `0px 30px 60px ${alpha("#000", 0.25)}` 
                                : "0px 24px 48px rgba(0,0,0,0.15)",
                            transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            transform: isHovered ? "scale(1.1) rotate(8deg)" : "scale(1) rotate(0deg)",
                            position: "relative",
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                top: -10,
                                left: -10,
                                right: -10,
                                bottom: -10,
                                borderRadius: "40px",
                                border: `2px solid ${alpha("#fff", 0.3)}`,
                                opacity: isHovered ? 1 : 0,
                                transform: isHovered ? "scale(1.1)" : "scale(0.9)",
                                transition: "all 0.6s ease",
                            }
                        }}
                    >
                        <img
                            src="/image/logo.png"
                            alt="Logo"
                            style={{
                                width: "65%",
                                filter: isHovered ? "drop-shadow(0px 4px 8px rgba(0,0,0,0.1))" : "none",
                                transition: "all 0.4s ease"
                            }}
                        />
                    </Box>
                    <Typography 
                        variant="h2" 
                        sx={{ 
                            fontWeight: 900, 
                            mb: 2, 
                            fontFamily: "Inter", 
                            letterSpacing: "-0.04em",
                            textShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                            fontSize: { md: "3rem", lg: "3.75rem" },
                            background: "linear-gradient(to bottom, #fff, #ffd8c2)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Ghar Sabha
                    </Typography>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontWeight: 400, 
                            opacity: 0.9, 
                            maxWidth: "480px", 
                            lineHeight: 1.7, 
                            mx: "auto",
                            fontSize: { md: "1rem", lg: "1.1rem" },
                            letterSpacing: "0.01em",
                            fontStyle: "italic"
                        }}
                    >
                        The ultimate platform to manage community, track donations, and organize events seamlessly.
                    </Typography>
                </Box>
            </Box>

            {/* Right Side - Login Form */}
            <Box
                sx={{
                    flex: { xs: 1, md: 0.5 }, // Form side at 50%
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    p: { xs: 2, sm: 4, md: 6 },
                    height: "100vh",
                    overflowY: "auto", // Allow scrolling for small heights
                    backgroundColor: { xs: "#FCF6F2", md: "white" }, // Background for mobile
                }}
            >
                <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3, sm: 5, md: 6 },
                            borderRadius: { xs: "24px", md: "32px" },
                            boxShadow: { 
                                xs: "0px 10px 30px rgba(0, 0, 0, 0.04)", 
                                md: "0px 20px 50px rgba(0, 0, 0, 0.06)" 
                            },
                            backgroundColor: "white",
                            border: { xs: "1px solid", md: "none" },
                            borderColor: alpha("#000", 0.05),
                            width: "100%",
                            maxWidth: "480px",
                        }}
                    >
                        <Box sx={{ mb: { xs: 4, md: 5 }, textAlign: { xs: "center", md: "left" } }}>
                            <Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "center", mb: 3 }}>
                                <img src="/image/logo.png" alt="Logo" style={{ width: "80px" }} />
                            </Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 900,
                                    color: "#1A1A1A",
                                    mb: 1,
                                    fontFamily: "Inter",
                                    letterSpacing: "-0.03em",
                                    fontSize: { xs: "1.75rem", sm: "2.25rem" },
                                    position: "relative",
                                    display: "inline-block",
                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        bottom: -4,
                                        left: { xs: "50%", md: 0 },
                                        transform: { xs: "translateX(-50%)", md: "none" },
                                        width: "40px",
                                        height: "4px",
                                        backgroundColor: "primary.main",
                                        borderRadius: "2px"
                                    }
                                }}
                            >
                                Admin Login
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#6B7280", fontWeight: 500, mt: 2, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                                Enter your credentials to manage the portal
                            </Typography>
                        </Box>

                        <form onSubmit={handleSubmit}>
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 700, mb: 1, color: "#374151", fontSize: "0.875rem" }}
                                >
                                    Email Address
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="e.g. admin@gharsabha.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlined sx={{ color: "#9CA3AF", fontSize: 22 }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            height: { xs: "50px", sm: "56px" },
                                            borderRadius: "16px",
                                            backgroundColor: "#F9FAFB",
                                            transition: "all 0.2s ease-in-out",
                                            "& fieldset": { borderColor: "#E5E7EB", borderWidth: "1.5px" },
                                            "&:hover fieldset": { borderColor: "primary.main" },
                                            "&.Mui-focused": {
                                                backgroundColor: "#fff",
                                                "& fieldset": { borderWidth: "2px" }
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            <Box sx={{ mb: 2.5 }}>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 700, mb: 1, color: "#374151", fontSize: "0.875rem" }}
                                >
                                    Password
                                </Typography>
                                <TextField
                                    fullWidth
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlined sx={{ color: "#9CA3AF", fontSize: 22 }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                    size="small"
                                                    sx={{ color: "#9CA3AF" }}
                                                >
                                                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            height: { xs: "50px", sm: "56px" },
                                            borderRadius: "16px",
                                            backgroundColor: "#F9FAFB",
                                            transition: "all 0.2s ease-in-out",
                                            "& fieldset": { borderColor: "#E5E7EB", borderWidth: "1.5px" },
                                            "&:hover fieldset": { borderColor: "primary.main" },
                                            "&.Mui-focused": {
                                                backgroundColor: "#fff",
                                                "& fieldset": { borderWidth: "2px" }
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 3, md: 4 } }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            sx={{
                                                color: "#D1D5DB",
                                                "&.Mui-checked": { color: "primary.main" }
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography variant="body2" sx={{ fontWeight: 500, color: "#4B5563" }}>
                                            Remember me
                                        </Typography>
                                    }
                                />
                            </Box>

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                sx={{
                                    height: { xs: "54px", sm: "60px" },
                                    borderRadius: "16px",
                                    fontSize: "1.1rem",
                                    fontWeight: 800,
                                    textTransform: "none",
                                    background: `linear-gradient(90deg, #F36100 0%, #FF8C42 100%)`,
                                    boxShadow: `0px 8px 24px ${alpha("#F36100", 0.3)}`,
                                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                    "&:hover": {
                                        boxShadow: `0px 15px 35px ${alpha("#F36100", 0.45)}`,
                                        transform: "translateY(-4px) scale(1.02)",
                                        background: `linear-gradient(90deg, #FF8C42 0%, #F36100 100%)`,
                                    },
                                    "&:active": {
                                        transform: "translateY(-1px) scale(0.98)",
                                    },
                                    "&.Mui-disabled": {
                                        background: "#E5E7EB",
                                        color: "#9CA3AF"
                                    }
                                }}
                            >
                                {loading ? "Authenticating..." : "Access Dashboard"}
                            </Button>
                        </form>

                        <Box sx={{ mt: { xs: 4, md: 5 }, textAlign: "center" }}>
                            <Typography variant="body2" sx={{ color: "#9CA3AF", fontWeight: 500, mb: 1 }}>
                                <MuiLink
                                    component={RouterLink}
                                    to="/terms-and-conditions"
                                    underline="hover"
                                    sx={{ color: "#6B7280", fontWeight: 600, mr: 1.5 }}
                                >
                                    Terms
                                </MuiLink>
                                <span style={{ color: "#D1D5DB" }} aria-hidden>·</span>
                                <MuiLink
                                    component={RouterLink}
                                    to="/privacy-policy"
                                    underline="hover"
                                    sx={{ color: "#6B7280", fontWeight: 600, ml: 1.5 }}
                                >
                                    Privacy
                                </MuiLink>
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#9CA3AF", fontWeight: 500 }}>
                                © {new Date().getFullYear()} Ghar Sabha. All rights reserved.
                            </Typography>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
};

export default Login;