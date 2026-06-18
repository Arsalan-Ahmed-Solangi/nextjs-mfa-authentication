import TimeHelper from "@/helpers/time.helper";
import CookieClassLib from "@/lib/CookieClass.lib";
import DatabaseClassLib from "@/lib/DatabaseClass.lib";
import JWTClassLib from "@/lib/JWTClass.lib";

class AuthController {
  static login = async (body) => {
    try {
      const { email, password } = body;
      const res = await DatabaseClassLib.executeQuery({
        query: `SELECT * FROM users WHERE email = ? AND password = ?`,
        values: [email, password],
      });

      if (!res.length) {
        throw new Error(`Wrong credentials!`);
      }

      const mfaEnabled = res[0].mfa_enabled === 1;

      if (mfaEnabled) {
        return {
          message:
            "MFA is enabled for this account. Please complete MFA verification to proceed.",
          mfa_enabled: true,
          user_id: res[0].user_id,
        };
      }

      const token = JWTClassLib.generate({
        user_id: res[0].user_id,
        email: res[0].email,
      });

      await CookieClassLib.setAuthToken(token);

      return { message: "Login successful" };
    } catch (err) {
      console.log(`~ERROR AuthController.login ${err.message}`);
      throw new Error(err.message);
    }
  };

  static signup = async (body) => {
    try {
      const { name, email, password } = body;
      const dateTime = TimeHelper.now();

      const res = await DatabaseClassLib.executeQuery({
        query: `SELECT * FROM users WHERE email = ?`,
        values: [email],
      });

      if (res.length) {
        throw new Error(`Email is aleady registered!`);
      }

      const query = `INSERT INTO users (name,email,password,mfa_enabled,created_at) VALUES (?,?,?,?,?)`;
      await DatabaseClassLib.executeQuery({
        query: query,
        values: [name, email, password, 1, dateTime],
      });

      return { message: "Signup  successfull" };
    } catch (err) {
      console.log(`~ERROR AuthController.signup ${err.message}`);
      throw new Error(err.message);
    }
  };
}

export default AuthController;
