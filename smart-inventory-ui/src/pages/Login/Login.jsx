import { login } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import {
    Package,
    ChartColumn,
    BrainCircuit,
    ShieldCheck
} from "lucide-react";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login: saveLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        console.log("Email:", email);
        console.log("Password:", password);

        const response = await login(email, password);

        console.log("Login Response:", response);

        saveLogin(
        {
            userId: response.userId,
            fullName: response.fullName,
            email: response.email,
            role: response.role,
        },
        response.token
    );

    console.log("Saved to Context");

    navigate("/dashboard");

    console.log("Navigated");

    } catch (error) {
        console.log("Status:", error.response?.status);
        console.log("Response Data:", error.response?.data);
        console.log("Headers:", error.response?.headers);
        console.log("Full Error:", error);
    }

};
    return (

        <div className="min-h-screen grid lg:grid-cols-2 bg-slate-100">

            {/* LEFT PANEL */}

            <div className="hidden lg:flex flex-col justify-center px-20 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white">

                <h1 className="text-6xl font-extrabold">
                    Inventra AI
                </h1>

                <p className="mt-4 text-2xl text-blue-100">
                    Inventory Intelligence Platform
                </p>

                <p className="mt-2 text-lg text-slate-300">
                    Predict. Manage. Optimize.
                </p>

                <div className="mt-14 space-y-8">

                    <div className="flex items-center gap-4">

                        <Package size={30} />

                        <div>

                            <h3 className="font-semibold text-xl">
                                Inventory Tracking
                            </h3>

                            <p className="text-slate-300">
                                Manage products effortlessly.
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-4">

                        <ChartColumn size={30} />

                        <div>

                            <h3 className="font-semibold text-xl">
                                Analytics Dashboard
                            </h3>

                            <p className="text-slate-300">
                                Visualize inventory performance.
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-4">

                        <BrainCircuit size={30} />

                        <div>

                            <h3 className="font-semibold text-xl">
                                AI Forecasting
                            </h3>

                            <p className="text-slate-300">
                                Predict future stock demand.
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-4">

                        <ShieldCheck size={30} />

                        <div>

                            <h3 className="font-semibold text-xl">
                                Secure Access
                            </h3>

                            <p className="text-slate-300">
                                JWT Authentication & Role Security.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* RIGHT PANEL */}

            <div className="flex items-center justify-center px-6">

                <Card className="w-full max-w-md">

                    <h2 className="text-4xl font-bold text-slate-800">

                        Welcome Back 👋

                    </h2>

                    <p className="mt-2 text-slate-500">

                        Sign in to continue to Inventra AI

                    </p>

                    <form
                        className="mt-8 space-y-5"
                        onSubmit={handleSubmit}
                    >

                        <div>

                            <label className="font-medium block mb-2">
                                Email
                            </label>

                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>

                        <div>

                            <label className="font-medium block mb-2">
                                Password
                            </label>

                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>

                        <Button type="submit">

                            Sign In

                        </Button>

                    </form>

                </Card>

            </div>

        </div>

    );

}

export default Login;