"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { registerSchema } from "../lib/validationreq";

export default function RegisterForm() {
    const [adminUsername, setAdminUsername] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Validasi dengan Zod
        // const result = registerSchema.safeParse({ adminUsername, adminEmail, adminPassword, confirmPassword });

        // if (!result.success) {
        //     setError(result.error.errors.map(err => err.message).join(", "));
        //     setLoading(false);
        //     return;
        // }

        const apiUrl = "https://penyewaan.vercel.app/api/v1/auth/signup";

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    admin_username: adminUsername, 
                    admin_email: adminEmail, 
                    admin_password: adminPassword,
                    confirm_password: confirmPassword

                }),
            });

            const data = await response.json();
            
            console.log(data)

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            alert("Registration successful");
            
            // Simpan token ke localStorage (sesuaikan dengan metode otentikasi Anda)
            localStorage.setItem('token', data.token);

            // Redirect ke halaman home
            router.push("/auth/login");
        } catch (err: any) {
            setError(err.message);
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
                <h2 className="text-xl font-semibold text-gray-700">Create an Account</h2>
                <p className="text-gray-500 text-sm mb-4">Enter your details to create a new account.</p>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <form onSubmit={handleRegister} className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Admin Username" 
                        value={adminUsername} 
                        onChange={(e) => setAdminUsername(e.target.value)} 
                        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        required
                    />
                    <input 
                        type="email" 
                        placeholder="Admin Email" 
                        value={adminEmail} 
                        onChange={(e) => setAdminEmail(e.target.value)} 
                        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Admin Password" 
                        value={adminPassword} 
                        onChange={(e) => setAdminPassword(e.target.value)} 
                        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        required
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <div className="my-4 text-gray-500 text-sm">
                    Already have an account?{" "}
                    <a 
                        onClick={() => router.push("/auth/login")}
                        className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
                    >
                        Login here
                    </a>
                </div>
            </div>
        </div>
    );
}
