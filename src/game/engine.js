// Mesin permainan: aturan giliran, dadu, gerak bidak, kartu, dan Mode Guru.
// Tanpa JSX dan tanpa DOM: layar hanya membaca store dan memanggil `aksi`.
// Dependensi UI (toast, modal) disuntikkan dari luar.
import { SFX } from "../audio/sfx";
import { INFO_PETAK } from "../data/bankSoal";
import { PETAK, JENIS_KARTU, ZONA, WARNA_ZONA, POS_BELAJAR, BALAI, namaTampil } from "../data/papan";
import { NAMA_DEFAULT } from "../data/pion";
import { ambilKartu } from "./deck";
import { STATE_AWAL, DURASI_WAKTU } from "./stateAwal";
import { buatStore } from "./store";

const tunggu = ms => new Promise(r => setTimeout(r, ms));
const JUMLAH_PETAK = PETAK.length;

/**
 * @param {{ toast: Function, modal: { buka: (cfg:object)=>Promise<any>, tutup: (v:any)=>void, ada: ()=>boolean } }} deps
 */
export function buatEngine({ toast, modal }) {
  const store = buatStore(STATE_AWAL);
  const { get, ubah } = store;
  let deck = {};
  let timer = null;
  let kartuMenunggu = null;

  /* ---------- pembantu state ---------- */
  const ubahPemain = (idx, fn) =>
    ubah(g => ({ pemain: g.pemain.map((p, i) => (i === idx ? { ...p, ...fn(p) } : p)) }));
  const tambahBintang = (idx, n) => ubahPemain(idx, p => ({ bintang: Math.max(0, p.bintang + n) }));
  const pesan = cfg => modal.buka({ tipe: "pesan", ...cfg });
  const keLayar = layar => ubah({ layar });

  /* ---------- mulai & timer ---------- */
  function mulai({ jumlah, mode, aturData }) {
    const data = aturData.slice(0, jumlah).map((d, i) => ({ nama: d.nama.trim() || NAMA_DEFAULT[i], pion: d.pion }));
    if (new Set(data.map(d => d.pion)).size !== data.length) {
      toast("Setiap pemain harus memilih bidak yang berbeda ya!", "info");
      return;
    }
    deck = {};
    kartuMenunggu = null;
    clearInterval(timer);
    ubah({
      mode,
      pemain: data.map(d => ({ ...d, pos: 0, bintang: 0, stempel: [], skip: false })),
      giliran: 0, ronde: 1, sisaDetik: DURASI_WAKTU, jeda: false, sibuk: false, selesai: false,
      sorot: null, lompat: { id: null, n: 0 }, kartuNyala: null, daduRot: null, layar: "layarPapan",
    });
    if (mode === "waktu") timer = setInterval(tickTimer, 1000);
  }

  function tickTimer() {
    const g = get();
    if (g.jeda || g.selesai) return;
    ubah({ sisaDetik: Math.max(0, g.sisaDetik - 1) });
    if (get().sisaDetik === 0 && !get().sibuk) akhiriGame();
  }

  /* ---------- dadu & gerak ---------- */
  async function lempar() {
    const g = get();
    if (g.sibuk || g.selesai) return;
    ubah({ sibuk: true });
    const n = 1 + Math.floor(Math.random() * 6);
    const akhir = { 1: [0, 0], 2: [0, 90], 3: [90, 0], 4: [-90, 0], 5: [0, -90], 6: [0, 180] }[n];
    const putar = (1 + Math.floor(Math.random() * 2)) * 360;
    SFX.dadu();
    ubah({ daduRot: `rotateX(${akhir[0] + putar + 720}deg) rotateY(${akhir[1] + putar}deg)` });
    await tunggu(1100);
    toast(`Dadu: ${n}`, "dadu", 1400);
    const idx = get().giliran;
    await jalan(idx, n);
    await prosesPetak(idx);
    akhirGiliran();
  }

  async function jalan(idx, n) {
    const arah = n > 0 ? 1 : -1;
    for (let k = 0; k < Math.abs(n); k++) {
      const pos = (get().pemain[idx].pos + arah + JUMLAH_PETAK) % JUMLAH_PETAK;
      const lewatStart = arah > 0 && pos === 0;
      ubahPemain(idx, p => ({ pos, bintang: p.bintang + (lewatStart ? 1 : 0) }));
      if (lewatStart) { toast("Melewati START! +1 bintang", "start"); SFX.benar(); }
      ubah(g => ({ lompat: { id: idx, n: g.lompat.n + 1 }, sorot: pos }));
      SFX.langkah();
      await tunggu(320);
    }
    setTimeout(() => ubah({ sorot: null }), 900);
  }

  function akhirGiliran() {
    if (get().selesai) return;
    const g = get();
    const pemain = g.pemain.slice();
    let giliran = g.giliran, ronde = g.ronde, putaran = 0, lanjut = true;
    while (lanjut) {
      giliran = (giliran + 1) % pemain.length;
      if (giliran === 0) { ronde++; putaran++; }
      const p = pemain[giliran];
      if (p.skip) {
        pemain[giliran] = { ...p, skip: false };
        toast(`${p.nama} sedang di Pos Belajar, berhenti satu giliran.`, "tidur", 2600);
      } else lanjut = false;
      if (putaran > 1) lanjut = false;
    }
    ubah({ pemain, giliran, ronde, sibuk: false });
    const s = get();
    if ((s.mode === "ronde" && s.ronde > s.maxRonde) || (s.mode === "waktu" && s.sisaDetik <= 0)) akhiriGame();
  }

  /* ---------- petak ---------- */
  async function prosesPetak(idx) {
    const p = get().pemain[idx], pt = PETAK[p.pos];
    if (pt.tipe === "lokasi" || pt.lokasi) { await popupLokasi(idx, p.pos, true); return; }
    if (pt.tipe === "kartu") { await ambilDanTampilkan(idx, pt.jenis); return; }
    if (p.pos === BALAI) {
      tambahBintang(idx, 1); SFX.benar();
      await pesan({ warna: "#C29A45", ikon: "balai", judul: "Balai Gotong Royong", teks: "Petak aman! Gotong royong membuat kita rukun. Kamu dapat 1 bintang." });
    } else if (p.pos === POS_BELAJAR) {
      await pesan({ warna: "#C29A45", ikon: "belajar", judul: "Pos Belajar", teks: "Kamu hanya mampir. Ayo terus belajar mengenal tempat tinggalmu!" });
    }
  }

  async function popupLokasi(idx, pos, denganSoal) {
    const pt = PETAK[pos], d = INFO_PETAK[pos], zona = pt.zona || "indonesia";
    const warna = WARNA_ZONA[zona], nama = namaTampil(pt.nama), judul = `${nama} · Zona ${ZONA[zona]}`;
    if (!denganSoal) {
      await modal.buka({ tipe: "info", warna, ikon: pt.ikon, judul, info: d.info });
      return;
    }
    const ok = await modal.buka({ tipe: "pilihanGanda", warna, ikon: pt.ikon, judul, info: d.info, tanya: d.tanya, opsi: d.opsi, benar: d.benar });
    if (!ok) return;
    const sudahPunya = get().pemain[idx].stempel.includes(pos);
    ubahPemain(idx, p => ({ bintang: p.bintang + 1, stempel: sudahPunya ? p.stempel : [...p.stempel, pos] }));
    if (sudahPunya) toast("+1 bintang", "bintang");
    else toast(`+1 bintang dan stempel ${nama}!`, "stempel");
  }

  /* ---------- kartu ---------- */
  function ambilDanTampilkan(idx, jenis) {
    return new Promise(res => {
      ubah({ kartuNyala: jenis });
      toast(`Ambil ${JENIS_KARTU[jenis].nama} di tengah papan!`, JENIS_KARTU[jenis].ikon, 2500);
      kartuMenunggu = {
        jenis,
        res: async () => { ubah({ kartuNyala: null }); await bukaKartu(idx, jenis); res(); },
      };
    });
  }

  function klikTumpukan(jenis) {
    if (kartuMenunggu && kartuMenunggu.jenis === jenis) {
      const k = kartuMenunggu;
      kartuMenunggu = null;
      k.res();
    } else if (kartuMenunggu) toast("Ambil kartu yang bergoyang ya!", "kartu");
    else toast(`${JENIS_KARTU[jenis].nama}: ${JENIS_KARTU[jenis].data.length} kartu`, JENIS_KARTU[jenis].ikon);
  }

  async function bukaKartu(idx, jenis) {
    const J = JENIS_KARTU[jenis], c = ambilKartu(deck, jenis), base = { warna: J.warna, ikon: J.ikon, judul: J.nama };
    if (jenis === "tantangan") {
      const ok = await modal.buka({ tipe: "pilihanGanda", ...base, tanya: c.tanya, opsi: c.opsi, benar: c.benar });
      if (ok) { tambahBintang(idx, 2); toast("+2 bintang. Luar biasa!", "bintang"); }
    } else if (jenis === "kesempatan") {
      const ok = await modal.buka({ tipe: "soalTerbuka", ...base, tanya: c.tanya, contoh: c.contoh, ketBenar: { ikon: "jejak", teks: `Jika benar: maju ${c.maju} langkah` } });
      if (ok) await jalan(idx, c.maju);
    } else if (jenis === "dana") {
      const ok = await modal.buka({ tipe: "soalTerbuka", ...base, tanya: c.tanya, contoh: c.contoh, ketBenar: { ikon: "bintang", teks: "Jika benar: +1 bintang" } });
      if (ok) { tambahBintang(idx, 1); toast("+1 bintang", "bintang"); }
    } else if (jenis === "bonus") {
      SFX.benar();
      await pesan({ ...base, teks: c.teks, tombol: "Asyik!" });
      if (c.jenis === "maju") await jalan(idx, c.n); else tambahBintang(idx, c.n);
    } else if (jenis === "hukuman") {
      SFX.salah();
      await pesan({ ...base, teks: c.teks, tombol: "Baik, aku belajar lagi" });
      if (c.jenis === "mundur") {
        await jalan(idx, -c.n);
        if (c.bacaPetak != null) await popupLokasi(idx, c.bacaPetak, false);
      } else if (c.jenis === "posbelajar") {
        ubahPemain(idx, () => ({ pos: POS_BELAJAR, skip: true }));
        toast("Menuju Pos Belajar...", "belajar");
        await tunggu(600);
      } else if (c.jenis === "tantangan") await ambilDanTampilkan(idx, "tantangan");
      else if (c.jenis === "kurang") tambahBintang(idx, -c.n);
    }
  }

  /* ---------- akhir ---------- */
  function akhiriGame() {
    const g = get();
    if (g.selesai && g.layar === "layarAkhir") return;
    clearInterval(timer);
    ubah({ selesai: true, layar: "layarAkhir" });
    SFX.menang();
  }

  /* ---------- Mode Guru ---------- */
  const bukaGuru = () => ubah({ guruTerbuka: true });
  const tutupGuru = () => ubah({ guruTerbuka: false });
  function guruLewati() {
    if (get().sibuk) { toast("Tunggu sampai giliran ini selesai ya.", "jam"); return; }
    toast(`Giliran ${get().pemain[get().giliran].nama} dilewati`, "lewati");
    akhirGiliran();
    tutupGuru();
  }
  const guruJeda = () => ubah(g => ({ jeda: !g.jeda }));
  const guruKunci = () => ubah(g => ({ kunci: !g.kunci }));
  const guruBintang = (idx, n) => tambahBintang(idx, n);
  function guruAkhiri() {
    tutupGuru();
    if (modal.ada()) modal.tutup(false);
    akhiriGame();
  }
  function guruUlang() {
    if (!confirm("Ulang permainan dari awal?")) return;
    tutupGuru();
    if (modal.ada()) modal.tutup(false);
    clearInterval(timer);
    kartuMenunggu = null;
    ubah({ selesai: true, kartuNyala: null, layar: "layarAtur" });
  }

  return {
    store,
    aksi: { keLayar, mulai, lempar, klikTumpukan, bukaGuru, tutupGuru, guruLewati, guruJeda, guruKunci, guruBintang, guruAkhiri, guruUlang },
  };
}
