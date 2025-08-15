"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://689303d6c49d24bce869127c.mockapi.io/transactions";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(API_URL);
        setTransactions(response.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <p className="text-gray-600">Memuat data...</p>;
  }

  return (
    <div className="grid gap-4">
      {transactions.length === 0 ? (
        <p className="text-gray-500">Belum ada transaksi.</p>
      ) : (
        transactions.map((trx) => (
          <div
            key={trx.id}
            className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  trx.type === "income"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {trx.type === "income" ? "Pemasukan" : "Pengeluaran"}
              </span>
              <span className="text-lg font-bold text-gray-800">
                Rp {Number(trx.amount).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-600">{trx.category}</p>
            <p className="text-sm text-gray-400">
              {new Date(trx.date).toLocaleDateString("id-ID")}
            </p>
            {trx.note && (
              <p className="text-gray-500 mt-2 text-sm italic">{trx.note}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
