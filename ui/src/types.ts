export type Expense = {
  id: string;
  productTitle: string;
  vendor: string;
  unitPrice: number;
  purchaseUnit: number;
  totalPrice: number;
  purchaseDate: string;
};

export type Category = {
  categoryName: string;
  id: number;
}

export type Product = {
   id: string;
   name: string;
   unitOfMeasure: string;
   status: "1" | "0";
   category: string;
}

export type Inventory = {
  id: string;
  productName: string;
  category: string;
  stockQuantity: number;
  unitOfMeasure: string;
  stockStatus: "Low" | "Out of Stock" | "Sufficient";
}