# MYOS — My Operating System

MYOS adalah aplikasi web personal productivity dashboard untuk mengelola tugas, proyek, tujuan, catatan, kalender, dan produktivitas. Aplikasi ini dibangun dengan React dan TypeScript menggunakan Vite.

## Teknologi

- React 18 dan TypeScript
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React

## Menjalankan proyek

Pastikan Node.js dan npm sudah terpasang.

```bash
npm install
npm run dev
```

Buka alamat yang ditampilkan Vite di terminal, biasanya `http://localhost:5173`.

Perintah lain yang tersedia:

```bash
npm run build    # Memeriksa TypeScript dan membuat build produksi
npm run preview  # Menjalankan preview build produksi
```

## Struktur proyek

```text
src/
├── components/
│   ├── dashboard/   # Komponen khusus dashboard, termasuk grafik produktivitas
│   ├── layout/      # Kerangka halaman, sidebar, topbar, dan logo
│   └── ui/          # Komponen UI yang digunakan kembali
├── data/            # Data contoh awal untuk task, project, goal, notes, dan lainnya
├── lib/             # Helper umum
├── pages/           # Halaman aplikasi
├── routes/          # Konfigurasi navigasi
├── store/           # State bersama dan penyimpanan localStorage
├── types/           # Tipe data TypeScript
├── App.tsx          # Definisi rute
├── index.css        # Gaya global dan variabel tema
└── main.tsx         # Entry point React
```

## Halaman aplikasi

| Rute | Halaman | Fungsi |
| --- | --- | --- |
| `/dashboard` | Dashboard | Ringkasan task, proyek, deadline, dan grafik |
| `/tasks` | Tasks | Melihat, mencari, memfilter, dan membuat task |
| `/tasks/:id` | Task detail | Melihat detail task |
| `/projects` | Projects | Melihat dan membuat proyek |
| `/projects/:id` | Project detail | Melihat detail proyek dan task terkait |
| `/goals` | Goals | Melihat tujuan dan milestone, serta membuat goal |
| `/notes` | Notes | Melihat, mencari, memfilter, dan membuat catatan |
| `/knowledge` | Knowledge Base | Ringkasan dan daftar catatan terbaru |
| `/calendar` | Calendar | Kalender dengan event contoh |
| `/assistant` | MYOS AI | Antarmuka chat demo |
| `/analytics` | Analytics | Ringkasan dan grafik produktivitas |
| `/settings` | Settings | Preferensi tampilan dan pengaturan demo |

Akses ke `/` akan diarahkan ke `/dashboard`.

## Data dan penyimpanan

Data awal aplikasi berada di `src/data/`. State untuk tasks, projects, goals, dan notes dikelola oleh `StoreProvider` di `src/store/StoreContext.tsx`. Perubahan pada data tersebut disimpan di browser menggunakan `localStorage` dengan key `myos:data:v1`.

Data ini bersifat lokal pada browser yang digunakan. Saat ini belum ada backend atau sinkronisasi antarperangkat.

## Status implementasi

Proyek ini masih berupa prototype front-end. Beberapa fitur dan data menggunakan contoh atau placeholder:

- MYOS AI memberikan respons demo dan belum terhubung ke API.
- Kalender menggunakan event contoh dan menampilkan Oktober 2026.
- Sebagian angka pada Analytics dan Knowledge Base masih statis.
- Beberapa kontrol seperti pencarian topbar, notifikasi, serta aksi Edit/Delete task belum memiliki implementasi lengkap.
- Pengaturan selain tema belum tersimpan sebagai preferensi persisten.

## Tema

Tema gelap merupakan tema awal. Pilihan tema terang mengubah class pada elemen `<html>` dan menggunakan variabel warna yang didefinisikan di `src/index.css`.
