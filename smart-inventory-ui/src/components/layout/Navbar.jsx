import { Bell, UserCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">

      {/* Left */}

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Welcome back, {user?.fullName}
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <button className="relative">
          <Bell
            size={22}
            className="text-slate-600 hover:text-blue-600 transition"
          />

          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">

          <UserCircle
            size={42}
            className="text-slate-600"
          />

          <div>

            <h3 className="font-semibold">
              {user?.fullName}
            </h3>

            <p className="text-sm text-slate-500">
              {user?.role}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;