import { useMemo } from "react";
import Konfeti from "../components/Konfeti";
import Token from "../components/Token";
import Icon from "../icons/Icon";
import { cariJuara, urutkanPemain } from "../game/peringkat";
import { useAksi, useGame } from "../context/GameContext";

const TINGGI_BALOK = [150, 110, 80];
const URUTAN_PODIUM = [1, 0, 2]; // juara 2, 1, 3 dari kiri ke kanan

export default function LayarAkhir() {
  const { pemain } = useGame();
  const { keLayar } = useAksi();
  const urut = urutkanPemain(pemain);
  const juara = urut[0];
  const seri = cariJuara(urut);
  const tanggal = useMemo(() => new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }), []);

  return (
    <section className="layar aktif" id="layarAkhir">
      <Konfeti />
      <h1 className="judul-akhir"><Icon nama="piala" />Petualangan Selesai!</h1>
      <div className="podium" id="podium">
        {URUTAN_PODIUM.filter(i => urut[i]).map(i => {
          const p = urut[i];
          return (
            <div className="tiang" key={i}>
              <Token pion={p.pion} />
              <div className="nm">{p.nama}</div>
              <div className="nilai"><Icon nama="bintang" />{p.bintang} <Icon nama="stempel" />{p.stempel.length}</div>
              <div className="balok" style={{ "--h": TINGGI_BALOK[i] }}>{i + 1}</div>
            </div>
          );
        })}
      </div>
      <div className="sertifikat" id="sertifikat">
        <h2>Sertifikat Penjelajah Riau Hebat</h2>
        <p>Diberikan kepada</p>
        <div className="nama-juara">{seri.map(p => p.nama).join(" & ")}</div>
        <p>atas semangat menjelajah Riau dengan {juara.bintang} bintang dan {juara.stempel.length} stempel.</p>
        <p style={{ color: "#1F5A3A" }}>Jelajahi Riau, Kenali Wilayahmu, Cintai Indonesia!</p>
        <p style={{ fontSize: 15, color: "#5B4128", marginBottom: 10 }}>{tanggal}</p>
      </div>
      <div className="baris-tombol">
        <button className="btn btn-cat" onClick={() => window.print()}><Icon nama="cetak" />Cetak Sertifikat</button>
        <button className="btn btn-hijau" onClick={() => keLayar("layarAtur")}><Icon nama="putaran" />Main Lagi</button>
      </div>
    </section>
  );
}
