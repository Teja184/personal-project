import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type VendorFiltersProps = {
  filters: {
    search: string;
    category: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      search: string;
      category: string;
    }>
  >;
};

export function VendorFilters({ filters, setFilters }: VendorFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-end">
      <div className="w-full md:w-1/2">
        <Label htmlFor="search">Search Vendors</Label>
        <Input
          id="search"
          placeholder="Search by vendor name"
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
        />
      </div>
      <div className="w-full md:w-1/2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={filters.category || "all"}
          onValueChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              category: value === "all" ? "" : value,
            }))
          }
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="food">Food Ingredients</SelectItem>
            <SelectItem value="disposables">Disposables</SelectItem>
            <SelectItem value="equipment">Equipment</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
