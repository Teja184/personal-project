import { Product } from "@/types";
import { apiClient } from "./apiClient"


export interface ProductResponse {
    id: number;
    name: string;
    u_o_m: string;
    category: string;
    status: "1" | "0";
}

export interface PostProduct {
    product_name: string;
    unit_of_measure: string;
    cat_id: number;
    active_status: boolean;    
}

interface GetProductFilters {
    category: string,
    status: string,
    search: string,
}

export const getAllProducts = async (filters: GetProductFilters)    => {
    const resp = await  apiClient.get<ProductResponse[]>("/products", {
        params: filters
    })

    return resp.data
}

export const addNewProduct  = async (product: PostProduct) => {
    const resp = await apiClient.post<ProductResponse>("/products", product)

    return resp.data
}
