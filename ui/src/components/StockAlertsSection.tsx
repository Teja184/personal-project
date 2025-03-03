import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function StockAlertsSection() {
  // This would typically come from your backend or state management
  const lowStockItems = [
    { id: "1", name: "Sugar", quantity: 20 },
    { id: "2", name: "Paper Cups", quantity: 0 },
  ];

  if (lowStockItems.length === 0) {
    return null;
  }

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Low Stock Alert</AlertTitle>
      <AlertDescription>
        The following items are low in stock or out of stock:
        <ul className="mt-2 list-disc list-inside">
          {lowStockItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} left
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
