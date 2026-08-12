import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";


function TopSellingProductsChart({ data }) {

    return (

        <div className="bg-white rounded-xl shadow-md p-5 h-[300px]">

            <div className="mb-3">

                <h2 className="text-lg font-bold text-slate-800">
                    Top 5 Selling Products
                </h2>

                <p className="text-sm text-slate-500">
                    Products with the highest sales
                </p>

            </div>


            <ResponsiveContainer
                width="100%"
                height="80%"
            >

                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                        top: 5,
                        right: 20,
                        left: 15,
                        bottom: 5,
                    }}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />


                    <XAxis
                        type="number"
                    />


                    <YAxis
                        type="category"
                        dataKey="productName"
                        width={105}
                    />


                    <Tooltip />


                    <Bar
                        dataKey="totalSold"
                        name="Units Sold"
                        fill="#8b5cf6"
                        radius={[0, 6, 6, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}

export default TopSellingProductsChart;