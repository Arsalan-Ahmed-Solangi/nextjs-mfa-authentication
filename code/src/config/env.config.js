class ENVConfig {
  static DB_HOST = process.env.DB_HOST;
  static DB_PORT = process.env.DB_PORT;
  static DB_NAME = process.env.DB_NAME;
  static DB_USER = process.env.DB_USER;
  static DB_PASSWORD = process.env.DB_PASSWORD;
  static JWT_SECRET = process.env.JWT_SECRET;
  JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
}

export default ENVConfig;
