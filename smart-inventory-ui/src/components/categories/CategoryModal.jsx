import { useEffect, useState } from "react";

import {
  createCategory,
  updateCategory,
} from "../../services/categoryService";

const initialState = {
  name: "",
  description: "",
};

function CategoryModal({
  open,
  onClose,
  onSuccess,
  category,
}) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
      });
    } else {
      setFormData(initialState);
    }
  }, [category, open]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveCategory = async (e) => {
    e.preventDefault();

    try {
      if (category) {
        await updateCategory(category.id, {
          ...formData,
          active: category.active,
        });
      } else {
        await createCategory(formData);
      }

      onSuccess();
      onClose();

    } catch (error) {
      console.error(error);
      alert("Failed to save category");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-2xl w-full max-w-lg p-8">

        <h2 className="text-3xl font-bold mb-6">
          {category ? "Edit Category" : "Add Category"}
        </h2>

        <form
          onSubmit={saveCategory}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Category Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-lg p-3"
            required
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              {category ? "Update" : "Save"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CategoryModal;