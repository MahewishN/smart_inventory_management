import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";


const COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#f59e0b",
    "#10b981",
    "#ef4444",
];


function StockCategoryChart({ data }) {

    return (

        <div className="bg-white rounded-xl shadow-md p-5 h-[300px]">

            <div className="mb-2">

                <h2 className="text-lg font-bold text-slate-800">
                    Stock by Category
                </h2>

                <p className="text-sm text-slate-500">
                    Current inventory distribution
                </p>

            </div>


            <ResponsiveContainer
                width="100%"
                height="82%"
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="totalStock"
                        nameKey="categoryName"
                        cx="50%"
                        cy="45%"
                        outerRadius={75}
                        innerRadius={42}
                        paddingAngle={3}
                    >

                        {data.map((entry, index) => (

                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />

                        ))}

                    </Pie>


                    <Tooltip />


                    <Legend
                        verticalAlign="bottom"
                        height={30}
                    />

                </PieChart>

            </ResponsiveContainer>

        </div>
    );
}

export default StockCategoryChart;