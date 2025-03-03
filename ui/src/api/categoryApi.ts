import { Category } from "@/types";
import { apiClient } from "./apiClient"


export interface CategoryResponse {
    id: number;
    category_name: string;
}


export const getAllCategories = async (): Promise<Category[]> => {
    const resp = await apiClient.get<CategoryResponse[]>("/category")
    return resp.data.map((e) => {
        return {
            id: e.id,
            categoryName: e.category_name
        }
    })
}