import { useState } from "react";
import { Box, Grid, Typography, Card, CardContent, } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
} from "@mui/material";



const memberData = [
    {
        Id: "1",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        WhatsAppNo: "+91 99743 60038",
        Mail: "rohan@vadtaldham.com",
        Family: "Yes",
        Gender: "Female",
        Country: "India",
        MemberS: "2026"
    },
    {
        Id: "2",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        WhatsAppNo: "+91 99743 60038",
        Mail: "rohan@vadtaldham.com",
        Family: "Yes",
        Gender: "Female",
        Country: "India",
        MemberS: "2026"
    },
    {
        Id: "3",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        WhatsAppNo: "+91 99743 60038",
        Mail: "rohan@vadtaldham.com",
        Family: "Yes",
        Gender: "Female",
        Country: "India",
        MemberS: "2026"
    },
    {
        Id: "4",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        WhatsAppNo: "+91 99743 60038",
        Mail: "rohan@vadtaldham.com",
        Family: "Yes",
        Gender: "Female",
        Country: "India",
        MemberS: "2026"
    },
    {
        Id: "5",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        WhatsAppNo: "+91 99743 60038",
        Mail: "rohan@vadtaldham.com",
        Family: "Yes",
        Gender: "Female",
        Country: "India",
        MemberS: "2026"
    },
    {
        Id: "6",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        WhatsAppNo: "+91 99743 60038",
        Mail: "rohan@vadtaldham.com",
        Family: "Yes",
        Gender: "Female",
        Country: "India",
        MemberS: "2026"
    },
    {
        Id: "6",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        WhatsAppNo: "+91 99743 60038",
        Mail: "rohan@vadtaldham.com",
        Family: "Yes",
        Gender: "Female",
        Country: "India",
        MemberS: "2026"
    },
    {
        Id: "6",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        WhatsAppNo: "+91 99743 60038",
        Mail: "rohan@vadtaldham.com",
        Family: "Yes",
        Gender: "Female",
        Country: "India",
        MemberS: "2026"
    },
]



const Members = () => {
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

    return (
        <>
            <Box>
                <Typography
                    sx={{
                        fontFamily: "Outfit",
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
                                <TableCell style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Member ID</TableCell>
                                <TableCell style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Name</TableCell>
                                <TableCell style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Phone</TableCell>
                                <TableCell style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>WhatsApp No.</TableCell>
                                <TableCell style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Mail</TableCell>
                                <TableCell style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Family</TableCell>
                                <TableCell style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Gender</TableCell>
                                <TableCell style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Country</TableCell>
                                <TableCell style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Member Since</TableCell>
                                <TableCell style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {memberData?.map((row) => (
                                <TableRow key={row.Id}>
                                    <TableCell>{row.MId}</TableCell>
                                    <TableCell>{row.Name}</TableCell>
                                    <TableCell>{row.Phone}</TableCell>
                                    <TableCell>{row.WhatsAppNo}</TableCell>
                                    <TableCell>{row.Mail}</TableCell>
                                    <TableCell>{row.Family}</TableCell>
                                    <TableCell>{row.Gender}</TableCell>
                                    <TableCell>{row.Country}</TableCell>
                                    <TableCell>{row.MemberS}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={(e) => handleMenuClick(e, row._id)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="demo-positioned-menu"
                                            aria-labelledby="demo-positioned-button"
                                            anchorEl={anchorEl}
                                            open={open && menuUserId === row._id}
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

                                            <MenuItem sx={{ color: "#ED4040", gap: "5px" }}>
                                                {/* <MdBlockFlipped fontSize="20px" /> */}
                                                Block</MenuItem>
                                            <MenuItem sx={{ color: "#ED4040", gap: "5px" }}>
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

        </>
    )
}

export default Members;