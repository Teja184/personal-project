import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Product } from "@/types";
import { getAllProducts } from "@/api/productApi";
import { addNewExpense, PostExense } from "@/api/expenseApi";

const formSchema = z.object({
  productTitle: z.string().min(2, {
    message: "Product title must be at least 2 characters.",
  }),
  vendor: z.string().min(2, {
    message: "Vendor must be at least 2 characters.",
  }),
  unitPrice: z.number().positive({
    message: "Unit price must be a positive number.",
  }),
  purchaseUnit: z.number().int().positive({
    message: "Purchase unit must be a positive integer.",
  }),
  totalPrice: z.number().int().optional(),
  product: z.string().min(1, {
    message: "product must be at least 2 characters.",
  }),
  purchaseDate: z.date({
    required_error: "A purchase date is required.",
  }),
  billImage: z.string().optional(),
});

export function AddEditExpenseForm({ isEditing }: { isEditing: boolean }) {
  const router = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productTitle: "",
      vendor: "",
      unitPrice: 0,
      purchaseUnit: 0,
      totalPrice: 0,
      product: "",
      purchaseDate: new Date(),
      billImage: "",
    },
  });

  useEffect(() => {
    getAllProducts().then((e) => {
      setProducts(e);
    });
  }, []);

  useEffect(() => {
    if (isEditing) {
      // Fetch expense data and set form values
      // This is a placeholder for the actual data fetching logic
      const fetchedData = {
        productTitle: "Sample Product",
        vendor: "Sample Vendor",
        date: new Date(),
        unitPrice: 10,
        purchaseUnit: 5,
        totalPrice: 50,
        product: products.length > 0 ? products[0].name : "",
        purchaseDate: new Date(),
        billImage: "",
      };
      form.reset(fetchedData);
    }
  }, [isEditing, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("form submit");
    setIsLoading(true);
    // This is where you would typically send the form data to your backend
    values.totalPrice = parseFloat(
      (values.unitPrice * values.purchaseUnit).toString()
    );

    const expense: PostExense = {
      product_id: Number(values.product),
      product_title: values.productTitle,
      p_unit: values.purchaseUnit,
      total_price: values.totalPrice,
      unit_price: values.unitPrice,
      vendor: values.vendor,
    };
    console.log(expense);

    addNewExpense(expense).then((e) => {
      router("/");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="productTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter product title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vendor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor</FormLabel>
              <FormControl>
                <Input placeholder="Enter vendor title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unitPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="purchaseUnit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purchase Unit</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
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
          name="product"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {products.map((e) => {
                    return (
                      <SelectItem key={e.id} value={e.id.toString()}>
                        {e.name}
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
          name="purchaseDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Purchase Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="billImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bill Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              </FormControl>
              <FormDescription>
                Upload an image of the receipt (optional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => router("/expense-dashboard")}
          >
            Cancel
          </Button>
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
              "Save Expense"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
