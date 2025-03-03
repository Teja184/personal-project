"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProductTable } from "./ProductTable";
import { ProductFilters } from "./ProductFilters";
import { AddEditProductModal } from "./AddEditProductModal";
import { useToast } from "../hooks/use-toast";
import { getAllCategories } from "@/api/categoryApi";
import { Category } from "@/types";

export function ProductManagement() {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    search: "",
  });
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getAllCategories().then((e) => {
      setCategories(e);
    });
  }, []);

  const handleAddProduct = () => {
    setIsAddProductModalOpen(true);
  };

  const handleExport = (format: "csv" | "pdf") => {
    // Implement export functionality
    console.log(`Exporting as ${format}`);
    toast({
      title: "Export initiated",
      description: `Your ${format.toUpperCase()} export has started.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Button onClick={handleAddProduct}>Add Product</Button>
      </div>

      <ProductFilters
        filters={filters}
        setFilters={setFilters}
        categories={categories}
      />

      <ProductTable filters={filters} />

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => handleExport("csv")}>
          Export CSV
        </Button>
        <Button variant="outline" onClick={() => handleExport("pdf")}>
          Export PDF
        </Button>
      </div>

      <AddEditProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        categories={categories}
      />
    </div>
  );
}
