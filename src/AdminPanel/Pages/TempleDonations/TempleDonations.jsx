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
        TImage: "/image/Tpimage.png",
        TempleName: "BAPS Shri Swami",
        Amount: "$ 3,000",
        Country: "India",
        State: "Gujarat"
    },
    {
        Id: "1",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        TImage: "/image/Tpimage.png",
        TempleName: "BAPS Shri Swami",
        Amount: "$ 3,000",
        Country: "India",
        State: "Gujarat"
    },
    {
        Id: "1",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        TImage: "/image/Tpimage.png",
        TempleName: "BAPS Shri Swami",
        Amount: "$ 3,000",
        Country: "India",
        State: "Gujarat"
    },
    {
        Id: "1",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        TImage: "/image/Tpimage.png",
        TempleName: "BAPS Shri Swami",
        Amount: "$ 3,000",
        Country: "India",
        State: "Gujarat"
    },
    {
        Id: "1",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        TImage: "/image/Tpimage.png",
        TempleName: "BAPS Shri Swami",
        Amount: "$ 3,000",
        Country: "India",
        State: "Gujarat"
    },
    {
        Id: "1",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        TImage: "/image/Tpimage.png",
        TempleName: "BAPS Shri Swami",
        Amount: "$ 3,000",
        Country: "India",
        State: "Gujarat"
    },
    {
        Id: "1",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        TImage: "/image/Tpimage.png",
        TempleName: "BAPS Shri Swami",
        Amount: "$ 3,000",
        Country: "India",
        State: "Gujarat"
    },
    {
        Id: "1",
        MId: "234213",
        Name: "Rohan Mehta",
        Phone: "+91 99743 60038",
        TImage: "/image/Tpimage.png",
        TempleName: "BAPS Shri Swami",
        Amount: "$ 3,000",
        Country: "India",
        State: "Gujarat"
    },

]



const TempleDonations = () => {
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
                        fontFamily: "Inter",
                        fontWeight: 600,
                        fontSize: { xs: "26px", md: "36px" },
                        color: "#2F2F2F",
                    }}>
                    Dashboard<span style={{ color: "#F36100" }}>/Temple Donations</span>
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
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Donation ID</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Donor Name</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Phone</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Temple Name</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Amount</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Country</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>State</TableCell>
                                <TableCell style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {memberData?.map((row) => (
                                <TableRow key={row.Id}>
                                    <TableCell>{row.MId}</TableCell>
                                    <TableCell>{row.Name}</TableCell>
                                    <TableCell>{row.Phone}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <img
                                                src={row.TImage}
                                                alt={row.TempleName}
                                                style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover" }}
                                            />
                                            <Typography sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "14px", color: "#2F2F2F" }}>
                                                {row.TempleName}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{row.Amount}</TableCell>
                                    <TableCell>{row.Country}</TableCell>
                                    <TableCell>{row.State}</TableCell>

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

export default TempleDonations;