"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import Navbar from "../components/Navbar";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import TransactionChart from "../components/TransactionChart";
import FinanceCard from "../components/FinanceCard";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 via-green-400 to-blue-400 text-gray-800">
      {/* Navbar */}
      <Navbar user={user} />

      {/* Dashboard Content */}
      <main className="p-8">
        {/* Ringkasan Saldo */}
        <FinanceCard />

        {/* Grid: Form & Grafik */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Card: Form Transaksi */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-3 text-teal-600">Tambah Transaksi</h3>
            <TransactionForm />
          </div>

          {/* Card: Grafik Keuangan */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-3 text-teal-600">Grafik Keuangan</h3>
            <TransactionChart />
          </div>
        </div>

        {/* Card: Daftar Transaksi */}
        <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold mb-3 text-teal-600">Daftar Transaksi</h3>
          <TransactionList />
        </div>
      </main>
    </div>
  );
}
