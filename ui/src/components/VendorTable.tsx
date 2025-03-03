import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AddEditVendorModal } from "./AddEditVendorModal";
import { useToast } from "@/hooks/use-toast";

type Vendor = {
  id: string;
  name: string;
  contactInfo: string;
  address: string;
  associatedProducts: string[];
  status: "active" | "inactive";
};

type VendorTableProps = {
  filters: {
    search: string;
    category: string;
  };
};

export function VendorTable({ filters }: VendorTableProps) {
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: "1",
      name: "Acme Foods",
      contactInfo: "contact@acmefoods.com",
      address: "123 Main St, Anytown, USA",
      associatedProducts: ["Flour", "Sugar"],
      status: "active",
    },
    {
      id: "2",
      name: "Disposable Supplies Co.",
      contactInfo: "info@disposablesupplies.com",
      address: "456 Oak Rd, Somewhere, USA",
      associatedProducts: ["Paper Cups", "Napkins"],
      status: "active",
    },
    {
      id: "3",
      name: "Kitchen Equipment Ltd.",
      contactInfo: "sales@kitchenequipment.com",
      address: "789 Maple Ave, Elsewhere, USA",
      associatedProducts: ["Mixer", "Oven"],
      status: "inactive",
    },
  ]);

  const [sorting, setSorting] = useState({ column: "", direction: "asc" });
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const { toast } = useToast();

  const handleSort = (column: string) => {
    const direction =
      sorting.column === column && sorting.direction === "asc" ? "desc" : "asc";
    setSorting({ column, direction });
    // Implement sorting logic here
  };

  const handleEdit = (vendor: Vendor) => {
    setEditingVendor(vendor);
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    setVendors(vendors.filter((vendor) => vendor.id !== id));
    toast({
      title: "Vendor deleted",
      description: "The vendor has been successfully deleted.",
    });
  };

  const handleViewDetails = (id: string) => {
    // Implement view details functionality
    toast({
      title: "View details",
      description: "Vendor details view to be implemented.",
    });
  };

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.category === "" ||
        vendor.associatedProducts.some((product) =>
          product.toLowerCase().includes(filters.category.toLowerCase())
        ))
  );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">
              <Button variant="ghost" onClick={() => handleSort("name")}>
                Vendor Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Contact Information</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Associated Products</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell className="font-medium">{vendor.name}</TableCell>
              <TableCell>{vendor.contactInfo}</TableCell>
              <TableCell>{vendor.address}</TableCell>
              <TableCell>{vendor.associatedProducts.join(", ")}</TableCell>
              <TableCell>
                <Badge
                  variant={vendor.status === "active" ? "default" : "secondary"}
                >
                  {vendor.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleEdit(vendor)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(vendor.id)}>
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleViewDetails(vendor.id)}
                    >
                      View Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddEditVendorModal
        isOpen={!!editingVendor}
        onClose={() => setEditingVendor(null)}
        vendor={editingVendor}
      />
    </>
  );
}
