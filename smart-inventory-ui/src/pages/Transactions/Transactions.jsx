import { useEffect, useState } from "react";
import { getAllTransactions } from "../../services/transactionService";
import TransactionModal from "../../components/transactions/TransactionModal";

function Transactions() {

  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {

      const data = await getAllTransactions();

      setTransactions(data);
      setFilteredTransactions(data);

    } catch (error) {

      console.error(error);

      alert("Failed to load transactions");

    }
  };

  const handleSearch = (e) => {

    const value = e.target.value;

    setSearch(value);

    setFilteredTransactions(
      transactions.filter((transaction) =>
        transaction.productName
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );
  };

  return (
    <>
      <div className="p-8">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h1 className="text-3xl font-bold">
              Transactions
            </h1>

            <p className="text-slate-500">
              Purchase & Sale History
            </p>

          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            + New Transaction
          </button>

        </div>

        <input
          type="text"
          placeholder="Search by product..."
          value={search}
          onChange={handleSearch}
          className="w-full md:w-80 border rounded-lg px-4 py-2 mb-6"
        />

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-left p-4">Product</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Quantity</th>
                <th className="text-left p-4">User</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Remarks</th>

              </tr>

            </thead>

            <tbody>

              {filteredTransactions.map((transaction) => (

                <tr
                  key={transaction.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="p-4 font-medium">
                    {transaction.productName}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        transaction.transactionType === "PURCHASE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {transaction.transactionType}
                    </span>

                  </td>

                  <td className="p-4">
                    {transaction.quantity}
                  </td>

                  <td className="p-4">
                    {transaction.userName}
                  </td>

                  <td className="p-4">
                    {new Date(
                      transaction.transactionDate
                    ).toLocaleString()}
                  </td>

                  <td className="p-4">
                    {transaction.remarks}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <TransactionModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchTransactions}
      />

    </>
  );
}

export default Transactions;