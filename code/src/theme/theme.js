import { createTheme } from "@mui/material/styles";
import COLORS from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary,
    },
  },
    components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: COLORS.textSecondary,
            },

          "& .MuiInputLabel-root.Mui-focused": {
            color: COLORS.textSecondary,
          },
        },
      },
    },
  },
});

export default theme;