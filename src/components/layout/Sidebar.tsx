
import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  FolderKanban,
  Users,
  UserCircle,
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Projects", icon: FolderKanban, path: "/projects" },
  { title: "Members", icon: Users, path: "/members" },
  { title: "Profile", icon: UserCircle, path: "/profile" },

];

export function Sidebar() {
  return (
    <aside className="w-23 sm:w-64 min-h-screen shrink-0 bg-slate-900 text-white p-2 sm:p-5">
    <h1 className="text-base sm:text-2xl font-bold mb-10 whitespace-nowrap">
  TaskFlow
</h1>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              to={item.path}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <Icon size={20} />
             <span className="hidden sm:inline">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
