import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InventoryFilters } from "./InventoryFilters";
import { InventoryTable } from "./inventoryTable";
import { AddEditInventoryModal } from "./AddEditInventoryModal";
import { StockAlertsSection } from "./StockAlertsSection";
import { SummaryCards } from "./SummaryCards";
import { useToast } from "@/hooks/use-toast";
import { getAllCategories } from "@/api/categoryApi";
import { Category } from "@/types";

export function InventoryDashboard() {
  const [isAddInventoryModalOpen, setIsAddInventoryModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    stockStatus: "",
    search: "",
  });
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getAllCategories().then((e) => {
      setCategories(e);
    });
  }, []);

  const handleAddInventory = () => {
    setIsAddInventoryModalOpen(true);
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
        <h1 className="text-3xl font-bold">Inventory Dashboard</h1>
        <Button onClick={handleAddInventory}>Add Inventory</Button>
      </div>

      <SummaryCards />

      <InventoryFilters filters={filters} setFilters={setFilters} categories={categories} />

      <StockAlertsSection />

      <InventoryTable filters={filters} />

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => handleExport("csv")}>
          Export CSV
        </Button>
        <Button variant="outline" onClick={() => handleExport("pdf")}>
          Export PDF
        </Button>
      </div>

      <AddEditInventoryModal
        isOpen={isAddInventoryModalOpen}
        onClose={() => setIsAddInventoryModalOpen(false)}
        categories={categories}
      />
    </div>
  );
}
