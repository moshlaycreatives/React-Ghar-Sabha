import React from "react";
import { Box, Button, Modal, Typography, Divider } from "@mui/material";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import toast from "react-hot-toast";




const DeleteEvent = ({ open, onClose, id, onDelete }) => {




    const EventDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${endpoints.AdminCreateNewEvent}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success(response.data.message);
            onClose();
            onDelete();
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };



    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="popup-modal-title"
            aria-describedby="popup-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: { xs: '16px', sm: '20px' },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90vw', sm: '500px', md: '620px' },
                    maxWidth: { xs: '90vw', sm: '85vw', md: '620px' },
                    minHeight: { xs: 'auto', sm: '220px' },
                    maxHeight: { xs: '90vh', sm: 'auto' },
                    backgroundColor: '#fff',
                    border: '1px solid #222222',
                    borderRadius: { xs: '15px', sm: '30px' },
                    boxShadow: '0px 4px 8px #222222',
                    outline: 'none',
                    padding: { xs: '16px', sm: '20px' },
                    overflow: 'auto',
                }}
            >


                <Box>
                    <Typography
                        sx={{
                            fontFamily: "Outfit",
                            fontWeight: 600,
                            fontSize: { xs: "20px", sm: "25px" },
                            lineHeight: { xs: "26px", sm: "31px" },
                            color: "#222222"
                        }}
                    >
                        Delete Event
                    </Typography>
                </Box>

                <Box sx={{ marginTop: "15px" }}>
                    <Divider />
                </Box>


                <Box>
                    <Typography
                        sx={{
                            fontFamily: "Outfit",
                            fontWeight: 400,
                            fontSize: { xs: "16px", sm: "18px" },
                            lineHeight: { xs: "24px", sm: "31px" },
                            color: "#222222",
                            marginTop: { xs: "12px", sm: "15px" }
                        }}
                    >
                        Are you sure you want to delete this Event?
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: { xs: "10px", sm: "15px" },
                        marginTop: { xs: "20px", sm: "15px" },
                        flexDirection: { xs: "column-reverse", sm: "row" }
                    }}
                >
                    <Button
                        sx={{
                            fontFamily: "Outfit",
                            fontWeight: 400,
                            fontSize: { xs: "16px", sm: "18px" },
                            color: "#222222",
                            backgroundColor: "#ECECEC",
                            width: { xs: "100%", sm: "160px" },
                            height: { xs: "45px", sm: "50px" },
                            borderRadius: "10px",
                            margin: { xs: "0px", sm: "20px 0px 30px 0px" },
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#DDDDDD",
                            }
                        }}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{
                            fontFamily: "Outfit",
                            fontWeight: 400,
                            fontSize: { xs: "16px", sm: "18px" },
                            color: "#FFFFFF",
                            backgroundColor: "#ED4040",
                            width: { xs: "100%", sm: "160px" },
                            height: { xs: "45px", sm: "50px" },
                            borderRadius: "10px",
                            margin: { xs: "0px", sm: "20px 0px 30px 0px" },
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#D63030",
                            }
                        }}
                        onClick={EventDelete}
                    >
                        Delete
                    </Button>
                </Box>





            </Box>

        </Modal>
    );
};

export default DeleteEvent;



