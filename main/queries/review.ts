import AxiosConfig from "@/providers/axios";
import { Review } from "@/types/types";
import { AxiosInstance } from "axios";

export default class ReviewQuery {
  route = "/reviews";
  api: AxiosInstance;
  constructor(baseURL: string) {
    this.api = new AxiosConfig(baseURL).api;
  }
  create = async (data: Omit<Review, "id">) =>
    this.api.post(`${this.route}`, data).then((res) => res.data);
  getAll = async () => this.api.get(`${this.route}`).then((res) => res.data);
  getOne = async (id: number) =>
    this.api.get(`${this.route}/${id}`).then((res) => res.data);
  update = async (id: number, data: Partial<Omit<Review, "id">>) =>
    this.api.put(`${this.route}/${id}`, data).then((res) => res.data);
  delete = async (id: number) =>
    this.api.delete(`${this.route}/${id}`).then((res) => res.data);
}
