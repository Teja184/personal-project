import { data } from "react-router";
import { apiClient } from "./apiClient"

export interface ExpenseResponse {
    id: number;
    product_id: number;
    product_title: string;
    purchace_date: string;
    purchace_unit: string;
    total_price: string;
    unit_price: string;
    vendor: string;
}

export interface PostExense {
    product_id: number;
    product_title: string;
    p_unit: number;
    total_price: number;
    unit_price: number;
    vendor: string;
    
}

interface GetExpenseFilters {
    category: string,
    vendor: string,
    search: string,
}

// getting all the expenses
export const getAllExpenses = async (filters: GetExpenseFilters)    => {
    const resp = await  apiClient.get<ExpenseResponse[]>("/expenses", {
        params: filters
    })

    return resp.data
}


// add a new expense
export const addNewExpense  = async (expense: PostExense) => {
    const resp = await apiClient.post<ExpenseResponse>("/expenses", expense)

    return resp.data
}