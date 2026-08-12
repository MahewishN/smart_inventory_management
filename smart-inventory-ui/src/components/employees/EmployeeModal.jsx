import { useEffect, useState } from "react";
import { createUser, updateUser } from "../../services/userService";

const initialState = {
    fullName: "",
    email: "",
    password: "",
    role: "EMPLOYEE",
    branch: "",
};

function EmployeeModal({
    open,
    onClose,
    onSuccess,
    selectedUser,
}) {

    const [form, setForm] = useState(initialState);

    // ============================
    // LOAD FORM
    // ============================

    useEffect(() => {

        if (selectedUser) {

            setForm({
                fullName: selectedUser.fullName,
                email: selectedUser.email,
                password: "",
                role: selectedUser.role,
                branch: selectedUser.branch,
            });

        } else {

            setForm(initialState);

        }

    }, [selectedUser, open]);


    // ============================
    // HANDLE CHANGE
    // ============================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });

    };


    // ============================
    // SUBMIT
    // ============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (selectedUser) {

                // EDIT EMPLOYEE
                // Only editable fields are sent.

                await updateUser(
                    selectedUser.id,
                    {
                        fullName: form.fullName,
                        branch: form.branch,
                    }
                );

            } else {

                // CREATE EMPLOYEE

                await createUser({

                    fullName: form.fullName,
                    email: form.email,
                    password: form.password,
                    role: form.role,
                    branch: form.branch,

                });

            }

            onSuccess();
            onClose();

        } catch (error) {

            console.error(
                "Failed to save employee:",
                error
            );

            alert("Failed to save employee.");

        }

    };


    // ============================
    // MODAL
    // ============================

    if (!open) {
        return null;
    }


    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

                {/* ============================
                    TITLE
                ============================ */}

                <h2 className="text-2xl font-bold text-slate-800 mb-6">

                    {selectedUser
                        ? "Edit Employee"
                        : "Add Employee"
                    }

                </h2>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    {/* ============================
                        FULL NAME
                    ============================ */}

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={form.fullName}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    />


                    {/* ============================
                        CREATE ONLY FIELDS
                    ============================ */}

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


                    {/* ============================
                        BRANCH
                    ============================ */}

                    <input
                        type="text"
                        name="branch"
                        placeholder="Branch"
                        value={form.branch}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    />


                    {/* ============================
                        ROLE - CREATE ONLY
                    ============================ */}

                    {!selectedUser && (

                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                        >

                            <option value="EMPLOYEE">
                                Employee
                            </option>

                            <option value="ADMIN">
                                Admin
                            </option>

                        </select>

                    )}


                    {/* ============================
                        BUTTONS
                    ============================ */}

                    <div className="flex justify-end gap-3 pt-2">

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

                            {selectedUser
                                ? "Update Employee"
                                : "Create Employee"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EmployeeModal;