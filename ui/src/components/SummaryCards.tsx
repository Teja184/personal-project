import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SummaryCards() {
  // This data would typically come from your backend or state management
  const summaryData = {
    totalProducts: 100,
    outOfStockItems: 5,
    lowStockItems: 10,
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summaryData.totalProducts}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Out of Stock Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {summaryData.outOfStockItems}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summaryData.lowStockItems}</div>
        </CardContent>
      </Card>
    </div>
  );
}
