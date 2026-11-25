import { Bell, Search, UserCircle } from "lucide-react";

export function Navbar() {
  return (
    <header className="flex items-center justify-between gap-3 bg-white px-3 py-4 sm:px-4 lg:px-6 border-b border-gray-200">

      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-5">

        <button type="button" className="text-gray-500 hover:text-purple-600">
          <Search size={20} />
        </button>

        <button type="button" className="relative text-gray-500 hover:text-purple-600">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-2 text-gray-700">
          <UserCircle size={28} />
         <span className="hidden sm:inline text-sm font-medium">Admin</span>
        </div>

      </div>
    </header>
  );
}