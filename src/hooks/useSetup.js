import { useState } from "react";
import { NAMA_DEFAULT } from "../data/pion";

// Pengaturan sebelum main (jumlah pemain, mode, nama, bidak). Disimpan di App agar
// tetap ada saat pemain kembali ke layar pengaturan lewat "Main Lagi".
export function useSetup() {
  const [jumlah, setJumlah] = useState(4);
  const [mode, setMode] = useState("ronde");
  const [aturData, setAturData] = useState(() => NAMA_DEFAULT.map((nama, i) => ({ nama, pion: i })));

  const setNama = (i, nama) => setAturData(d => d.map((x, k) => (k === i ? { ...x, nama } : x)));

  // Memilih bidak yang sudah dipakai pemain lain = bertukar bidak, supaya tidak ada yang dobel.
  const gantiPion = (i, j) => setAturData(d => {
    const lain = d.findIndex((x, k) => k !== i && k < jumlah && x.pion === j);
    return d.map((x, k) => (k === i ? { ...x, pion: j } : k === lain ? { ...x, pion: d[i].pion } : x));
  });

  return { jumlah, setJumlah, mode, setMode, aturData, setNama, gantiPion };
}
