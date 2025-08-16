"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import Navbar from "./Navbar";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import TransactionChart from "./TransactionChart";
import FinanceCard from "./FinanceCard";

export default function DashboardContent() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <p className="text-center mt-20 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 via-green-400 to-blue-400 text-gray-800">
      {/* Navbar */}
      <Navbar user={user ?? { email: "" }} />

      {/* Dashboard Content */}
      <main className="p-8 max-w-7xl mx-auto">
        {/* Ringkasan Saldo */}
        <FinanceCard />

        {/* Grid: Form & Grafik */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-8 mb-6">
          {/* Card: Form Transaksi */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-semibold mb-3 text-teal-600">
              Tambah Transaksi
            </h3>
            <TransactionForm />
          </div>

          {/* Card: Grafik Keuangan */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-semibold mb-3 text-teal-600">
              Grafik Keuangan
            </h3>
            <TransactionChart />
          </div>
        </div>

        {/* Card: Daftar Transaksi */}
        <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition duration-300">
          <h3 className="text-xl font-semibold mb-3 text-teal-600">
            Daftar Transaksi
          </h3>
          <TransactionList />
        </div>
      </main>
    </div>
  );
} 