"use client";

import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";

export default function Navbar({ user }) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center bg-white shadow-lg px-6 py-4 rounded-b-2xl sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">💰</span>
        <h1 className="text-xl md:text-2xl font-bold text-teal-600">
          Finance Tracker
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {user && (
          <span className="hidden md:block text-gray-600 font-medium">
            {user.email}
          </span>
        )}
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-teal-500 to-green-400 text-white px-5 py-2 rounded-lg shadow-md hover:from-teal-600 hover:to-green-500 transition duration-300 font-semibold"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
