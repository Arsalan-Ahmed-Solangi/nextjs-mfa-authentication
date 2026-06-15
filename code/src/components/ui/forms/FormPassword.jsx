"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const FormPassword = ({ name, value = "", onChange, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      size="small"
      fullWidth
      type={showPassword ? "text" : "password"}
      name={name}
      value={value}
      onChange={onChange}
      {...props}
      sx={{
        "& .MuiInputBase-input::placeholder": {
          fontSize: "14px",
        },
      }}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <VisibilityOff sx={{ fontSize: "14px" }} /> : <Visibility sx={{ fontSize: "14px" }} />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default FormPassword;
