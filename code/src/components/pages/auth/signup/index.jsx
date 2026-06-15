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
  name: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const router = useRouter();

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const gotoLogin = () => {
    return router.push(ROUTES.auth.login);
  };

  const handleSubmit = async () => {
    try {
      if (!inputs.name) {
        throw new Error(`Name is required!`);
      }

      if (!inputs.email) {
        throw new Error(`Email is required!`);
      }

      if (!inputs.password) {
        throw new Error(`Password is required!`);
      }

      const res = await AxiosClassLib.post("/auth/signup", inputs);
      toast.success(res.message);
      gotoLogin();
    } catch (err) {
      console.log(`~ERROR handleSubmit ${err.message}`);
      toast.error(err.message);
    }
  };

  return (
    <Box>
      <AuthHeader
        title="Create Your Account"
        desc="Get started with secure authentication and manage your digital identity."
      />
      <FormContainer label="Name" required={true}>
        <FormInput
          name="name"
          placeholder="Enter your name"
          fullWidth
          onChange={handleInputs}
          value={inputs.name}
        />
      </FormContainer>
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
        <Typography variant="caption">Already have an account?</Typography>

        <Typography
          variant="caption"
          sx={{
            color: "primary.main",
            cursor: "pointer",
            fontWeight: 600,
          }}
          onClick={gotoLogin}
        >
          Login
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FormButton onClick={handleSubmit}>Signup</FormButton>{" "}
      </Box>
    </Box>
  );
};

export default Signup;
