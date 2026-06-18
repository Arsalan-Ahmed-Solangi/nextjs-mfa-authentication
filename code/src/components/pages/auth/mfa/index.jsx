"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, CircularProgress, Typography } from "@mui/material";
import toast from "react-hot-toast";

import FormContainer from "@/components/ui/forms/FormContainer";
import FormInput from "@/components/ui/forms/FormInput";
import FormButton from "@/components/ui/forms/FormButton";
import AxiosClassLib from "@/lib/AxiosClass.lib";
import Image from "next/image";
import theme from "@/theme/theme";
import COLORS from "@/theme/colors";

const DEFAULT_INPUTS = {
  secret: "",
  qr_code: "",
  otp: "",
  user_id: "",
};

const MFA = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");

  useEffect(() => {
    if (userId) {
      initializeMFA();
    }
  }, [userId]);

  const initializeMFA = async () => {
    try {
      const res = await AxiosClassLib.post("auth/mfa/generate", {
        user_id: userId,
      });
      setInputs((prev) => ({
        ...prev,
        qr_code: res.data.qr_code,
        secret: res.data.secret,
        user_id: userId,
      }));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);

    try {
      const res = await AxiosClassLib.post("auth/mfa/verify", inputs);
      toast.success(res.message);
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography align="center" variant="h5" sx={{ color: COLORS.primary }}>
        Multi-Factor Authentication
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {inputs.qr_code && (
            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                gap: 2,
              }}
            >
              <Typography variant="body2">
                Scan QR using Google Authenticator
              </Typography>

              <Image src={inputs.qr_code} width={150} height={150} alt="QR" />
            </Box>
          )}
        </>
      )}

      <FormContainer label="Authenticator Code">
        <FormInput
          placeholder="223123"
          value={inputs.otp}
          type="number"
          onChange={(e) =>
            setInputs((prev) => ({ ...prev, otp: e.target.value }))
          }
        />
      </FormContainer>

      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FormButton onClick={handleVerify}>Verify</FormButton>
      </Box>
    </Box>
  );
};

export default MFA;
