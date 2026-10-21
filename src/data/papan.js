// Susunan papan: 32 petak berjalan searah jarum jam dari START.
// ­ = tanda pemenggalan lunak, supaya kata panjang boleh terpotong di petak sempit.
import { KARTU_TANTANGAN, KARTU_KESEMPATAN, KARTU_DANA_UMUM, KARTU_BONUS, KARTU_HUKUMAN } from "./bankSoal";

export const ZONA = { lingkungan: "Lingkunganku", wilayah: "Wilayahku", indonesia: "Indonesiaku", riau: "Riauku" };
export const WARNA_ZONA = { lingkungan: "#FDBA74", wilayah: "#E2C49F", indonesia: "#F3A6A0", riau: "#D9BC78" };

export const JENIS_KARTU = {
  tantangan: { nama: "Kartu Tantangan", warna: "#3B82F6", ikon: "tantangan", data: KARTU_TANTANGAN },
  kesempatan: { nama: "Kartu Kesempatan", warna: "#FACC15", ikon: "kesempatan", data: KARTU_KESEMPATAN },
  dana: { nama: "Kartu Dana Umum", warna: "#22C55E", ikon: "dana", data: KARTU_DANA_UMUM },
  bonus: { nama: "Kartu Bonus", warna: "#A855F7", ikon: "bonus", data: KARTU_BONUS },
  hukuman: { nama: "Kartu Hukuman", warna: "#EF4444", ikon: "hukuman", data: KARTU_HUKUMAN },
};

const L = (nama, ikon, zona) => ({ tipe: "lokasi", nama, ikon, zona });
const K = jenis => ({
  tipe: "kartu", jenis, ikon: JENIS_KARTU[jenis].ikon,
  nama: JENIS_KARTU[jenis].nama.replace("Kartu ", "").replace("Kesempatan", "Kesem­patan").replace("Tantangan", "Tan­tangan"),
});

export const PETAK = [
  { tipe: "pojok", nama: "START", ikon: "start", ket: "Mulai Petualangan" },
  L("Rumahku", "rumah", "lingkungan"), K("tantangan"), L("Sekolah", "sekolah", "lingkungan"), L("Puskes­mas", "puskesmas", "lingkungan"),
  K("kesempatan"), L("Pasar", "pasar", "lingkungan"), L("Tempat Ibadah", "ibadah", "lingkungan"),
  { tipe: "pojok", nama: "Pos Belajar", ikon: "belajar", ket: "Berhenti 1 giliran" },
  L("Lapangan", "lapangan", "lingkungan"), K("dana"), L("Pos Ronda", "ronda", "lingkungan"), L("RT", "rt", "wilayah"),
  K("bonus"), L("RW", "rw", "wilayah"), K("tantangan"),
  { tipe: "pojok", nama: "Balai Gotong Royong", ikon: "balai", ket: "+1 bintang" },
  L("Desa/ Kelu­rahan", "desa", "wilayah"), K("hukuman"), L("Keca­matan", "kecamatan", "wilayah"), L("Kabu­paten/ Kota", "kabkota", "wilayah"),
  K("kesempatan"), L("Provinsi Riau", "provinsi", "wilayah"), K("dana"),
  { tipe: "pojok", nama: "NKRI", ikon: "nkri", ket: "Indonesiaku", zona: "indonesia", lokasi: true },
  L("Ciri Khas Riau", "selaso", "riau"), K("tantangan"), L("Makanan Khas", "makanan", "riau"), K("bonus"),
  L("Kesenian Riau", "kesenian", "riau"), K("hukuman"), L("Alam Riau", "gajah", "riau"),
];

export const POS_BELAJAR = 8;
export const BALAI = 16;
export const IDX_NKRI = 24;

// Nama petak untuk tampilan teks biasa: tanpa tanda pemenggalan dan tanpa spasi bantu setelah "/".
export const namaTampil = nama => nama.replace("/ ", "/").replace(/­/g, "");

// Petak 0..31 -> [baris, kolom] pada grid 9x9 (kolom/baris 1 dan 9 adalah sisi papan).
export function koordinat(i) {
  if (i === 0) return [9, 9];
  if (i < 8) return [9, 9 - i];
  if (i === 8) return [9, 1];
  if (i < 16) return [9 - (i - 8), 1];
  if (i === 16) return [1, 1];
  if (i < 24) return [1, 1 + (i - 16)];
  if (i === 24) return [1, 9];
  return [1 + (i - 24), 9];
}
