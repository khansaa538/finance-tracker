"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://689303d6c49d24bce869127c.mockapi.io/transactions";

export default function FinanceCard() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL);
        const transactions = res.data;

        const totalIncome = transactions
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + Number(t.amount), 0);

        const totalExpense = transactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + Number(t.amount), 0);

        setIncome(totalIncome);
        setExpense(totalExpense);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchData();
  }, []);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Pemasukan */}
      <div className="bg-green-100 rounded-xl p-4 shadow-md">
        <h4 className="text-lg font-semibold text-green-800">Pemasukan</h4>
        <p className="text-2xl font-bold text-green-700">
          Rp {income.toLocaleString("id-ID")}
        </p>
      </div>

      {/* Pengeluaran */}
      <div className="bg-red-100 rounded-xl p-4 shadow-md">
        <h4 className="text-lg font-semibold text-red-800">Pengeluaran</h4>
        <p className="text-2xl font-bold text-red-700">
          Rp {expense.toLocaleString("id-ID")}
        </p>
      </div>

      {/* Saldo */}
      <div className="bg-blue-100 rounded-xl p-4 shadow-md">
        <h4 className="text-lg font-semibold text-blue-800">Saldo</h4>
        <p className="text-2xl font-bold text-blue-700">
          Rp {balance.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}
