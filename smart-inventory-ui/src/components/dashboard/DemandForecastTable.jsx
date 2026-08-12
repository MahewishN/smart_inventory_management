function DemandForecastTable({ data }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden h-[420px] flex flex-col">

            {/* Header */}
            <div className="px-6 py-5 border-b shrink-0">
                <h2 className="text-xl font-bold">
                    Demand Forecast
                </h2>
            </div>

            {/* Scrollable Table */}
            <div className="overflow-y-auto flex-1">

                <table className="w-full">

                    <thead className="bg-slate-100 sticky top-0 z-10">

                        <tr>

                            <th className="text-left p-4">
                                Product
                            </th>

                            <th className="text-center p-4">
                                Current Stock
                            </th>

                            <th className="text-center p-4">
                                Predicted Demand
                            </th>

                            <th className="text-center p-4">
                                Recommended Purchase
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {data.length === 0 ? (

                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center py-8 text-slate-500"
                                >
                                    No demand forecast available.
                                </td>
                            </tr>

                        ) : (

                            data.map((product, index) => (

                                <tr
                                    key={`${product.productId}-${index}`}
                                    className="border-t hover:bg-slate-50"
                                >

                                    <td className="p-4 font-medium">
                                        {product.productName}
                                    </td>

                                    <td className="text-center p-4">
                                        {product.currentStock}
                                    </td>

                                    <td className="text-center p-4">
                                        {product.predictedDemand}
                                    </td>

                                    <td
                                        className={`text-center p-4 font-bold ${
                                            product.recommendedPurchase > 0
                                                ? "text-red-600"
                                                : "text-green-600"
                                        }`}
                                    >
                                        {product.recommendedPurchase}
                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default DemandForecastTable;