import { useState } from "react";
import Token from "../components/Token";
import Icon from "../icons/Icon";
import { JENIS_KARTU } from "../data/papan";
import { Musik } from "../audio/musik";
import { suaraNyala, toggleSuara } from "../audio/sfx";
import { useAksi, useGame } from "../context/GameContext";

function InfoRonde() {
  const { mode, ronde, maxRonde, sisaDetik, jeda } = useGame();
  if (mode === "ronde") return <><Icon nama="putaran" />Putaran {Math.min(ronde, maxRonde)} dari {maxRonde}</>;
  const m = Math.floor(sisaDetik / 60), d = sisaDetik % 60;
  return <><Icon nama="jam" />Sisa {m}:{String(d).padStart(2, "0")}{jeda ? " (jeda)" : ""}</>;
}

function TombolMusik() {
  const [on, setOn] = useState(Musik.nyala());
  return (
    <button className="ikon-btn" id="tombolMusik" onClick={() => setOn(Musik.toggle())}
      aria-label="Nyala/mati musik" aria-pressed={on}>
      <Icon nama={on ? "musik" : "musikmati"} />
    </button>
  );
}

function TombolSuara() {
  const [on, setOn] = useState(suaraNyala());
  return (
    <button className="ikon-btn" id="tombolSuara" onClick={() => setOn(toggleSuara())} aria-label="Nyala/mati efek suara">
      <Icon nama={on ? "suara" : "bisu"} />
    </button>
  );
}

function KotakGiliran() {
  const { pemain, giliran } = useGame();
  const p = pemain[giliran];
  return (
    <div className="plak" id="kotakGiliran">
      <Token pion={p.pion} />
      <div>Sekarang giliran<span className="siapa">{p.nama}</span></div>
    </div>
  );
}

function DaftarSkor() {
  const { pemain, giliran } = useGame();
  return (
    <div className="plak" id="daftarSkor">
      {pemain.map((q, i) => (
        <div key={i} className={`skor${i === giliran ? " aktif" : ""}`}>
          <Token pion={q.pion} />
          <div className="nm">
            {q.nama}{q.skip && <>{" "}<Icon nama="tidur" /></>}
            <span className="stm"><Icon nama="stempel" /> {q.stempel.length} stempel</span>
          </div>
          <div className="bt"><Icon nama="bintang" />{q.bintang}</div>
        </div>
      ))}
    </div>
  );
}

function Legenda() {
  return (
    <div className="legenda" id="legenda">
      {Object.values(JENIS_KARTU).map(v => (
        <div key={v.nama}><i style={{ backgroundColor: v.warna }}><Icon nama={v.ikon} /></i>{v.nama.replace("Kartu ", "")}</div>
      ))}
      <div><i style={{ backgroundColor: "var(--z-lingkungan)" }} />Lingkunganku</div>
      <div><i style={{ backgroundColor: "var(--z-wilayah)" }} />Wilayahku</div>
      <div><i style={{ background: "linear-gradient(#C8372D 50%,#fff 50%)", boxShadow: "inset 0 0 0 1px #ccc" }} />Indonesiaku</div>
      <div><i style={{ backgroundColor: "var(--z-riau)" }} />Riauku</div>
    </div>
  );
}

export default function PanelSamping() {
  const { bukaGuru } = useAksi();
  return (
    <aside id="panelSamping">
      <div className="atas-panel">
        <div className="plak" id="infoRonde"><InfoRonde /></div>
        <TombolMusik />
        <TombolSuara />
        <button className="ikon-btn" id="tombolGuru" onClick={bukaGuru} aria-label="Mode Guru"><Icon nama="gembok" /></button>
      </div>
      <KotakGiliran />
      <DaftarSkor />
      <Legenda />
      <div className="plak sikap"><Icon nama="orang" />Jujur · Bekerja sama · Menghargai teman</div>
    </aside>
  );
}
