import AddEditExpensePage from "./components/EditExpensePage";
import { ExpenseDashboard } from "./components/ExpenseDashboard";
import { InventoryDashboard } from "./components/InventoryDashboard";
import { ProductManagement } from "./components/ProductManagement";
import { VendorManagement } from "./components/VendorManagement";

export const pageRoutes = [
  {
    path: "/",
    component: <ExpenseDashboard />,
  },
  {
    path: "expense/add",
    component: <AddEditExpensePage />,
  },
  {
    path: "product-management",
    component: <ProductManagement />,
  },
  {
    path: "inventory-dashboard",
    component: <InventoryDashboard />,
  },
  {
    path: "vendor-dashboard",
    component: <VendorManagement />,
  },
];
