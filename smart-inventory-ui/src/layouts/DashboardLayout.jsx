import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="flex-1 p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;