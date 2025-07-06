import api from "@/providers/axios";
import { Quote } from "@/types/types";

export default class QuoteQuery {
  route = "/quotes";
  create = async (data: Omit<Quote, "id">) =>
    api.post(`${this.route}`, data).then((res) => res.data);
  getAll = async () => api.get(`${this.route}`).then((res) => res.data);
  getOne = async (id: number) =>
    api.get(`${this.route}/${id}`).then((res) => res.data);
  update = async (id: number, data: Partial<Omit<Quote, "id">>) =>
    api.put(`${this.route}/${id}`, data).then((res) => res.data);
  delete = async (id: number) =>
    api.delete(`${this.route}/${id}`).then((res) => res.data);
}
