function StatCard({
    title,
    value,
    subtitle,
    icon,
    iconBg = "bg-blue-100",
    iconColor = "text-blue-600",
}) {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 p-6">

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-slate-500 text-sm">
                        {title}
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-slate-800">
                        {value}
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                        {subtitle}
                    </p>

                </div>

                <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center ${iconBg}`}
                >
                    <div className={iconColor}>
                        {icon}
                    </div>
                </div>

            </div>

        </div>
    );
}

export default StatCard;