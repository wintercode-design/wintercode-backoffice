import api from "@/providers/axios";
import { Subscriber } from "@/types/types";

export default class NewsletterQuery {
  route = "/subscribers";
  create = async (data: Omit<Subscriber, "id">) =>
    api.post(`${this.route}`, data).then((res) => res.data);
  getAll = async () => api.get(`${this.route}`).then((res) => res.data);
  getOne = async (id: number) =>
    api.get(`${this.route}/${id}`).then((res) => res.data);
  update = async (id: number, data: Partial<Omit<Subscriber, "id">>) =>
    api.put(`${this.route}/${id}`, data).then((res) => res.data);
  delete = async (id: number) =>
    api.delete(`${this.route}/${id}`).then((res) => res.data);
}
