import ENVConfig from "@/config/env.config";
import axios from "axios";

class AxiosClassLib {
  static axios = axios.create({
    baseURL: ENVConfig.API_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  static handleError(err) {
    throw new Error(
      err?.response?.data?.message || err?.message || "Something went wrong",
    );
  }

  static async get(url, config = {}) {
    try {
      const response = await this.axios.get(url, config);
      return response.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  static async post(url, data = {}, config = {}) {
    try {
      const response = await this.axios.post(url, data, config);

      return response.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  static async put(url, data = {}, config = {}) {
    try {
      const response = await this.axios.put(url, data, config);

      return response.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  static async delete(url, config = {}) {
    try {
      const response = await this.axios.delete(url, config);

      return response.data;
    } catch (err) {
      this.handleError(err);
    }
  }
}

export default AxiosClassLib;
