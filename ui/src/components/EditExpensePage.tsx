import { AddEditExpenseForm } from "./AddEditExpenseForm";
import { useLocation } from "react-router";

export default function AddEditExpensePage() {
  const location = useLocation();
  const isEditing = location.state?.action === "edit";
  const title = isEditing ? "Edit Expense" : "Add Expense";
  console.log("title", title, isEditing, location.state);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      <AddEditExpenseForm isEditing={isEditing} />
    </div>
  );
}
