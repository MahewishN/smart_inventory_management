import {
  LayoutDashboard,
  Package,
  Tags,
  ArrowLeftRight,
  Users,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.role === "ADMIN";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-white hover:bg-slate-800"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          StockFlow
        </h1>

        <p className="text-sm text-slate-400">
          Smart Inventory Management 
        </p>
      </div>

      {/* Logged In User */}
      <div className="px-6 py-4 border-b border-slate-700">
        <p className="font-semibold">
          {user?.fullName}
        </p>

        <p className="text-xs text-slate-400">
          {user?.role}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">

        <NavLink to="/dashboard" className={menuClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/products" className={menuClass}>
          <Package size={20} />
          Products
        </NavLink>

        {/* Categories visible to both Admin & Employee */}
        <NavLink to="/categories" className={menuClass}>
          <Tags size={20} />
          Categories
        </NavLink>

        <NavLink to="/transactions" className={menuClass}>
          <ArrowLeftRight size={20} />
          Transactions
        </NavLink>

        {/* Employees only for Admin */}
        {isAdmin && (
          <NavLink to="/employees" className={menuClass}>
            <Users size={20} />
            Employees
          </NavLink>
        )}

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500 py-3 transition hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;