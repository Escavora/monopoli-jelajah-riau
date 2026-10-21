import { useEffect, useState } from "react";
import Bingkai from "../components/Bingkai";
import Icon from "../icons/Icon";
import { useAksi, useGame } from "../context/GameContext";

function IsiGuru() {
  const { pemain, giliran, mode, jeda, kunci } = useGame();
  const { tutupGuru, guruLewati, guruJeda, guruKunci, guruBintang, guruAkhiri, guruUlang } = useAksi();
  const [pilih, setPilih] = useState(giliran);

  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") tutupGuru(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [tutupGuru]);

  return (
    <div className="modal aktif" id="modalGuru" role="dialog" aria-modal="true">
      <Bingkai>
        <div className="isi-cat">
          <h2 className="judul-panel"><Icon nama="gembok" />Mode Guru</h2>
          <div className="guru-grid">
            <div className="guru-baris">
              <button className="btn btn-cat" onClick={guruLewati}><Icon nama="lewati" />Lewati giliran</button>
              <button className="btn btn-cat" id="tombolJeda" onClick={guruJeda} disabled={mode !== "waktu"}>
                {jeda ? <><Icon nama="mulai" />Lanjutkan timer</> : <><Icon nama="jeda" />Jeda timer</>}
              </button>
            </div>
            <div className="guru-baris">
              <select id="guruPemain" aria-label="Pilih pemain" value={pilih} onChange={e => setPilih(+e.target.value)}>
                {pemain.map((p, i) => <option key={i} value={i}>{p.nama} ({p.bintang} bintang)</option>)}
              </select>
              <button className="btn btn-hijau" onClick={() => guruBintang(pilih, 1)}>+1 <Icon nama="bintang" /></button>
              <button className="btn btn-merah" onClick={() => guruBintang(pilih, -1)}>−1 <Icon nama="bintang" /></button>
            </div>
            <div className="guru-baris">
              <button className="btn btn-cat" id="tombolKunci" onClick={guruKunci}>
                <Icon nama="kunci" />Kunci jawaban: {kunci ? "NYALA" : "MATI"}
              </button>
            </div>
            <div className="guru-baris">
              <button className="btn btn-cat" onClick={guruAkhiri}><Icon nama="start" />Akhiri sekarang</button>
              <button className="btn btn-merah" onClick={guruUlang}><Icon nama="putaran" />Ulang permainan</button>
            </div>
            <div className="tengah"><button className="btn btn-hijau" onClick={tutupGuru}>Tutup</button></div>
          </div>
        </div>
      </Bingkai>
    </div>
  );
}

// Panel kontrol guru: lewati giliran, jeda timer, ubah bintang, kunci jawaban, akhiri/ulang.
export default function ModalGuru() {
  const { guruTerbuka } = useGame();
  return guruTerbuka ? <IsiGuru /> : null;
}
