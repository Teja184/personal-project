import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Outlet } from "react-router";
export const metadata = {
  title: "Expense Tracker",
  description: "Track and manage your business expenses",
};

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow container mx-auto px-28 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
