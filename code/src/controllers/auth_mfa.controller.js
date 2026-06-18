import DatabaseClassLib from "@/lib/DatabaseClass.lib";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import JWTClassLib from "@/lib/JWTClass.lib";
import CookieClassLib from "@/lib/CookieClass.lib";
class AuthMFAController {
  static generate = async (body) => {
    try {
      const { user_id } = body;
      const queryResult = await DatabaseClassLib.executeQuery({
        query: `SELECT * FROM users WHERE user_id = ?`,
        values: [user_id],
      });

      if (!queryResult.length) {
        throw new Error(`User not found!`);
      }

      const user = queryResult[0];
      const data = {
        secret: "",
        qr_code: "",
        user_id: user.user_id,
      };
      if (user.mfa_secret) {
        data.secret = user.mfa_secret;
      } else {
        const secret = speakeasy.generateSecret({
          name: `Next JS MFA App (${user.email})`,
        });
        data.secret = secret.base32;
        data.qr_code = await QRCode.toDataURL(secret.otpauth_url);
      }
      return { message: "MFA generate setup", data: data };
    } catch (err) {
      throw new Error(err.message);
    }
  };

  static verify = async (body) => {
    try {
      console.log("VERIF", body);
      const { user_id, otp, secret } = body;

      const queryResult = await DatabaseClassLib.executeQuery({
        query: `SELECT * FROM users WHERE user_id = ?`,
        values: [user_id],
      });

      if (!queryResult.length) {
        throw new Error("User not found!");
      }

      const user = queryResult[0];

      const verified = speakeasy.totp.verify({
        secret: user.mfa_secret || secret,
        encoding: "base32",
        token: otp,
        window: 1,
      });

      if (!verified) {
        throw new Error("Invalid authenticator code!");
      }

      if (!user.mfa_secret) {
        await DatabaseClassLib.executeQuery({
          query: `UPDATE users SET mfa_secret = ? WHERE user_id = ?`,
          values: [secret, user_id],
        });
      }

      const token = JWTClassLib.generate({
        user_id: user.user_id,
        email: user.email,
      });

      await CookieClassLib.setAuthToken(token);

      return {
        message: "Login Successfull! MFA verification completed.",
        data: {
          user_id,
        },
      };
    } catch (err) {
      throw new Error(err.message);
    }
  };
}

export default AuthMFAController;
