
import { Bell, Search, UserCircle, LogOut } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export function Navbar() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth) {
    throw new Error("Navbar must be used inside AuthProvider");
  }
  const authContext = auth;

  function handleLogout() {
    authContext.logout();
    navigate("/login");
  }

  return (
    <header className="flex items-center justify-between gap-3 bg-white px-3 py-4 sm:px-4 lg:px-6 border-b border-gray-200">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4 sm:gap-5">
        <button
          type="button"
          className="text-gray-500 hover:text-purple-600"
        >
          <Search size={20} />
        </button>

        <button
          type="button"
          className="relative text-gray-500 hover:text-purple-600"
        >
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-2 text-gray-700">
          <UserCircle size={28} />
          <span className="hidden sm:inline text-sm font-medium">
            {auth.currentUser?.name}
          </span>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          title="Logout"
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={20} />
          <span className="hidden sm:inline text-sm font-medium">
            Logout
          </span>
        </button>
      </div>
    </header>
  );
}
