import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types";
import { getAllCategories } from "@/api/categoryApi";
// import { DatePickerWithRange } from "./DatePickerWithRange";

type FiltersSectionProps = {
  filters: {
    dateRange: { from: Date | null; to: Date | null };
    category: string;
    vendor: string;
    search: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      dateRange: { from: Date | null; to: Date | null };
      category: string;
      vendor: string;
      search: string;
    }>
  >;
};

export function FiltersSection({ filters, setFilters }: FiltersSectionProps) {
  const handleResetFilters = () => {
    setFilters({
      dateRange: { from: null, to: null },
      category: "",
      vendor: "",
      search: "",
    });
  };

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getAllCategories().then((e) => {
      setCategories(e);
    });
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* <div>
            <Label htmlFor="date-range">Date Range</Label>
            <DatePickerWithRange
              date={filters.dateRange}
              setDate={(newDate) =>
                setFilters((prev) => ({ ...prev, dateRange: newDate }))
              }
            />
          </div> */}
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={filters.category}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => {
                return (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.categoryName}
                  </SelectItem>
                );
              })}
              {/* Add more categories as needed */}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="vendor">Vendor</Label>
          <Select
            value={filters.vendor}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, vendor: value }))
            }
          >
            <SelectTrigger id="vendor">
              <SelectValue placeholder="Select vendor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vendor1">Vendor 1</SelectItem>
              <SelectItem value="vendor2">Vendor 2</SelectItem>
              {/* Add more vendors as needed */}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search products"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button variant="outline" onClick={handleResetFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
