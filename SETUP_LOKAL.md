# Panduan Setup Lokal - L2M Tracker

## Prasyarat
- Node.js 18+ (download dari https://nodejs.org/)
- npm (comes with Node.js)

## Langkah Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Inisialisasi Database
Jalankan script untuk membuat tabel database:
```bash
node init-db.js
```
Database akan dibuat di file `app.db` secara otomatis.

### 3. Jalankan Development Server

#### 📍 Windows Users:
**Double-click file `dev.bat`** atau run:
```bash
dev.bat
```

#### 🐧 Mac/Linux Users:
```bash
npx cross-env NODE_ENV=development tsx server/index.ts
```

Atau gunakan npm script langsung:
```bash
npm run dev
```

Server akan berjalan di **http://localhost:5000**

## Setup Database Lama (Reset)
Jika ingin hapus semua data dan mulai fresh:

#### Windows:
```bash
del app.db app.db-shm app.db-wal
node init-db.js
dev.bat
```

#### Mac/Linux:
```bash
rm app.db app.db-shm app.db-wal
node init-db.js
npm run dev
```

## Environment Variables (Opsional)
Buat file `.env` di root folder untuk customize:
```env
# Lokasi database (default: ./app.db)
DATABASE_PATH=./app.db

# Discord Bot (opsional)
DISCORD_TOKEN=your_token_here
DISCORD_CLIENT_ID=your_client_id_here
```

## Struktur Database
Database SQLite menggunakan 3 tabel:
- `users` - Untuk login admin
- `discord_config` - Konfigurasi Discord per Guild
- `boss_state` - Status boss (last killed, spawn time)

## Build untuk Production
```bash
npm run build
npm run start
```

## Troubleshooting

### ❌ NODE_ENV tidak recognized (Windows)
**Solusi:** Gunakan file `dev.bat` untuk menjalankan server di Windows.

### ❌ Database error saat startup?
Hapus file lama dan biarkan dibuat ulang:
```bash
# Windows:
del app.db app.db-shm app.db-wal

# Mac/Linux:
rm app.db app.db-shm app.db-wal

# Kemudian buat ulang:
node init-db.js
```

### ❌ Port 5000 sudah terpakai?
Ubah PORT sebelum jalankan:

**Windows (Command Prompt):**
```bash
set PORT=3000 && dev.bat
```

**Windows (PowerShell):**
```bash
$env:PORT=3000; dev.bat
```

**Mac/Linux:**
```bash
PORT=3000 npm run dev
```

### ❌ Modul tidak ditemukan?
Update dependencies:
```bash
npm install
```

### ❌ Vite dev server tidak connect?
Tunggu beberapa detik, browser akan auto-reload. Jika masih tidak bisa:
1. Tutup browser tab
2. Buka http://localhost:5000 ulang

## Menggunakan Ngrok

1. **Download ngrok** dari https://ngrok.com/download

2. **Jalankan app lokal:**
   ```bash
   # Windows: double-click dev.bat
   # atau di terminal:
   dev.bat
   ```

3. **Di terminal baru, buka tunnel ngrok:**
   ```bash
   ngrok http 5000
   ```

4. **Copy URL** yang muncul (misalnya `https://abc123.ngrok.io`) dan bagikan

## Catatan Teknis
- SQLite dijalankan dengan WAL mode untuk performa lebih baik
- Database file ada di root folder, mudah untuk backup
- Semua dependencies sudah terinstall (tidak perlu setup PostgreSQL)
- Cross-env digunakan untuk compatibility Windows/Mac/Linux
