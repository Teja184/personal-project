import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FiltersSection } from "./FiltersSection";
import { ExpenseTable } from "./ExpenseTable";
import { useNavigate } from "react-router";

export function ExpenseDashboard() {
  const [filters, setFilters] = useState({
    dateRange: { from: null, to: null },
    category: "",
    vendor: "",
    search: "",
  });

  const navigate = useNavigate();

  const handleAddExpense = () => {
    navigate("/expense/add", { state: { action: "add" } });
  };

  const handleExport = (format: "csv" | "pdf") => {
    // Implement export functionality
    console.log(`Exporting as ${format}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Expense Dashboard</h1>
        <Button onClick={handleAddExpense}>Add Expense</Button>
      </div>

      <FiltersSection filters={filters} setFilters={setFilters} />

      <ExpenseTable filters={filters} />

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => handleExport("csv")}>
          Export CSV
        </Button>
        <Button variant="outline" onClick={() => handleExport("pdf")}>
          Export PDF
        </Button>
      </div>
    </div>
  );
}
