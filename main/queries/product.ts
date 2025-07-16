import AxiosConfig from "@/providers/axios";
import { Product } from "@/types/types";
import { AxiosInstance } from "axios";
import { toast } from "react-toastify";

export default class ProductQuery {
  route = "/products";
  api: AxiosInstance;
  constructor(baseURL: string) {
    this.api = new AxiosConfig(baseURL).api;
  }
  create = async (data: Omit<Product, "id">): Promise<Product> => {
    return this.api.post(`${this.route}`, data).then((response) => {
      toast.success(`created ${response.data.product.name} successfully`);
      return response.data;
    });
  };

  getAll = async (): Promise<Product[]> => {
    return this.api.get(`${this.route}`).then((response) => {
      return response.data;
    });
  };

  getOne = async (id: number): Promise<Product> => {
    return this.api
      .get(`${this.route}/${id}`)
      .then((response) => response.data);
  };

  getOneBySlug = async (slug: string): Promise<Product> => {
    return this.api
      .get(`${this.route}/slug/${slug}`)
      .then((response) => response.data);
  };

  update = async (
    id: number,
    data: Partial<Omit<Product, "id">> & { categoryId?: number }
  ): Promise<Product> => {
    return this.api
      .put(`${this.route}/${id}`, data)
      .then((response) => response.data);
  };

  delete = async (id: number): Promise<Product> => {
    return this.api
      .delete(`${this.route}/${id}`)
      .then((response) => response.data);
  };
}
