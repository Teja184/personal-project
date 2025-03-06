import { Inventory } from "@/types"
import { apiClient } from "./apiClient"

export interface InventoryResponse {
    invetory_id: number;
    current_stock: number;
    last_updated: string;
    product:{
        product_id: number;
        name: string;
        u_o_m: string;
    }
    category:{
        category_name: string;
    }
    status: "Low" | "Out of Stock" | "Sufficient";
}

export interface PostInventory {
    product_name: string;
    unit_of_measure: string;
    category_name: string;
    current_stock: number;    
}

interface GetInventoryFilters {
    category: string,
    stockStatus: string,
    search: string,
}

export const getAllInventories = async (filters: GetInventoryFilters)    => {
    const resp = await  apiClient.get<InventoryResponse[]>("/inventory", {
        params: filters
    })

    return resp.data
}

export const addNewInventory  = async (inventory: PostInventory) => {
    const resp = await apiClient.post<InventoryResponse>("/inventory", inventory)

    return resp.data
}