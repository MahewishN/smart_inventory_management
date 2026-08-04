import { useEffect, useState } from "react";
import {
  getAllUsers,
  activateUser,
  deactivateUser,
} from "../../services/userService";

import EmployeeModal from "../../components/employees/EmployeeModal";

function Employees() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();

      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    setFilteredUsers(
      users.filter((user) =>
        user.fullName.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDeactivate = async (id) => {
    await deactivateUser(id);
    fetchUsers();
  };

  const handleActivate = async (id) => {
    await activateUser(id);
    fetchUsers();
  };

  return (
    <>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Employee Management</h1>

            <p className="text-slate-500">
              Manage employee accounts
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedUser(null);
              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            + Add Employee
          </button>
        </div>

        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={handleSearch}
          className="w-full md:w-80 border rounded-lg px-4 py-2 mb-6"
        />

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Role</th>
                <th className="text-left p-4">Branch</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-4">{user.fullName}</td>

                  <td className="p-4">{user.email}</td>

                  <td className="p-4">{user.role}</td>

                  <td className="p-4">{user.branch}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                
                <td className="p-4">
  <div className="flex gap-2">

    <button
      onClick={() => handleEdit(user)}
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm transition"
    >
      Edit
    </button>

    {user.active ? (
      <button
        onClick={() => handleDeactivate(user.id)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition"
      >
        Deactivate
      </button>
    ) : (
      <button
        onClick={() => handleActivate(user.id)}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm transition"
      >
        Activate
      </button>
    )}

  </div>
</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EmployeeModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchUsers}
        selectedUser={selectedUser}
      />
    </>
  );
}

export default Employees;