import { Product } from "@/types";
import { ProductResponse } from "@/api/productApi";

export const mapProducts = (data: ProductResponse[]): Product[] => {
  return data.map((item) => ({
    id: String(item.id),
    name: item.name,
    unitOfMeasure: item.u_o_m,
    category: item.category,
    status: item.status,
  }));
};