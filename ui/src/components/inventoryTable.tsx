"use client";

import { useState, useEffect } from "react";
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
import { AddEditInventoryModal } from "./AddEditInventoryModal";
import { useToast } from "@/hooks/use-toast";
import { getAllInventories } from "@/api/inventoryApi";
import { mapInventory } from "@/utils/mapInventory";

type InventoryItem = {
  id: string;
  productName: string;
  category: string;
  stockQuantity: number;
  unitOfMeasure: string;
  stockStatus: "Low" | "Out of Stock" | "Sufficient";
};

type InventoryTableProps = {
  filters: {
    category: string;
    stockStatus: string;
    search: string;
  };
};

export function InventoryTable({ filters }: InventoryTableProps) {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const [sorting, setSorting] = useState({ column: "", direction: "asc" });

  useEffect(() => {
      getAllInventories(filters).then((e) => {
        setInventory(mapInventory(e));
        console.log(e);
      });
    }, [filters]);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const { toast } = useToast();

  const handleSort = (column: string) => {
    const direction =
      sorting.column === column && sorting.direction === "asc" ? "desc" : "asc";
    setSorting({ column, direction });
    // Implement sorting logic here
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    setInventory(inventory.filter((item) => item.id !== id));
    toast({
      title: "Inventory item deleted",
      description: "The inventory item has been successfully deleted.",
    });
  };

  const handleUpdateStock = (id: string) => {
    // Implement stock update functionality
    toast({
      title: "Stock update",
      description: "Stock update functionality to be implemented.",
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">
              <Button variant="ghost" onClick={() => handleSort("productName")}>
                Product Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("stockQuantity")}
              >
                Stock Quantity
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Unit of Measure</TableHead>
            <TableHead>Stock Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.productName}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.stockQuantity}</TableCell>
              <TableCell>{item.unitOfMeasure}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    item.stockStatus === "Sufficient"
                      ? "default"
                      : item.stockStatus === "Low"
                      ? "warning"
                      : "destructive"
                  }
                >
                  {item.stockStatus}
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
                    <DropdownMenuItem onClick={() => handleEdit(item)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(item.id)}>
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleUpdateStock(item.id)}
                    >
                      Update Stock
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddEditInventoryModal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        inventoryItem={editingItem}
        categories={[]}
      />
    </>
  );
}
