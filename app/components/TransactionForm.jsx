"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";

const TransactionForm = () => {
  const router = useRouter();

  const initialValues = {
    type: "income",
    amount: "",
    category: "",
    date: "",
    note: "",
  };

  const validationSchema = Yup.object({
    type: Yup.string().required("Pilih jenis transaksi"),
    amount: Yup.number()
      .typeError("Jumlah harus angka")
      .positive("Harus lebih dari 0")
      .required("Jumlah wajib diisi"),
    category: Yup.string().required("Kategori wajib diisi"),
    date: Yup.date().required("Tanggal wajib diisi"),
    note: Yup.string().max(100, "Catatan maksimal 100 karakter"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await axios.post("https://689303d6c49d24bce869127c.mockapi.io/transactions", {
        ...values,
        createdAt: new Date().toISOString(),
      });
      resetForm();
      alert("Transaksi berhasil ditambahkan!");
      // Refresh halaman untuk update data
      window.location.reload();
    } catch (error) {
      console.error("Gagal kirim data:", error);
      alert("Gagal menambahkan transaksi!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Jenis Transaksi */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Jenis Transaksi
              </label>
              <Field
                as="select"
                name="type"
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              >
                <option value="income">💰 Pemasukan</option>
                <option value="expense">💸 Pengeluaran</option>
              </Field>
            </div>

            {/* Jumlah */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Jumlah
              </label>
              <Field
                name="amount"
                type="number"
                placeholder="Contoh: 50000"
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Kategori
              </label>
              <Field
                name="category"
                type="text"
                placeholder="Contoh: Makanan"
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              />
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Tanggal */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Tanggal
              </label>
              <Field
                name="date"
                type="date"
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              />
              <ErrorMessage
                name="date"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Catatan */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Catatan
              </label>
              <Field
                name="note"
                as="textarea"
                placeholder="Opsional"
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              />
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Transaksi"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TransactionForm;
