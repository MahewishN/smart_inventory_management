import { useState } from "react";
import { Download } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { downloadDashboardPdf } from "../../services/dashboardService";

function DashboardHeader() {

    const { user } = useAuth();

    const [downloading, setDownloading] = useState(false);

    const handleDownloadPdf = async () => {

        try {

            setDownloading(true);

            await downloadDashboardPdf();

        } catch (error) {

            console.error(
                "Failed to download dashboard PDF:",
                error
            );

            alert("Failed to download dashboard report.");

        } finally {

            setDownloading(false);

        }
    };


    return (

        <div className="mb-8 flex items-start justify-between gap-4">

            {/* =========================
                LEFT
            ========================= */}

            <div>

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


            {/* =========================
                PDF BUTTON
            ========================= */}

            {user?.role === "ADMIN" && (

                <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={downloading}
                    className="
                        flex items-center gap-2
                        px-4 py-2.5
                        bg-blue-600
                        text-white
                        rounded-lg
                        font-medium
                        hover:bg-blue-700
                        transition
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        whitespace-nowrap
                    "
                >

                    <Download size={18} />

                    {downloading
                        ? "Generating..."
                        : "Download PDF"
                    }

                </button>

            )}

        </div>
    );
}

export default DashboardHeader;