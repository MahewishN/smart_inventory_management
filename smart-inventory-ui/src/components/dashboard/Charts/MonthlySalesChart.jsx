import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function MonthlySalesChart({ data }) {

    return (
        <div className="bg-white rounded-xl shadow-md p-5 h-[300px]">

            <div className="mb-3">
                <h2 className="text-lg font-bold text-slate-800">
                    Monthly Sales
                </h2>

                <p className="text-sm text-slate-500">
                    Sales performance over time
                </p>
            </div>

            <ResponsiveContainer width="100%" height="78%">

                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 15,
                        left: 0,
                        bottom: 5,
                    }}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="month"
                    />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="totalSales"
                        name="Sales"
                        stroke="#2563eb"
                        strokeWidth={3}
                        dot={{
                            r: 4,
                            fill: "#2563eb",
                        }}
                        activeDot={{
                            r: 6,
                        }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
}

export default MonthlySalesChart;