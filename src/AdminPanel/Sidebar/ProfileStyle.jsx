import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';




export const newIncomeTextfield = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#EFEFEF", // Set border color
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#EFEFEF", // Border color on hover
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#EFEFEF", // Border color when focused
    },
  },
};


