import { JENIS_KARTU } from "../data/papan";

export function acak(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Kartu diacak dan tidak berulang sampai tumpukan habis, lalu diacak lagi.
export function ambilKartu(deck, jenis) {
  if (!deck[jenis] || !deck[jenis].length) deck[jenis] = acak(JENIS_KARTU[jenis].data);
  return deck[jenis].pop();
}
