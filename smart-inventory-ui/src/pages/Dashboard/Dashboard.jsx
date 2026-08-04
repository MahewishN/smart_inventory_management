import { useEffect, useState } from "react";

import {
  Package,
  FolderOpen,
  Boxes,
  TriangleAlert,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/StatCard";
import RestockTable from "../../components/dashboard/RestockTable";
import DemandForecastTable from "../../components/dashboard/DemandForecastTable";

import {
  getDashboardData,
  getRestockRecommendations,
  getDemandForecast,
} from "../../services/dashboardService";

function Dashboard() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [stats, setStats] = useState(null);
  const [restock, setRestock] = useState([]);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const summary = await getDashboardData();
        setStats(summary);

        if (isAdmin) {
          const [restockData, forecastData] = await Promise.all([
            getRestockRecommendations(),
            getDemandForecast(),
          ]);

          setRestock(restockData);
          setForecast(forecastData);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadDashboard();
  }, [isAdmin]);

  if (!stats) {
    return (
      <div className="p-8">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">

      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <StatCard
          title="Products"
          value={stats.totalProducts}
          subtitle="Total Active Products"
          icon={<Package size={28} />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Categories"
          value={stats.totalCategories}
          subtitle="Available Categories"
          icon={<FolderOpen size={28} />}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />

        <StatCard
          title="Current Stock"
          value={stats.currentStock}
          subtitle="Units Available"
          icon={<Boxes size={28} />}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />

        {isAdmin && (
          <StatCard
            title="Low Stock"
            value={stats.lowStockProducts}
            subtitle="Needs Restocking"
            icon={<TriangleAlert size={28} />}
            iconBg="bg-red-100"
            iconColor="text-red-600"
          />
        )}

        {isAdmin && (
          <StatCard
            title="Purchased"
            value={stats.totalPurchased}
            subtitle="Total Purchased"
            icon={<ShoppingCart size={28} />}
            iconBg="bg-emerald-100"
            iconColor="text-emerald-600"
          />
        )}

        <StatCard
          title="Sold"
          value={stats.totalSold}
          subtitle="Total Sold"
          icon={<TrendingUp size={28} />}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />

      </div>

      {isAdmin && (
        <>
          <RestockTable data={restock} />

          <DemandForecastTable data={forecast} />
        </>
      )}

    </div>
  );
}

export default Dashboard;