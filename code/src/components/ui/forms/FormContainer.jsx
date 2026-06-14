"use client"
import React from "react";
import { Box, Typography } from "@mui/material";

const FormContainer = ({ label, required = false, children }) => {
  return (
    <Box sx={{ mb: 1, width: "100%" }}>
      {label && (
        <Typography
          variant="caption"
          sx={{

            
            color: "text.secondary",
          }}
        >
          {label}

          {required && (
            <Typography component="span" color="error" sx={{ ml: 0.5 }}>
              *
            </Typography>
          )}
        </Typography>
      )}

      {children}
    </Box>
  );
};

export default FormContainer;
