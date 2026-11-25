
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

      <main className="flex-1 p-3 sm:p-4 lg:p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
