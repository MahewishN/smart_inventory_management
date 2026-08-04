function RestockTable({ data }) {
    return (
        <div className="bg-white rounded-xl shadow-md mt-8 overflow-hidden">

            <div className="px-6 py-5 border-b">
                <h2 className="text-xl font-bold">
                    Restock Recommendations
                </h2>
            </div>

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr>
                        <th className="text-left p-4">Product</th>
                        <th className="text-center p-4">Current</th>
                        <th className="text-center p-4">Minimum</th>
                        <th className="text-center p-4">Recommended</th>
                    </tr>

                </thead>

                <tbody>

                    {data.length === 0 ? (

                        <tr>
                            <td
                                colSpan="4"
                                className="text-center py-8 text-slate-500"
                            >
                                No products need restocking 🎉
                            </td>
                        </tr>

                    ) : (

                        data.map(product => (

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
                                    {product.minimumStockLevel}
                                </td>

                                <td className="text-center font-bold text-red-600">
                                    {product.recommendedRestockQuantity}
                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>
    );
}

export default RestockTable;