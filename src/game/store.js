// Penyimpanan state kecil di luar React. Alur permainan bersifat async (menunggu kartu,
// dadu, jawaban), jadi ia membaca state terbaru lewat get() dan komponen berlangganan lewat subscribe().
export function buatStore(awal) {
  let state = awal;
  const pelanggan = new Set();
  return {
    get: () => state,
    ubah(patch) {
      state = { ...state, ...(typeof patch === "function" ? patch(state) : patch) };
      pelanggan.forEach(f => f());
    },
    subscribe(f) {
      pelanggan.add(f);
      return () => pelanggan.delete(f);
    },
  };
}
