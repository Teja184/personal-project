import { Inventory } from "@/types";
import { InventoryResponse } from "@/api/inventoryApi";

export const mapInventory = (data: InventoryResponse[]): Inventory[] => {
  return data.map((item) => ({
    id: String(item.invetory_id),
    productName: item.product.name,
    unitOfMeasure: item.product.u_o_m,
    category: item.category.category_name,
    stockQuantity: item.current_stock,
    stockStatus: item.status,
  }));
};