// Urutan juara: bintang terbanyak, lalu stempel terbanyak.
export function urutkanPemain(pemain) {
  return pemain.slice().sort((a, b) => b.bintang - a.bintang || b.stempel.length - a.stempel.length);
}

// Semua pemain yang nilainya sama dengan juara pertama (seri).
export function cariJuara(urut) {
  const j = urut[0];
  return urut.filter(p => p.bintang === j.bintang && p.stempel.length === j.stempel.length);
}
