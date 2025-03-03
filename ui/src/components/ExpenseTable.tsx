import { useEffect, useState } from "react";
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
import { getAllExpenses } from "@/api/expenseApi";
import { Expense } from "@/types";
import { mapExpenses } from "@/utils/mapExpense";

type ExpenseTableProps = {
  filters: {
    dateRange: { from: Date | null; to: Date | null };
    category: string;
    vendor: string;
    search: string;
  };
};

export function ExpenseTable({ filters }: ExpenseTableProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [sorting, setSorting] = useState({ column: "", direction: "asc" });

  useEffect(() => {
    getAllExpenses(filters).then((e) => {
      setExpenses(mapExpenses(e));
    });
  }, [filters])

  const handleSort = (column: string) => {
    const direction =
      sorting.column === column && sorting.direction === "asc" ? "desc" : "asc";
    setSorting({ column, direction });
    // Implement sorting logic here
  };

  const handleEdit = (id: string) => {
    // Implement edit functionality
    console.log(`Editing expense with id: ${id}`);
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log(`Deleting expense with id: ${id}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">
            <Button variant="ghost" onClick={() => handleSort("productTitle")}>
              Product Title
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          {/*<TableHead>
            <Button variant="ghost" onClick={() => handleSort("date")}>
              Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>*/}
          <TableHead>Vendor</TableHead>
          <TableHead>Unit Price</TableHead>
          <TableHead>Purchase Unit</TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => handleSort("totalPrice")}>
              Total Price
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead>Purchase Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell className="font-medium">
              {expense.productTitle}
            </TableCell>
            {/*<TableCell>{expense.date}</TableCell>*/}
            <TableCell>{expense.vendor}</TableCell>
            <TableCell>${expense.unitPrice.toFixed(2)}</TableCell>
            <TableCell>{expense.purchaseUnit}</TableCell>
            <TableCell>${expense.totalPrice.toFixed(2)}</TableCell>
            <TableCell>{expense.purchaseDate}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleEdit(expense.id)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(expense.id)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
