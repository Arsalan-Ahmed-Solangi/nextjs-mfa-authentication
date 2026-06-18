import jwt from "jsonwebtoken";
import ENVConfig from "@/config/env.config";

class JWTClassLib {
  static generate(payload) {
    return jwt.sign(payload, ENVConfig.JWT_SECRET, {
      expiresIn: ENVConfig.JWT_EXPIRES_IN,
    });
  }

  static verify(token) {
    return jwt.verify(token, ENVConfig.JWT_SECRET);
  }
}

export default JWTClassLib;
