"use client";
import FormButton from "@/components/ui/forms/FormButton";
import FormContainer from "@/components/ui/forms/FormContainer";
import FormInput from "@/components/ui/forms/FormInput";
import FormPassword from "@/components/ui/forms/FormPassword";
import AuthHeader from "@/components/ui/header/AuthHeader";
import ROUTES from "@/constants/routes.constant";
import AxiosClassLib from "@/lib/AxiosClass.lib";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const DEFAULT_INPUTS = {
  email: "",
  password: "",
};

const Login = () => {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const router = useRouter();

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const gotoSignup = () => {
    return router.push(ROUTES.auth.signup);
  };

  const gotoMFA = (userId) => {
    return router.push(`${ROUTES.auth.mfa}?user_id=${userId}`);
  };

  const handleSubmit = async () => {
    try {
      if (!inputs.email) {
        throw new Error(`Email is required!`);
      }

      if (!inputs.password) {
        throw new Error(`Password is required!`);
      }

      const res = await AxiosClassLib.post("auth/login", inputs);
      toast.success(res.message);

      if (res.mfa_enabled) {
        gotoMFA(res.user_id);
      }
    } catch (err) {
      console.log(`~ERROR handleSubmit ${err.message}`);
      toast.error(err.message);
    }
  };

  return (
    <Box>
      <AuthHeader
        title="Login to Your Account"
        desc="Access your secure account and manage your digital identity."
      />

      <FormContainer label="Email Address" required={true}>
        <FormInput
          name="email"
          placeholder="Enter your email"
          fullWidth
          onChange={handleInputs}
          value={inputs.email}
        />
      </FormContainer>
      <FormContainer label="Password" required={true}>
        <FormPassword
          name="password"
          placeholder="Enter your password"
          value={inputs.password}
          onChange={handleInputs}
        />
      </FormContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 0.5,
          mt: 2,
        }}
      >
        <Typography variant="caption">Don't have an account?</Typography>

        <Typography
          variant="caption"
          sx={{
            color: "primary.main",
            cursor: "pointer",
            fontWeight: 600,
          }}
          onClick={gotoSignup}
        >
          Signup
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FormButton onClick={handleSubmit}>Login</FormButton>
      </Box>
    </Box>
  );
};

export default Login;
