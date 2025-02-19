  "use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

// Definisikan tipe data untuk context
interface AuthContextType {
    user: string | null;
    login: (username: string) => void;
    logout: () => void;
}

// Buat context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<string | null>(null);
    const router = useRouter();

    // Simpan user setelah login
    const login = (username: string) => {
        setUser(username);
        router.push("/home"); // Arahkan ke home setelah login
    };

    // Logout user
    const logout = () => {
        setUser(null);
        router.push("/login"); // Arahkan ke login setelah logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook untuk menggunakan context
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth harus digunakan di dalam AuthProvider");
    }
    return context;
}
