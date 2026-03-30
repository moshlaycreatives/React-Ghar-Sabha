import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
    DashboardPageHeader,
    DashboardToolbarButton,
} from "../../../components/DashboardPageHeader.jsx";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import toast from "react-hot-toast";
import DeleteTemple from "./DeleteTemple.jsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
} from "@mui/material";



const Temples = () => {
    const navigate = useNavigate();
    const [templeData, settempleData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuUserId, setMenuUserId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const open = Boolean(anchorEl);



    const handleMenuClick = (event, userId) => {
        setAnchorEl(event.currentTarget);
        setMenuUserId(userId);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setMenuUserId(null);
    };

    const handleAddtemple = () => {
        navigate(`/dashboard/add-temple`)
    };


    const GetAlltemple = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.AdminAddTemple}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            settempleData(response?.data?.data?.temples || []);
        } catch (error) {
            settempleData([]);
            toast.error(error.response?.data?.message || "Failed to fetch temple");
        }
    };


    useEffect(() => {
        GetAlltemple();
    }, []);



    return (
        <>


            <DashboardPageHeader
                accentSegment="Temples"

                action={
                    <DashboardToolbarButton onClick={handleAddtemple} startIcon={<AddIcon />}>
                        Add Temple
                    </DashboardToolbarButton>
                }
            />


            <Box sx={{
                boxShadow: "0px 4px 30px 0px #0000001A",
                borderRadius: "15px",
                backgroundColor: "white",
                marginTop: "20px"
            }}>



                <Box style={{ overflowX: "auto" }}>
                    <Table sx={{ border: "1px solid #EFEFEF", minWidth: "70rem" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Temple ID</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Temple Name</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Phone</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Mail</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>WhatsApp No.</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Country</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {templeData?.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.customId}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <img
                                                src={row.images?.[0] || "/image/Tpimage.png"}
                                                alt={row.title}
                                                style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover" }}
                                            />
                                            <Typography sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "14px", color: "#2F2F2F" }}>
                                                {row.title}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.whatsappNumber}</TableCell>
                                    <TableCell>{row.country}</TableCell>

                                    <TableCell>
                                        <IconButton
                                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={(e) => handleMenuClick(e, row.id)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="demo-positioned-menu"
                                            aria-labelledby="demo-positioned-button"
                                            anchorEl={anchorEl}
                                            open={open && menuUserId === row.id}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >

                                            <MenuItem 
                                                onClick={() => navigate(`/dashboard/edit-temple/${menuUserId}`)}
                                                sx={{ color: "#ED4040", gap: "5px" }}
                                            >
                                                {/* <MdBlockFlipped fontSize="20px" /> */}
                                                Edit</MenuItem>
                                            <MenuItem 
                                                onClick={() => {
                                                    setIsDeleteModalOpen(true);
                                                    setAnchorEl(null);
                                                }}
                                                sx={{ color: "#ED4040", gap: "5px" }}
                                            >
                                                {/* <RiDeleteBinLine fontSize="20px" /> */}
                                                Delete</MenuItem>

                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>


                    </Table>

                </Box>


            </Box>

            <DeleteTemple
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                id={menuUserId}
                onDelete={GetAlltemple}
            />

        </>
    )
}

export default Temples;