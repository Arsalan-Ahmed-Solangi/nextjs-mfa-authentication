"use client";

import { Box, Button, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const Dashboard= () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    router.replace("/auth/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 4,
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: 700,
          }}
        >
          Dashboard
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 4,
          }}
        >
          Welcome! MFA authentication completed successfully.
        </Typography>

        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Paper>
    </Box>
  );
};

export default Dashboard;
