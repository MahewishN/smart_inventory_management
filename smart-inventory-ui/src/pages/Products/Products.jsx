import { useEffect, useState } from "react";
import {
  getAllProducts,
  deactivateProduct,
  activateProduct,
} from "../../services/productService";

import ProductModal from "../../components/products/ProductModal";
import { useAuth } from "../../context/AuthContext";

function Products() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();

      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load products");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const openAddModal = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDeactivate = async (id) => {
    if (!window.confirm("Deactivate this product?")) return;

    try {
      await deactivateProduct(id);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to deactivate product");
    }
  };

  const handleActivate = async (id) => {
    if (!window.confirm("Activate this product?")) return;

    try {
      await activateProduct(id);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to activate product");
    }
  };

  return (
    <>
      <div className="p-8">

        <div className="flex justify-between items-center mb-6">

          <div>
            <h1 className="text-3xl font-bold">Products</h1>

            <p className="text-slate-500">
              Manage inventory products
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
            >
              + Add Product
            </button>
          )}

        </div>

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={handleSearch}
          className="w-full md:w-80 border rounded-lg px-4 py-2 mb-6"
        />

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">SKU</th>
                <th className="text-left p-4">Brand</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Stock</th>
                <th className="text-left p-4">Status</th>

                {isAdmin && (
                  <th className="text-left p-4">Actions</th>
                )}
              </tr>
            </thead>

            <tbody>

              {filteredProducts.map((product) => (

                <tr
                  key={product.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="p-4 font-medium">
                    {product.name}
                  </td>

                  <td className="p-4">
                    {product.sku}
                  </td>

                  <td className="p-4">
                    {product.brand}
                  </td>

                  <td className="p-4">
                    {product.categoryName}
                  </td>

                  <td className="p-4">
                    ₹{product.price}
                  </td>

                  <td className="p-4">
                    {product.quantity}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        product.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {isAdmin && (
                    <td className="p-4 flex gap-2">

                      <button
                        onClick={() => openEditModal(product)}
                        className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
                      >
                        Edit
                      </button>

                      {product.active ? (
                        <button
                          onClick={() => handleDeactivate(product.id)}
                          className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivate(product.id)}
                          className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white"
                        >
                          Activate
                        </button>
                      )}

                    </td>
                  )}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {isAdmin && (
        <ProductModal
          open={showModal}
          product={selectedProduct}
          onClose={() => {
            setShowModal(false);
            setSelectedProduct(null);
          }}
          onSuccess={fetchProducts}
        />
      )}
    </>
  );
}

export default Products;