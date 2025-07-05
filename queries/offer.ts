import api from "@/providers/axios";
import { Offer } from "@/types/types";

export default class OfferQuery {
  route = "/offers";
  create = async (data: Omit<Offer, "id">) =>
    api.post(`${this.route}`, data).then((res) => res.data);
  getAll = async () => api.get(`${this.route}`).then((res) => res.data);
  getOne = async (id: number) =>
    api.get(`${this.route}/${id}`).then((res) => res.data);
  update = async (id: number, data: Partial<Omit<Offer, "id">>) =>
    api.put(`${this.route}/${id}`, data).then((res) => res.data);
  delete = async (id: number) =>
    api.delete(`${this.route}/${id}`).then((res) => res.data);
}
