import axios from "@/providers/axios";

export class AuthQuery {
  route = "/auth";
  async login(data: { email: string; password: string }) {
    const res = await axios.post(`${this.route}/login`, data);
    return res.data;
  }

  async register(data: { name: string; email: string; password: string }) {
    const res = await axios.post(`${this.route}/register`, data);
    return res.data;
  }

  async forgotPassword(data: { email: string }) {
    const res = await axios.post(`${this.route}/forgot-password`, data);
    return res.data;
  }

  async resetPassword(data: { token: string; password: string }) {
    const res = await axios.post(`${this.route}/reset-password`, data);
    return res.data;
  }
}

export default AuthQuery;
