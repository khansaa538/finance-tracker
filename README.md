# Finance Tracker App

Aplikasi web untuk mengelola keuangan pribadi dengan fitur tracking pemasukan dan pengeluaran.

## Fitur

- 🔐 Autentikasi dengan Firebase
- 💰 Tracking pemasukan dan pengeluaran
- 📊 Grafik visualisasi keuangan
- 📱 Responsive design
- 🎨 Modern UI dengan Tailwind CSS

## Teknologi

- **Frontend**: Next.js 15, React 19
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Charts**: Chart.js
- **State Management**: Redux Toolkit

## Setup Development

1. Clone repository
```bash
git clone <repository-url>
cd finance-tracker-app
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
Buat file `.env.local` dengan konfigurasi Firebase:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. Jalankan development server
```bash
npm run dev
```

## Deployment di Vercel

1. Push code ke GitHub
2. Connect repository di Vercel
3. Setup environment variables di Vercel dashboard
4. Deploy otomatis akan berjalan

### Environment Variables di Vercel

Pastikan semua environment variables Firebase sudah diset di Vercel dashboard:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

## Struktur Routing

- `/` - Redirect ke `/register`
- `/register` - Halaman pendaftaran
- `/login` - Halaman login
- `/dashboard` - Dashboard utama (perlu login)

## Build & Deploy

```bash
npm run build
npm start
```

## License

MIT License
