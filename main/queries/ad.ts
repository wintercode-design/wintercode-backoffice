import AxiosConfig from "@/providers/axios";
import { AdsT } from "@/types/types";
import { AxiosInstance } from "axios";

export default class AdQuery {
  route = "/ads";
  api: AxiosInstance;
  constructor(baseURL: string) {
    this.api = new AxiosConfig(baseURL).api;
  }
  create = async (data: Omit<AdsT, "id">) =>
    this.api.post(`${this.route}`, data).then((res) => res.data);
  getAll = async () => this.api.get(`${this.route}`).then((res) => res.data);
  getOne = async (id: number) =>
    this.api.get(`${this.route}/${id}`).then((res) => res.data);
  update = async (id: number, data: Partial<Omit<AdsT, "id">>) =>
    this.api.put(`${this.route}/${id}`, data).then((res) => res.data);
  delete = async (id: number) =>
    this.api.delete(`${this.route}/${id}`).then((res) => res.data);
}
