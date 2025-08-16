"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export default function RegisterContent() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Debug Firebase config
  useEffect(() => {
    console.log("=== DEBUG FIREBASE CONFIG ===");
    console.log("API Key exists:", !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
    console.log("Auth Domain exists:", !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
    console.log("Project ID exists:", !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
    console.log("Storage Bucket exists:", !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
    console.log("Messaging Sender ID exists:", !!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID);
    console.log("App ID exists:", !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID);
    console.log("Measurement ID exists:", !!process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID);
    console.log("Auth object:", auth);
    console.log("===============================");
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log("Mencoba mendaftar dengan email:", email);
      console.log("Password length:", password.length);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Pendaftaran berhasil:", userCredential.user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error pendaftaran:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      
      // Pesan error yang lebih spesifik
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrorMsg("Email sudah terdaftar. Silakan login atau gunakan email lain.");
          break;
        case 'auth/invalid-email':
          setErrorMsg("Format email tidak valid.");
          break;
        case 'auth/weak-password':
          setErrorMsg("Password terlalu lemah. Minimal 6 karakter.");
          break;
        case 'auth/network-request-failed':
          setErrorMsg("Koneksi internet bermasalah. Coba lagi.");
          break;
        case 'auth/invalid-api-key':
          setErrorMsg("Konfigurasi Firebase bermasalah. Hubungi admin.");
          break;
        case 'auth/operation-not-allowed':
          setErrorMsg("Pendaftaran dengan email/password tidak diaktifkan di Firebase.");
          break;
        default:
          setErrorMsg(`Pendaftaran gagal: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 via-green-400 to-blue-400">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-teal-600 mb-2">
          Daftar Akun Finance Tracker
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Buat akun baru untuk mengelola keuangan Anda
        </p>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-600 text-center text-sm">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
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
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
          >
            Daftar
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Sudah punya akun?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-teal-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
} 