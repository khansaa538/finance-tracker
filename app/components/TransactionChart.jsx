"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_URL = "https://689303d6c49d24bce869127c.mockapi.io/transactions";

export default function TransactionChart() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(API_URL);
        const transactions = response.data;

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

    fetchTransactions();
  }, []);

  const data = {
    labels: ["Pemasukan", "Pengeluaran"],
    datasets: [
      {
        label: "Jumlah (Rp)",
        data: [income, expense],
        backgroundColor: ["#16a34a", "#dc2626"], // hijau untuk income, merah untuk expense
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Grafik Keuangan" },
    },
  };

  return (
    <div className="w-full">
      <Bar data={data} options={options} />
    </div>
  );
}
