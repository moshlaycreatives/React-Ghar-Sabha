import { Menu, MenuItem } from "@mui/material";

/** Shared edit/delete menu for resource cards; each page wires onClose + future API. */
export function CardOptionsMenu({ anchorEl, open, onClose }) {
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
            <MenuItem onClick={onClose} sx={{ fontSize: 14 }}>
                Edit
            </MenuItem>
            <MenuItem onClick={onClose} sx={{ fontSize: 14, color: "error.main" }}>
                Delete
            </MenuItem>
        </Menu>
    );
}
