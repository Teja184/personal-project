import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Category } from "@/types";

type ProductFiltersProps = {
  categories: Category[];
  filters: {
    category: string;
    status: string;
    search: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      category: string;
      status: string;
      search: string;
    }>
  >;
};

export function ProductFilters({
  filters,
  setFilters,
  categories,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-end">
      <div className="w-full md:w-1/3">
        <Label htmlFor="search">Search Products</Label>
        <Input
          id="search"
          placeholder="Search by product name"
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
        />
      </div>
      <div className="w-full md:w-1/3">
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
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="active-products"
          checked={filters.status === "1"}
          onCheckedChange={(checked) =>
            setFilters((prev) => ({
              ...prev,
              status: checked ? "1" : "",
            }))
          }
        />
        <Label htmlFor="active-products">Show only active products</Label>
      </div>
    </div>
  );
}
