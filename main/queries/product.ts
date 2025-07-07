import api from "@/providers/axios";
import { Product } from "@/types/types";
import { toast } from "react-toastify";

export default class ProductQuery {
  route = "/products";
  create = async (data: Omit<Product, "id">): Promise<Product> => {
    return api.post(`${this.route}`, data).then((response) => {
      toast.success(`created ${response.data.product.name} successfully`);
      return response.data;
    });
  };

  getAll = async (): Promise<Product[]> => {
    return api.get(`${this.route}`).then((response) => {
      return response.data;
    });
  };

  getOne = async (id: number): Promise<Product> => {
    return api.get(`${this.route}/${id}`).then((response) => response.data);
  };

  getOneBySlug = async (slug: string): Promise<Product> => {
    return api
      .get(`${this.route}/slug/${slug}`)
      .then((response) => response.data);
  };

  update = async (
    id: number,
    data: Partial<Omit<Product, "id">> & { categoryId?: number }
  ): Promise<Product> => {
    return api
      .put(`${this.route}/${id}`, data)
      .then((response) => response.data);
  };

  delete = async (id: number): Promise<Product> => {
    return api.delete(`${this.route}/${id}`).then((response) => response.data);
  };
}
