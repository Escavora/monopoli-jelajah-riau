import Bingkai from "../components/Bingkai";
import Medali from "../components/Medali";
import Icon from "../icons/Icon";
import { JENIS_KARTU } from "../data/papan";
import { useAksi } from "../context/GameContext";

const LANGKAH = [
  ["orang", "Pilih pemain atau kelompok, lalu pilih bidak."],
  ["dadu", "Tekan LEMPAR DADU saat giliranmu."],
  ["jejak", "Bidak berjalan sendiri searah jarum jam."],
  ["rumah", "Berhenti di tempat? Baca info, jawab soal. Benar dapat bintang dan stempel."],
  ["kartu", "Berhenti di petak kartu? Ambil kartu sesuai warnanya."],
  ["start", "Lewat START dapat 1 bintang."],
  ["piala", "Bintang terbanyak menang! Jujur, kerja sama, hargai teman."],
];

export default function LayarCara() {
  const { keLayar } = useAksi();
  return (
    <section className="layar aktif" id="layarCara">
      <Bingkai><div className="isi-cat">
        <h2 className="judul-panel"><Icon nama="buku" />Cara Bermain</h2>
        <ol className="langkah">
          {LANGKAH.map(([ikon, teks]) => <li key={ikon}><Medali nama={ikon} />{teks}</li>)}
        </ol>
        <div className="legenda-besar" id="legendaBesar">
          {Object.values(JENIS_KARTU).map(v => (
            <span key={v.nama} className="chip-kartu" style={{ backgroundColor: v.warna }}><Icon nama={v.ikon} />{v.nama}</span>
          ))}
        </div>
        <div className="tengah">
          <button className="btn btn-cat" onClick={() => keLayar("layarPembuka")}><Icon nama="kembali" />Kembali</button>
          <button className="btn btn-hijau" onClick={() => keLayar("layarAtur")}><Icon nama="mulai" />Mulai</button>
        </div>
      </div></Bingkai>
    </section>
  );
}
