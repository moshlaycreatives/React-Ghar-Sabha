import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
} from "@mui/material";
import axios from "axios";
import { endpoints } from "../../../apiEndpoints";
import toast from "react-hot-toast";






const Members = () => {
    const navigate = useNavigate();
    const [memberData, setmemberData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuUserId, setMenuUserId] = useState(null);
    const open = Boolean(anchorEl);



    const handleMenuClick = (event, userId) => {
        setAnchorEl(event.currentTarget);
        setMenuUserId(userId);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setMenuUserId(null);
    };


    const hanldememberDetail = (id) => {
        navigate(`/dashboard/member-detail`, { state: { id } })
    }


    const GetAllmenber = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${endpoints.GetAdminAllUser}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setmemberData(response?.data?.data?.users || []);
        } catch (error) {
            setmemberData([]);
            toast.error(error.response?.data?.message);
        }
    };


    useEffect(() => {
        GetAllmenber();
    }, []);


    return (
        <>
            <Box>
                <Typography
                    sx={{
                        fontFamily: "Inter",
                        fontWeight: 600,
                        fontSize: { xs: "26px", md: "36px" },
                        color: "#2F2F2F",
                    }}>
                    Dashboard<span style={{ color: "#F36100" }}>/Members</span>
                </Typography>
            </Box>



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
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Member ID</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Name</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Phone</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>WhatsApp No.</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Mail</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Family</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Gender</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Country</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Member Since</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {memberData?.map((row) => (
                                <TableRow key={row.id || row._id}>
                                    <TableCell>{row.customId || "-"}</TableCell>
                                    <TableCell>{`${row.firstName || ""} ${row.lastName || ""}`.trim() || "-"}</TableCell>
                                    <TableCell>{`${row?.phone?.countryCode || ""} ${row?.phone?.number || ""}`.trim() || "-"}</TableCell>
                                    <TableCell>{`${row?.whatsappNumber?.countryCode || ""} ${row?.whatsappNumber?.number || ""}`.trim() || "-"}</TableCell>
                                    <TableCell>{row.email || "-"}</TableCell>
                                    <TableCell>{row.hasFamilyMember ? "Yes" : "No"}</TableCell>
                                    <TableCell>{row.gender || "-"}</TableCell>
                                    <TableCell>{row.country || "-"}</TableCell>
                                    <TableCell>{row.createdAt ? new Date(row.createdAt).getFullYear() : "-"}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={(e) => handleMenuClick(e, row.id || row._id)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="demo-positioned-menu"
                                            aria-labelledby="demo-positioned-button"
                                            anchorEl={anchorEl}
                                            open={open && menuUserId === (row.id || row._id)}
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

                                            <MenuItem onClick={() => hanldememberDetail(row.id)}>Member Details</MenuItem>

                                            {/* <MenuItem sx={{ color: "#ED4040", gap: "5px" }}>
                                                <RiDeleteBinLine fontSize="20px" />
                                                Delete</MenuItem> */}

                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>


                    </Table>

                </Box>


            </Box>

        </>
    )
}

export default Members;