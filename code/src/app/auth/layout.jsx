"use client";
import { Box, Card } from "@mui/material";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({ children }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          minHeight: "90vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: 400, padding: 3, boxShadow: 3 }}>{children}</Card>
      </Box>

      <Toaster toastOptions={{ style: { fontSize: 14 } }} />
    </>
  );
}
