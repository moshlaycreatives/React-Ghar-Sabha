import React from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Grid from '@mui/material/Grid';
import axios from "axios";
import { endpoints } from "../apiEndpoints";
// import toast from "react-hot-toast";






const Login = () => {
    const navigate = useNavigate();



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');








    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(endpoints.LoginUser, {
                email: email,
                password: password,
            });

            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
            }
            handleOpen()
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message);
            console.error("Login error:", error);
        }
    };









    const handleOpen = () => {
        navigate('/dashboard')
    }



    return (
        <>

            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                }}
            >
                <Box
                    sx={{
                        boxShadow: "0px 4px 30px 0px #0000001A",
                        borderRadius: "10px",
                        backgroundColor: "white",
                        padding: "15px",
                        width: { xs: "80%", md: "35%" }
                    }}
                >

                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "20px 0px 0px 0px"
                    }}>
                        <img
                            src="/image/logo.png"
                            style={{
                                width: "200px",
                                height: "200spx",
                                display: "flex",

                            }}

                        />
                    </Box>





                    <Box>
                        <Typography style={{
                            fontFamily: "Inter",
                            fontWeight: 600,
                            fontSize: "26px",
                            color: "#2B2B2B",
                            textAlign: "center",
                            marginTop: "20px"
                        }}>
                            Sign In
                        </Typography>
                        {/* <Typography style={{
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontSize: "20px",
                            color: "#2B2B2B",
                            textAlign: "center"
                        }}>
                            Welcome! Please enter your details
                        </Typography> */}
                    </Box>
                    <Grid container sx={{ padding: "10px" }}>
                        <Grid size={{ xs: 12, md: 12 }}>
                            <Typography style={{
                                fontFamily: "Inter",
                                fontWeight: 400,
                                fontSize: "18px",
                                lineHeight: "31px",
                                color: "#2B2B2B",
                                margin: "0px 0px 15px 0px"
                            }}>
                                Email
                            </Typography>
                            <TextField fullWidth
                                placeholder="Enter email"
                                name="price"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Typography style={{
                                fontFamily: "Inter",
                                fontWeight: 400,
                                fontSize: "18px",
                                lineHeight: "31px",
                                color: "#2B2B2B",
                                margin: "10px 0px 10px 0px"
                            }}>
                                Password
                            </Typography>
                            <TextField fullWidth
                                type="password"
                                placeholder="Enter Password"
                                name="price"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                sx={{
                                    fontFamily: "Inter",
                                    fontWeight: 500,
                                    fontSize: "20px",
                                    lineHeight: "31px",
                                    color: "#FFFFFF",
                                    backgroundColor: "#F36100",
                                    textTransform: "none",
                                    width: "100%",
                                    height: "56px",
                                    borderRadius: "12px",
                                    margin: "40px 0px 10px 0px"
                                }}
                                onClick={handleSubmit}
                            >
                                Sign In
                            </Button>

                        </Grid>
                    </Grid>
                </Box>
            </Box>




        </>
    )
}


export default Login;