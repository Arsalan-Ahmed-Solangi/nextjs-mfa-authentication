import ENVConfig from "@/config/env.config";
import mysql from "mysql2/promise";

class DatabaseClassLib {
  static pool;

  static dbConnection = async () => {
    try {
      if (!this.pool) {
        this.pool = mysql.createPool({
          host: ENVConfig.DB_HOST,
          user: ENVConfig.DB_USER,
          password: ENVConfig.DB_PASS,
          database: ENVConfig.DB_NAME,
          waitForConnections: true,
          connectionLimit: 20,
          queueLimit: 0,
          enableKeepAlive: true,
          keepAliveInitialDelay: 0,
        });

      }

      return await this.pool.getConnection();
    } catch (err) {
      throw new Error(err.message);
    }
  };

  static executeQuery = async ({ query, values = [] }, connection = null) => {
    const conn = connection || (await this.dbConnection());

    try {
      const [results] = await conn.execute(query, values);
      return results;
    } catch (err) {
      throw new Error(err.message);
    } finally {
      if (!connection && conn) {
        conn.release();
      }
    }
  };

  static bulkInsert = async ({ query, values = [] }, connection = null) => {
    const conn = connection || (await this.dbConnection());

    try {
      const [results] = await conn.query(query, [values]);
      return results;
    } catch (err) {
      throw new Error(err.message);
    } finally {
      if (!connection && conn) {
        conn.release();
      }
    }
  };

  static startTransaction = async () => {
    const connection = await this.dbConnection();
    await connection.beginTransaction();

    return connection;
  };

  static commitTransaction = async (connection) => {
    try {
      await connection.commit();
    } finally {
      connection.release();
    }
  };

  static rollBackTransaction = async (connection) => {
    try {
      await connection.rollback();
    } finally {
      connection.release();
    }
  };

  static checkExists = async (table, column, value) => {
    try {
      const query = `
        SELECT COUNT(*) AS Count
        FROM ${table}
        WHERE ${column} = ?
      `;

      const result = await this.executeQuery({
        query,
        values: [value],
      });

      return result[0].Count > 0;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  static close = async () => {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
    }
  };
}

export default DatabaseClassLib;
