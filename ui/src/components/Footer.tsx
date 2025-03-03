import { Link } from "react-router";
export function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            © 2024 ExpenseTracker. All rights reserved.
          </div>
          <div className="space-x-4">
            <Link
              to="/about"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
