import { createTheme } from "@mui/material/styles";

const primaryMain = "#F36100";
const primaryDark = "#d95600";
const textPrimary = "#2F2F2F";
const textMuted = "#848286";

export const appTheme = createTheme({
    palette: {
        primary: {
            main: primaryMain,
            dark: primaryDark,
        },
        text: {
            primary: textPrimary,
            secondary: textMuted,
        },
        error: {
            main: "#ED4040",
        },
    },
    typography: {
        fontFamily: '"Inter", sans-serif',
    },
    components: {
        MuiTypography: {
            defaultProps: {
                fontFamily: "Inter",
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: "Inter",
                    textTransform: "none",
                },
            },
        },
    },
});
