# Panduan Deployment Finance Tracker App

## Setup Environment Variables

Sebelum deploy, pastikan environment variables Firebase sudah diset dengan benar.

### 1. Setup Firebase Project

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Buat project baru atau pilih project yang sudah ada
3. Aktifkan Authentication:
   - Buka **Authentication** > **Sign-in method**
   - Aktifkan **Email/Password**
4. Dapatkan konfigurasi:
   - Buka **Project Settings** > **General**
   - Scroll ke bagian **Your apps**
   - Klik icon web (</>) untuk menambah web app
   - Copy konfigurasi yang muncul

### 2. Environment Variables

Buat file `.env.local` di root project dengan konfigurasi berikut:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. Deployment di Vercel

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Fix routing and deployment issues"
   git push origin main
   ```

2. **Connect di Vercel**
   - Buka [Vercel Dashboard](https://vercel.com/dashboard)
   - Klik **New Project**
   - Import repository dari GitHub
   - Pilih repository finance-tracker-app

3. **Setup Environment Variables di Vercel**
   - Di halaman project settings Vercel
   - Buka tab **Environment Variables**
   - Tambahkan semua environment variables Firebase yang sama seperti di `.env.local`

4. **Deploy**
   - Klik **Deploy**
   - Tunggu proses build selesai

### 4. Troubleshooting

#### Error 404
- Pastikan struktur routing sudah benar (folder `register/`, `login/`, `dashboard/` dengan file `page.jsx`)
- Pastikan file `vercel.json` sudah ada

#### Firebase Error
- Pastikan semua environment variables sudah diset di Vercel
- Pastikan Authentication sudah diaktifkan di Firebase Console
- Pastikan domain Vercel sudah ditambahkan ke authorized domains di Firebase

#### Build Error
- Pastikan semua dependencies sudah terinstall
- Pastikan tidak ada import path yang salah
- Gunakan `npm run build` untuk test build lokal

### 5. Testing

Setelah deploy berhasil:
1. Buka URL Vercel yang diberikan
2. Test halaman register
3. Test halaman login
4. Test dashboard (setelah login)

### 6. Custom Domain (Opsional)

Jika ingin menggunakan custom domain:
1. Buka project settings di Vercel
2. Buka tab **Domains**
3. Tambahkan custom domain
4. Update DNS records sesuai instruksi Vercel

## Struktur File yang Benar

```
app/
├── page.jsx                 # Home page (redirect ke register)
├── layout.tsx              # Root layout
├── globals.css             # Global styles
├── register/
│   └── page.jsx            # Register page
├── login/
│   └── page.jsx            # Login page
├── dashboard/
│   └── page.jsx            # Dashboard page
├── components/
│   ├── RegisterContent.jsx
│   ├── LoginContent.jsx
│   ├── DashboardContent.jsx
│   ├── Navbar.jsx
│   ├── TransactionForm.jsx
│   ├── TransactionList.jsx
│   ├── TransactionChart.jsx
│   └── FinanceCard.jsx
└── firebase/
    └── config.jsx          # Firebase configuration
```

## Support

Jika masih mengalami masalah, cek:
1. Console browser untuk error JavaScript
2. Network tab untuk error API
3. Vercel build logs untuk error build
4. Firebase Console untuk error authentication 