"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import toast from "react-hot-toast";

import FormContainer from "@/components/ui/forms/FormContainer";
import FormInput from "@/components/ui/forms/FormInput";
import FormButton from "@/components/ui/forms/FormButton";
import AxiosClassLib from "@/lib/AxiosClass.lib";

const MFA = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const userId = searchParams.get("userId");

  const [qr, setQr] = useState("");
  const [otp, setOtp] = useState("");
  const [isSetup, setIsSetup] = useState(false);

  useEffect(() => {
    initializeMFA();
  }, []);

  const initializeMFA = async () => {
    try {
      const res = await AxiosClassLib.post("auth/mfa/setup", {
        userId,
      });

      if (res.setup_required) {
        setQr(res.qr);
        setIsSetup(true);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleVerify = async () => {
    try {
      const res = await AxiosClassLib.post("auth/mfa/verify", {
        userId,
        otp,
      });

      localStorage.setItem("token", res.token);

      toast.success("Login successful");

      router.push("/dashboard");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Box>
      <Typography variant="h5">Multi-Factor Authentication</Typography>

      {!isSetup && (
        <>
          <Typography sx={{ mt: 2 }}>
            Scan QR using Google Authenticator
          </Typography>

          <img src={qr} width={220} height={220} alt="QR" />
        </>
      )}

      <FormContainer label="Authenticator Code">
        <FormInput
          placeholder="123456"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </FormContainer>

      <FormButton onClick={handleVerify}>Verify</FormButton>
    </Box>
  );
};

export default MFA;
