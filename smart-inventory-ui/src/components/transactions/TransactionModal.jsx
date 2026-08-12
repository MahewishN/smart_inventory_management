import { useEffect, useState } from "react";

import { createTransaction } from "../../services/transactionService";
import { getAllProducts } from "../../services/productService";
import { useAuth } from "../../context/AuthContext";

const initialState = {
  productId: "",
  transactionType: "PURCHASE",
  quantity: "",
  remarks: "",
};

function TransactionModal({
  open,
  onClose,
  onSuccess,
}) {

  const [transaction, setTransaction] =
    useState(initialState);

  const [products, setProducts] = useState([]);

  const { user } = useAuth();

  useEffect(() => {

    if (open) {

      loadProducts();

    }

  }, [open]);

  const loadProducts = async () => {

    try {

      const data = await getAllProducts();

      setProducts(data.filter((p) => p.active));

    } catch (error) {

      console.error(error);

    }

  };

  const handleChange = (e) => {

    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    });

  };

  const saveTransaction = async (e) => {

    e.preventDefault();

    try {

      await createTransaction({

        productId: Number(transaction.productId),

        transactionType: transaction.transactionType,

        quantity: Number(transaction.quantity),

        userId: user.userId,

        remarks: transaction.remarks,

      });

      setTransaction(initialState);

      onSuccess();

      onClose();

    } catch (error) {

      console.error(error);

      const message = error.response?.data?.message || "Failed to create transaction";

      alert(message);

    }

  };

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-2xl p-8 w-full max-w-lg">

        <h2 className="text-3xl font-bold mb-6">
          New Transaction
        </h2>

        <form
          onSubmit={saveTransaction}
          className="space-y-4"
        >

          <select
            name="productId"
            value={transaction.productId}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >

            <option value="">
              Select Product
            </option>

            {products.map((product) => (

              <option
                key={product.id}
                value={product.id}
              >
                {product.name}
              </option>

            ))}

          </select>

          <select
            name="transactionType"
            value={transaction.transactionType}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >

            <option value="PURCHASE">
              PURCHASE
            </option>

            <option value="SALE">
              SALE
            </option>

          </select>

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={transaction.quantity}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="remarks"
            placeholder="Remarks"
            value={transaction.remarks}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows={3}
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

export default TransactionModal;