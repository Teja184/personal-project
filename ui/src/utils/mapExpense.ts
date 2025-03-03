import { Expense } from "@/types";
import { ExpenseResponse } from "@/api/expenseApi";

export const mapExpenses = (data: ExpenseResponse[]): Expense[] => {
  return data.map((item) => ({
    id: String(item.id),
    productTitle: item.product_title,
    vendor: item.vendor,
    unitPrice: parseFloat(item.unit_price),
    purchaseUnit: parseFloat(item.purchace_unit),
    totalPrice: parseFloat(item.total_price),
    purchaseDate: new Date(item.purchace_date).toLocaleString(),
  }));
};
