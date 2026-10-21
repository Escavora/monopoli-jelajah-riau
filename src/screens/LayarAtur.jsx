import Bingkai from "../components/Bingkai";
import Token from "../components/Token";
import Icon from "../icons/Icon";
import { PION, JUMLAH_PEMAIN } from "../data/pion";
import { useAksi } from "../context/GameContext";

export default function LayarAtur({ setup }) {
  const { keLayar, mulai } = useAksi();
  const { jumlah, setJumlah, mode, setMode, aturData, setNama, gantiPion } = setup;
  return (
    <section className="layar aktif" id="layarAtur">
      <Bingkai><div className="isi-cat">
        <h2 className="judul-panel"><Icon nama="orang" />Siapa yang Bermain?</h2>
        <div className="atur-baris">Jumlah pemain:{" "}
          <span id="pilihJumlah" style={{ display: "flex", gap: 6 }}>
            {JUMLAH_PEMAIN.map(n => (
              <button key={n} className={`pilih${n === jumlah ? " on" : ""}`} onClick={() => setJumlah(n)}>{n}</button>
            ))}
          </span>
        </div>
        <div className="atur-baris">Mode:
          <button className={`pilih${mode === "ronde" ? " on" : ""}`} onClick={() => setMode("ronde")}><Icon nama="putaran" />3 Putaran</button>
          <button className={`pilih${mode === "waktu" ? " on" : ""}`} onClick={() => setMode("waktu")}><Icon nama="jam" />20 Menit</button>
        </div>
        <div id="daftarPemain">
          {aturData.slice(0, jumlah).map((p, i) => (
            <div className="baris-pemain" key={i}>
              <Token pion={p.pion} />
              <input value={p.nama} maxLength={20} aria-label={`Nama pemain ${i + 1}`} onChange={e => setNama(i, e.target.value)} />
              <div className="pilih-pion" role="group" aria-label={`Bidak pemain ${i + 1}`}>
                {PION.map((x, j) => (
                  <button key={j} className={j === p.pion ? "on" : ""} style={{ "--c": x.warna }}
                    onClick={() => gantiPion(i, j)} aria-label={x.nama} title={x.nama}><Icon nama={x.ikon} /></button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="tengah">
          <button className="btn btn-cat" onClick={() => keLayar("layarPembuka")}><Icon nama="kembali" />Kembali</button>
          <button className="btn btn-hijau btn-besar" onClick={() => mulai({ jumlah, mode, aturData })}><Icon nama="dadu" />Ayo Main!</button>
        </div>
      </div></Bingkai>
    </section>
  );
}
