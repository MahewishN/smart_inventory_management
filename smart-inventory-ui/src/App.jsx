import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import Transactions from "./pages/Transactions/Transactions";
import Employees from "./pages/Employees/Employees";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import { useAuth } from "./context/AuthContext";

function App() {

    const { user } = useAuth();

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route path="/products" element={<Products />} />

                    <Route path="/categories" element={<Categories />} />

                    <Route path="/transactions" element={<Transactions />} />

                    <Route
                        path="/employees"
                        element={
                            user?.role === "ADMIN"
                                ? <Employees />
                                : <Navigate to="/dashboard" replace />
                        }
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default App;