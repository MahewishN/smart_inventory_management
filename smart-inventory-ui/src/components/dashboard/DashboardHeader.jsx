import { useAuth } from "../../context/AuthContext";

function DashboardHeader() {
    const { user } = useAuth();

    return (
        <div className="mb-8">
            <h1 className="text-5xl font-bold text-slate-900">
                Dashboard
            </h1>

            <p className="mt-2 text-lg text-slate-600">
                Welcome back, {user?.fullName} 👋
            </p>

            <p className="text-slate-400">
                Here's today's inventory overview.
            </p>
        </div>
    );
}

export default DashboardHeader;