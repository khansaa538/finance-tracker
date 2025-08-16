"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export default function LoginContent() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Mencoba login dengan email:", email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login berhasil:", userCredential.user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error login:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      
      // Pesan error yang lebih spesifik
      switch (error.code) {
        case 'auth/user-not-found':
          setErrorMsg("Email tidak terdaftar. Silakan daftar terlebih dahulu.");
          break;
        case 'auth/wrong-password':
          setErrorMsg("Password salah. Periksa kembali password Anda.");
          break;
        case 'auth/invalid-email':
          setErrorMsg("Format email tidak valid.");
          break;
        case 'auth/too-many-requests':
          setErrorMsg("Terlalu banyak percobaan login. Coba lagi nanti.");
          break;
        case 'auth/network-request-failed':
          setErrorMsg("Koneksi internet bermasalah. Coba lagi.");
          break;
        case 'auth/invalid-api-key':
          setErrorMsg("Konfigurasi Firebase bermasalah. Hubungi admin.");
          break;
        default:
          setErrorMsg(`Login gagal: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 via-green-400 to-blue-400">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-teal-600 mb-2">
          Login Akun Finance Tracker
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Kelola keuangan Anda dengan mudah
        </p>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-600 text-center text-sm">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black placeholder-gray-400"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black placeholder-gray-400"
              placeholder="Masukkan password Anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
          >
            Masuk
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Belum punya akun?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-teal-600 font-medium cursor-pointer hover:underline"
          >
            Daftar
          </span>
        </p>
      </div>
    </div>
  );
} 