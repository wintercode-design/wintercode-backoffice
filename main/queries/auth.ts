import AxiosConfig from "@/providers/axios";
import { AxiosInstance } from "axios";

export class AuthQuery {
  route = "/auth";
  api: AxiosInstance;
  constructor(baseURL: string) {
    this.api = new AxiosConfig(baseURL).api;
  }
  async login(data: { email: string; password: string }) {
    const res = await this.api.post(`${this.route}/login`, data);
    return res.data;
  }

  async register(data: { name: string; email: string; password: string }) {
    const res = await this.api.post(`${this.route}/register`, data);
    return res.data;
  }

  async forgotPassword(data: { email: string }) {
    const res = await this.api.post(`${this.route}/forgot-password`, data);
    return res.data;
  }

  async resetPassword(data: { token: string; password: string }) {
    const res = await this.api.post(`${this.route}/reset-password`, data);
    return res.data;
  }
}

export default AuthQuery;
