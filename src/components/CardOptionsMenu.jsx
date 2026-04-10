import { Menu, MenuItem } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';





export function CardOptionsMenu({ anchorEl, open, onClose, onEdit, onDelete, onComplete }) {
    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{
                paper: {
                    sx: { borderRadius: "10px", minWidth: 160 },
                },
            }}
        >
            <MenuItem onClick={() => { onEdit?.(); onClose(); }} sx={{ fontSize: 14, gap: 1 }}>
                <EditOutlinedIcon sx={{ fontSize: 18 }} />
                Edit
            </MenuItem>
            {onComplete && (
                <MenuItem onClick={() => { onComplete?.(); onClose(); }} sx={{ fontSize: 14 , gap:"8px", color:"green" }}>
                    <DoneOutlinedIcon sx={{ fontSize: 18, }} />
                    Complete
                </MenuItem>
            )}
            <MenuItem onClick={() => { onDelete?.(); onClose(); }} sx={{ fontSize: 14, color: "error.main", gap: 1 }}>
                <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
                Delete
            </MenuItem>
        </Menu>
    );
}
