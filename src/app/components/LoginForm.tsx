"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { loginSchema } from "../lib/validation";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
    const [forgotPasswordError, setForgotPasswordError] = useState("");
    const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Validate with Zod
        const result = loginSchema.safeParse({ username, password });

        if (!result.success) {
            setError(result.error.errors.map(err => err.message).join(", "));
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://penyewaan.vercel.app/api/v1/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    admin_username: username,
                    admin_password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            console.log("Login successful:", data);
            localStorage.setItem("token", data.token);
            router.push("/");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setForgotPasswordError("");
        setForgotPasswordSuccess(false);
        console.log(error)

        try {
            const response = await fetch("https://penyewaan.vercel.app/api/v1/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    admin_email: forgotPasswordEmail,
                }),
            });

            const data = await response.json();

            console.log(data)
            if (!response.ok) {
                throw new Error(data.message || "Failed to send reset link");
            }

            setForgotPasswordSuccess(true);
        } catch (err: any) {
            setForgotPasswordError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
                <h2 className="text-xl font-semibold text-gray-700">Sign in with username</h2>
                <p className="text-gray-500 text-sm mb-4">Enter your username and password to continue.</p>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                            required
                        />
                    </div>
                    <a onClick={() => setForgotPasswordSuccess(true)} className="text-blue-500 hover:text-blue-700 transition cursor-pointer">
                        Forgot Password?
                    </a>
                    <button 
                        type="submit" 
                        className={`w-full p-3 rounded-lg hover:bg-gray-800 transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"}`}
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
                <div className="my-4 text-gray-500 text-sm">
                    Don't have an account?{" "}
                    <a onClick={() => router.push("/auth/register")} className="text-blue-500 hover:text-blue-700 transition cursor-pointer">
                        Register here
                    </a>
                </div>
                {forgotPasswordSuccess && (
                    <div className="my-4 text-gray-500 text-sm">
                        <h2 className="text-xl font-semibold text-gray-700">Reset Password</h2>
                        <p className="text-gray-500 text-sm mb-4">Enter your email to receive a password reset link.</p>
                        {forgotPasswordError && <p className="text-red-500 text-sm">{forgotPasswordError}</p>}
                        <form onSubmit={handleForgotPassword} className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={forgotPasswordEmail}
                                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                                    required
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                            >
                                Send Reset Link
                            </button>
                        </form>
                        {forgotPasswordSuccess && <p className="text-green-500 text-sm">Reset link sent successfully!</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
