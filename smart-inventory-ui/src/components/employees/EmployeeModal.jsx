import { useEffect, useState } from "react";
import { createUser, updateUser } from "../../services/userService";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  role: "EMPLOYEE",
  branch: "",
  active: true,
};

function EmployeeModal({
  open,
  onClose,
  onSuccess,
  selectedUser,
}) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (selectedUser) {
      setForm({
        fullName: selectedUser.fullName,
        email: selectedUser.email,
        password: "",
        role: selectedUser.role,
        branch: selectedUser.branch,
        active: selectedUser.active,
      });
    } else {
      setForm(initialState);
    }
  }, [selectedUser, open]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, {
          fullName: form.fullName,
          role: form.role,
          branch: form.branch,
          active: form.active,
        });
      } else {
        await createUser(form);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save employee.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">
          {selectedUser ? "Edit Employee" : "Add Employee"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          {!selectedUser && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </>
          )}

          <input
            type="text"
            name="branch"
            placeholder="Branch"
            value={form.branch}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="ADMIN">Admin</option>
          </select>

          {selectedUser && (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={handleChange}
              />
              Active
            </label>
          )}

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
              {selectedUser ? "Update Employee" : "Create Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeModal;