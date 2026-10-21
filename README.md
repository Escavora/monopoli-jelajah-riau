# Monopoli Jelajah Riau

Game papan edukatif PPKN kelas 3 SD, dibuat dengan React + Vite.

## Menjalankan

```bash
npm install
npm run dev       # mode pengembangan (http://localhost:5173)
npm run build     # hasil di dist/index.html
```

`dist/index.html` adalah **satu file mandiri** (JS dan CSS sudah menyatu), jadi bisa dibuka langsung
dari folder tanpa server dan tanpa internet. Hanya font Google yang butuh internet; tanpa itu tampil dengan font cadangan.

## Perangkat

Diuji di desktop, iPad (mendatar dan tegak), dan ponsel (tegak dan mendatar). Di ponsel nama petak disembunyikan karena terlalu kecil; ketuk petak untuk melihat namanya. Di layar tegak, papan tampil di atas dan panel skor di bawahnya (halaman bisa digulir).

## Mengedit soal (untuk guru)

Semua soal ada di satu file: [`src/data/bankSoal.js`](src/data/bankSoal.js).
`benar` adalah nomor opsi yang benar (0 = pertama, 1 = kedua, 2 = ketiga). Setelah mengedit, jalankan `npm run build` lagi.

## Struktur proyek

```
src/
  data/       bankSoal.js (soal), papan.js (32 petak, jenis kartu), pion.js (bidak)
  game/       engine.js (aturan giliran, dadu, kartu, Mode Guru; tanpa DOM), store.js, deck.js, peringkat.js
  context/    ToastContext, ModalContext (modal berbasis Promise), GameContext
  screens/    LayarPembuka, LayarCara, LayarAtur, LayarPapan, LayarAkhir
  board/      Papan, Petak, Tengah, PetaRiau, DaduBox, TumpukanKartu, LapisPion, PanelSamping
  modals/     KartuModal, Pesan, PilihanGanda, SoalTerbuka, ModalGuru
  components/ Bingkai, Token, Medali, Toast, Konfeti
  icons/      Icon.jsx + ikon SVG per kelompok (lokasi, riau, kartu, ui)
  audio/      sfx.js (efek suara), musik.js (musik latar zapin), audioContext.js
  hooks/      useSetup, useMusikLatar
  styles/     CSS per bagian; urutan impor di styles/index.css menentukan cascade
```

Aturan permainan ada di `game/engine.js`; komponen hanya membaca state lewat `useGame()` dan memanggil aksi lewat `useAksi()`.

## GitHub Pages

Workflow `.github/workflows/deploy.yml` membangun dan menerbitkan `dist/` setiap push ke `main`.
Di GitHub: **Settings → Pages → Source: GitHub Actions**.
