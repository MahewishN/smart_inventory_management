import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import {
  getAllCategories,
  deactivateCategory,
  activateCategory,
} from "../../services/categoryService";

import CategoryModal from "../../components/categories/CategoryModal";

function Categories() {

  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
      setFilteredCategories(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load categories");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    setFilteredCategories(
      categories.filter((category) =>
        category.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const openAddModal = () => {
    setSelectedCategory(null);
    setShowModal(true);
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleDeactivate = async (id) => {

    if (!window.confirm("Deactivate this category?")) return;

    try {
      await deactivateCategory(id);
      fetchCategories();
    } catch (error) {
      console.error(error);
      alert("Failed to deactivate category");
    }
  };

  const handleActivate = async (id) => {

    if (!window.confirm("Activate this category?")) return;

    try {
      await activateCategory(id);
      fetchCategories();
    } catch (error) {
      console.error(error);
      alert("Failed to activate category");
    }
  };

  return (
    <>
      <div className="p-8">

        <div className="flex justify-between items-center mb-6">

          <div>
            <h1 className="text-3xl font-bold">
              Categories
            </h1>

            <p className="text-slate-500">
              Manage product categories
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
            >
              + Add Category
            </button>
          )}

        </div>

        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={handleSearch}
          className="w-full md:w-80 border rounded-lg px-4 py-2 mb-6"
        />

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Description</th>
                <th className="text-left p-4">Status</th>

                {isAdmin && (
                  <th className="text-left p-4">
                    Actions
                  </th>
                )}

              </tr>

            </thead>

            <tbody>

              {filteredCategories.map((category) => (

                <tr
                  key={category.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="p-4 font-medium">
                    {category.name}
                  </td>

                  <td className="p-4">
                    {category.description}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        category.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {category.active ? "Active" : "Inactive"}
                    </span>

                  </td>

                  {isAdmin && (

                    <td className="p-4 flex gap-2">

                      <button
                        onClick={() => openEditModal(category)}
                        className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
                      >
                        Edit
                      </button>

                      {category.active ? (

                        <button
                          onClick={() =>
                            handleDeactivate(category.id)
                          }
                          className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                        >
                          Deactivate
                        </button>

                      ) : (

                        <button
                          onClick={() =>
                            handleActivate(category.id)
                          }
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

        <CategoryModal
          open={showModal}
          category={selectedCategory}
          onClose={() => {
            setShowModal(false);
            setSelectedCategory(null);
          }}
          onSuccess={fetchCategories}
        />

      )}

    </>
  );
}

export default Categories;