import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VendorFilters } from "./VendorFilters";
import { VendorTable } from "./VendorTable";
import { AddEditVendorModal } from "./AddEditVendorModal";
import { useToast } from "@/hooks/use-toast";

export function VendorManagement() {
  const [isAddVendorModalOpen, setIsAddVendorModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
  });
  const { toast } = useToast();

  const handleAddVendor = () => {
    setIsAddVendorModalOpen(true);
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
        <h1 className="text-3xl font-bold">Vendor Management</h1>
        <Button onClick={handleAddVendor}>Add Vendor</Button>
      </div>

      <VendorFilters filters={filters} setFilters={setFilters} />

      <VendorTable filters={filters} />

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => handleExport("csv")}>
          Export CSV
        </Button>
        <Button variant="outline" onClick={() => handleExport("pdf")}>
          Export PDF
        </Button>
      </div>

      <AddEditVendorModal
        isOpen={isAddVendorModalOpen}
        onClose={() => setIsAddVendorModalOpen(false)}
      />
    </div>
  );
}
