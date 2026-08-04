function DemandForecastTable({ data }) {

    return (

        <div className="bg-white rounded-xl shadow-md mt-8 overflow-hidden">

            <div className="px-6 py-5 border-b">

                <h2 className="text-xl font-bold">
                    Demand Forecast
                </h2>

            </div>

            <table className="w-full">

                <thead className="bg-slate-100">

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

                    {data.map(product => (

                        <tr
                            key={product.productId}
                            className="border-t hover:bg-slate-50"
                        >

                            <td className="p-4 font-medium">
                                {product.productName}
                            </td>

                            <td className="text-center">
                                {product.currentStock}
                            </td>

                            <td className="text-center">
                                {product.predictedDemand}
                            </td>

                            <td
                                className={`text-center font-bold ${
                                    product.recommendedPurchase > 0
                                        ? "text-red-600"
                                        : "text-green-600"
                                }`}
                            >
                                {product.recommendedPurchase}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default DemandForecastTable;