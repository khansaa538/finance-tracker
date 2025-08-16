"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://689303d6c49d24bce869127c.mockapi.io/transactions";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [editForm, setEditForm] = useState({
    type: "",
    amount: "",
    category: "",
    date: "",
    note: "",
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    // Filter transactions based on search and filter
    let filtered = transactions;

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter(trx => trx.type === filterType);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(trx => 
        trx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trx.note?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trx.amount.toString().includes(searchTerm)
      );
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, filterType]);

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

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchTransactions(); // Refresh data
        alert("Transaksi berhasil dihapus!");
      } catch (error) {
        console.error("Gagal menghapus:", error);
        alert("Gagal menghapus transaksi!");
      }
    }
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditForm({
      type: transaction.type,
      amount: transaction.amount,
      category: transaction.category,
      date: transaction.date,
      note: transaction.note || "",
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${editingId}`, editForm);
      setEditingId(null);
      fetchTransactions(); // Refresh data
      alert("Transaksi berhasil diperbarui!");
    } catch (error) {
      console.error("Gagal update:", error);
      alert("Gagal memperbarui transaksi!");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({
      type: "",
      amount: "",
      category: "",
      date: "",
      note: "",
    });
  };

  if (loading) {
    return <p className="text-gray-600">Memuat data...</p>;
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cari Transaksi
            </label>
            <input
              type="text"
              placeholder="Cari berdasarkan kategori, catatan, atau jumlah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter Jenis
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="all">Semua Transaksi</option>
              <option value="income">Pemasukan</option>
              <option value="expense">Pengeluaran</option>
            </select>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Total Pemasukan</p>
              <p className="text-lg font-bold text-green-600">
                Rp {transactions
                  .filter(trx => trx.type === "income")
                  .reduce((sum, trx) => sum + Number(trx.amount), 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Total Pengeluaran</p>
              <p className="text-lg font-bold text-red-600">
                Rp {transactions
                  .filter(trx => trx.type === "expense")
                  .reduce((sum, trx) => sum + Number(trx.amount), 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Saldo</p>
              <p className={`text-lg font-bold ${
                transactions.reduce((sum, trx) => 
                  sum + (trx.type === "income" ? Number(trx.amount) : -Number(trx.amount)), 0
                ) >= 0 ? "text-blue-600" : "text-red-600"
              }`}>
                Rp {transactions.reduce((sum, trx) => 
                  sum + (trx.type === "income" ? Number(trx.amount) : -Number(trx.amount)), 0
                ).toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Total Transaksi</p>
              <p className="text-lg font-bold text-gray-600">
                {transactions.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="grid gap-4">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {searchTerm || filterType !== "all" 
                ? "Tidak ada transaksi yang sesuai dengan filter." 
                : "Belum ada transaksi."}
            </p>
          </div>
        ) : (
          filteredTransactions.map((trx) => (
            <div
              key={trx.id}
              className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              {editingId === trx.id ? (
                // Edit Form
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-gray-800">Edit Transaksi</h4>
                    <div className="space-x-2">
                      <button
                        onClick={handleUpdate}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Jenis
                      </label>
                      <select
                        value={editForm.type}
                        onChange={(e) => setEditForm({...editForm, type: e.target.value})}
                        className="w-full border border-gray-300 rounded p-2 text-sm"
                      >
                        <option value="income">💰 Pemasukan</option>
                        <option value="expense">💸 Pengeluaran</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Jumlah
                      </label>
                      <input
                        type="number"
                        value={editForm.amount}
                        onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
                        className="w-full border border-gray-300 rounded p-2 text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kategori
                      </label>
                      <input
                        type="text"
                        value={editForm.category}
                        onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                        className="w-full border border-gray-300 rounded p-2 text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tanggal
                      </label>
                      <input
                        type="date"
                        value={editForm.date}
                        onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                        className="w-full border border-gray-300 rounded p-2 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Catatan
                    </label>
                    <textarea
                      value={editForm.note}
                      onChange={(e) => setEditForm({...editForm, note: e.target.value})}
                      className="w-full border border-gray-300 rounded p-2 text-sm"
                      rows="2"
                    />
                  </div>
                </div>
              ) : (
                // Display Mode
                <div>
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
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(trx)}
                        className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(trx.id)}
                        className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                  
                  <span className="text-lg font-bold text-gray-800">
                    Rp {Number(trx.amount).toLocaleString()}
                  </span>
                  <p className="text-gray-600">{trx.category}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(trx.date).toLocaleDateString("id-ID")}
                  </p>
                  {trx.note && (
                    <p className="text-gray-500 mt-2 text-sm italic">{trx.note}</p>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
