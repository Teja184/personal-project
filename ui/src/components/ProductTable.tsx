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
import { AddEditProductModal } from "./AddEditProductModal";
import { useToast } from "../hooks/use-toast";
import { getAllProducts } from "@/api/productApi";
import { mapProducts } from "@/utils/mapProducts";

type Product = {
  id: string;
  name: string;
  category: string;
  unitOfMeasure: string;
  status: "1" | "0";
};

type ProductTableProps = {
  filters: {
    category: string;
    status: string;
    search: string;
  };
};

export function ProductTable({ filters }: ProductTableProps) {
  const [products, setProducts] = useState<Product[]>([]);

  const [sorting, setSorting] = useState({ column: "", direction: "asc" });

  useEffect(() => {
    getAllProducts(filters).then((e) => {
      setProducts(mapProducts(e));
      console.log(e);
    });
  }, [filters]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const handleSort = (column: string) => {
    const direction =
      sorting.column === column && sorting.direction === "asc" ? "desc" : "asc";
    setSorting({ column, direction });
    // Implement sorting logic here
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    setProducts(products.filter((product) => product.id !== id));
    toast({
      title: "Product deleted",
      description: "The product has been successfully deleted.",
    });
  };

  const handleToggleStatus = (id: string) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              status: product.status === "1" ? "0" : "0",
            }
          : product
      )
    );
    toast({
      title: "Product status updated",
      description: "The product status has been successfully updated.",
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">
              <Button variant="ghost" onClick={() => handleSort("name")}>
                Product Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Unit of Measure</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              className={product.status === "0" ? "bg-muted/50" : ""}
            >
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.unitOfMeasure}</TableCell>
              <TableCell>
                <Badge
                  variant={product.status === "1" ? "default" : "secondary"}
                >
                  {product.status}
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
                    <DropdownMenuItem onClick={() => handleEdit(product)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(product.id)}>
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleToggleStatus(product.id)}
                    >
                      {product.status === "1" ? "Deactivate" : "Activate"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddEditProductModal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        product={editingProduct}
        categories={[]}
      />
    </>
  );
}
