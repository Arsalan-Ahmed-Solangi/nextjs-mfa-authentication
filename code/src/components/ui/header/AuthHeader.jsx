import COLORS from "@/theme/colors";
import { Box, Typography } from "@mui/material";

const AuthHeader = ({title,desc}) => {
  return (
    <Box  sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent:"center",
        mb: 4,
      }}>
      <Typography variant="h6" fontWeight="bold" sx={{ color: COLORS.primary, mb: 1 }}>
        {title}
      </Typography>
        <Typography variant="caption" align="center" sx={{ color: COLORS.textSecondary }}>
          {desc}
        </Typography>
    </Box>
  );
};

export default AuthHeader;
