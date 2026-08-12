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

import MonthlySalesChart from "../../components/dashboard/Charts/MonthlySalesChart";
import MonthlyPurchasesChart from "../../components/dashboard/Charts/MonthlyPurchasesChart";
import StockCategoryChart from "../../components/dashboard/Charts/StockCategoryChart";
import TopSellingProductsChart from "../../components/dashboard/Charts/TopSellingProductsChart";

import {
    getDashboardData,
    getRestockRecommendations,
    getDemandForecast,
    getMonthlySales,
    getMonthlyPurchases,
    getStockByCategory,
    getTopSellingProducts,
} from "../../services/dashboardService";


function Dashboard() {

    const { user } = useAuth();

    const isAdmin = user?.role === "ADMIN";


    // ============================
    // STATE
    // ============================

    const [stats, setStats] = useState(null);
    const [restock, setRestock] = useState([]);
    const [forecast, setForecast] = useState([]);

    const [monthlySales, setMonthlySales] = useState([]);
    const [monthlyPurchases, setMonthlyPurchases] = useState([]);
    const [stockByCategory, setStockByCategory] = useState([]);
    const [topSellingProducts, setTopSellingProducts] = useState([]);


    const [loading, setLoading] = useState(true);


    // ============================
    // LOAD DASHBOARD
    // ============================

    useEffect(() => {

        async function loadDashboard() {

            try {

                setLoading(true);


                // Summary is available for both roles

                const summary = await getDashboardData();

                setStats(summary);


                // Admin-only dashboard data

                if (isAdmin) {

                    const [
                        restockData,
                        forecastData,
                        salesData,
                        purchasesData,
                        categoryData,
                        topProductsData,
                    ] = await Promise.all([

                        getRestockRecommendations(),
                        getDemandForecast(),

                        getMonthlySales(),
                        getMonthlyPurchases(),
                        getStockByCategory(),
                        getTopSellingProducts(),

                    ]);


                    setRestock(restockData);
                    setForecast(forecastData);

                    setMonthlySales(salesData);
                    setMonthlyPurchases(purchasesData);
                    setStockByCategory(categoryData);
                    setTopSellingProducts(topProductsData);

                }

            } catch (error) {

                console.error(
                    "Error loading dashboard:",
                    error
                );

            } finally {

                setLoading(false);

            }
        }


        loadDashboard();

    }, [isAdmin]);


    // ============================
    // LOADING
    // ============================

    if (loading || !stats) {

        return (
            <div className="flex items-center justify-center min-h-[400px]">

                <p className="text-slate-500">
                    Loading Dashboard...
                </p>

            </div>
        );

    }


    // ============================
    // UI
    // ============================

    return (

        <div className="space-y-6">

            {/* =========================
                HEADER
            ========================= */}

            <DashboardHeader />


            {/* =========================
                SUMMARY CARDS
            ========================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

                <StatCard
                    title="Products"
                    value={stats.totalProducts}
                    subtitle="Total Active Products"
                    icon={<Package size={26} />}
                    iconBg="bg-blue-100"
                    iconColor="text-blue-600"
                />


                <StatCard
                    title="Categories"
                    value={stats.totalCategories}
                    subtitle="Available Categories"
                    icon={<FolderOpen size={26} />}
                    iconBg="bg-green-100"
                    iconColor="text-green-600"
                />


                <StatCard
                    title="Current Stock"
                    value={stats.currentStock}
                    subtitle="Units Available"
                    icon={<Boxes size={26} />}
                    iconBg="bg-purple-100"
                    iconColor="text-purple-600"
                />


                {isAdmin && (

                    <StatCard
                        title="Low Stock"
                        value={stats.lowStockProducts}
                        subtitle="Needs Restocking"
                        icon={<TriangleAlert size={26} />}
                        iconBg="bg-red-100"
                        iconColor="text-red-600"
                    />

                )}


                {isAdmin && (

                    <StatCard
                        title="Purchased"
                        value={stats.totalPurchased}
                        subtitle="Total Purchased"
                        icon={<ShoppingCart size={26} />}
                        iconBg="bg-emerald-100"
                        iconColor="text-emerald-600"
                    />

                )}


                <StatCard
                    title="Sold"
                    value={stats.totalSold}
                    subtitle="Total Sold"
                    icon={<TrendingUp size={26} />}
                    iconBg="bg-orange-100"
                    iconColor="text-orange-600"
                />

            </div>


           {/* =========================
    CHARTS
========================= */}

{isAdmin && (

    <div className="space-y-6">

        {/* Sales + Purchases */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            <MonthlySalesChart
                data={monthlySales}
            />

            <MonthlyPurchasesChart
                data={monthlyPurchases}
            />

        </div>


        {/* Stock + Top Products */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            <StockCategoryChart
                data={stockByCategory}
            />

            <TopSellingProductsChart
                data={topSellingProducts}
            />

        </div>

    </div>

)}


            {/* =========================
                TABLES
            ========================= */}

            {isAdmin && (

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                    <RestockTable
                        data={restock}
                    />


                    <DemandForecastTable
                        data={forecast}
                    />

                </div>

            )}

        </div>

    );
}

export default Dashboard;