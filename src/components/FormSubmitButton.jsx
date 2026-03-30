import { Button } from "@mui/material";

/** Primary submit for form dialogs; each page passes onClick + disabled + label. */
export function FormSubmitButton({ children, disabled, onClick, minWidth = 200 }) {
    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            variant="contained"
            disableElevation
            color="primary"
            sx={{
                fontSize: "15px",
                fontWeight: 600,
                borderRadius: "8px",
                px: 3,
                py: 1.25,
                minWidth,
                "&.Mui-disabled": {
                    backgroundColor: "rgba(47, 47, 47, 0.12)",
                    color: "rgba(47, 47, 47, 0.35)",
                },
            }}
        >
            {children}
        </Button>
    );
}
