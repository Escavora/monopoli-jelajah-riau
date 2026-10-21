export const MAX_RONDE = 3;
export const DURASI_WAKTU = 1200;

export const STATE_AWAL = {
  layar: "layarPembuka",
  mode: "ronde",
  pemain: [],
  giliran: 0,
  ronde: 1,
  maxRonde: MAX_RONDE,
  sisaDetik: DURASI_WAKTU,
  jeda: false,
  sibuk: false,
  selesai: false,
  kunci: false,        // Mode Guru: tandai jawaban benar
  guruTerbuka: false,
  // tampilan sementara
  sorot: null,         // nomor petak yang sedang disorot saat bidak berjalan
  lompat: { id: null, n: 0 }, // pemicu animasi lompat bidak
  kartuNyala: null,    // jenis tumpukan yang harus diambil
  daduRot: null,       // transform CSS dadu setelah dilempar
};
