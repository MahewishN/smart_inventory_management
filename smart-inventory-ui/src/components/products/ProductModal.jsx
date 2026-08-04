import { useEffect, useState } from "react";
import axios from "axios";
import {
  addProduct,
  updateProduct,
} from "../../services/productService";

const initialState = {
  name: "",
  sku: "",
  brand: "",
  description: "",
  price: "",
  quantity: "",
  minimumStockLevel: "",
  categoryId: "",
  active: true,
};

function ProductModal({
  open,
  onClose,
  onSuccess,
  product: selectedProduct,
}) {
  const [product, setProduct] = useState(initialState);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!open) return;

    loadCategories();

    if (selectedProduct) {
      setProduct({
        id: selectedProduct.id,
        name: selectedProduct.name,
        sku: selectedProduct.sku,
        brand: selectedProduct.brand,
        description: selectedProduct.description || "",
        price: selectedProduct.price,
        quantity: selectedProduct.quantity,
        minimumStockLevel:
          selectedProduct.minimumStockLevel || "",
        categoryId: selectedProduct.categoryId,
        active: selectedProduct.active,
      });
    } else {
      setProduct(initialState);
    }
  }, [open, selectedProduct]);

  const loadCategories = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/categories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: product.name,
        description: product.description,
        sku: product.sku,
        brand: product.brand,
        price: Number(product.price),
        quantity: Number(product.quantity),
        minimumStockLevel: Number(product.minimumStockLevel),
        categoryId: Number(product.categoryId),
        active: product.active,
      };

      if (selectedProduct) {
        await updateProduct(selectedProduct.id, payload);
      } else {
        await addProduct(payload);
      }

      onSuccess();
      onClose();
      setProduct(initialState);
    } catch (error) {
      console.error(error);
      alert("Failed to save product");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8">

        <h2 className="text-3xl font-bold mb-6">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4"
        >

          <input
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="sku"
            placeholder="SKU"
            value={product.sku}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="brand"
            placeholder="Brand"
            value={product.brand}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <select
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            className="border rounded-lg p-3"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={product.quantity}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="minimumStockLevel"
            type="number"
            placeholder="Minimum Stock"
            value={product.minimumStockLevel}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <div className="col-span-2 flex justify-end gap-3 mt-4">

            <button
              type="button"
              onClick={() => {
                onClose();
                setProduct(initialState);
              }}
              className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              {selectedProduct
                ? "Update Product"
                : "Save Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ProductModal;