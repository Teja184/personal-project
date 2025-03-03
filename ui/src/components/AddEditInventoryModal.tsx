import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Category } from "@/types";
import { addNewInventory } from "@/api/inventoryApi";

const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  stockQuantity: z.number().min(0, {
    message: "Stock quantity must be a non-negative number.",
  }),
  unitOfMeasure: z.string().min(1, {
    message: "Please enter a unit of measure.",
  }),
});

type InventoryItem = {
  id: string;
  productName: string;
  category: string;
  stockQuantity: number;
  unitOfMeasure: string;
  stockStatus: "Low" | "Out of Stock" | "Sufficient";
};

type AddEditInventoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  inventoryItem?: InventoryItem | null;
};

export function AddEditInventoryModal({
  isOpen,
  onClose,
  categories,
  inventoryItem,
}: AddEditInventoryModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      category: "",
      stockQuantity: 0,
      unitOfMeasure: "",
    },
  });

  useEffect(() => {
    if (inventoryItem) {
      form.reset({
        productName: inventoryItem.productName,
        category: inventoryItem.category,
        stockQuantity: inventoryItem.stockQuantity,
        unitOfMeasure: inventoryItem.unitOfMeasure,
      });
    } else {
      form.reset({
        productName: "",
        category: "",
        stockQuantity: 0,
        unitOfMeasure: "",
      });
    }
  }, [inventoryItem, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // This is where you would typically send the form data to your backend
    console.log(values);
    addNewInventory({
          product_name: values.productName,
          category_name: values.category,
          unit_of_measure: values.unitOfMeasure,
          current_stock: values.stockQuantity,
        }).then((e) => {
          onClose();
        });
      }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {inventoryItem ? "Edit Inventory Item" : "Add New Inventory Item"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => {
                          return (
                            <SelectItem key={cat.id} value={cat.id.toString()}>
                              {cat.categoryName}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stockQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unitOfMeasure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit of Measure</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter unit of measure" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Inventory Item"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
