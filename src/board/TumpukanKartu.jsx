import Icon from "../icons/Icon";
import { JENIS_KARTU } from "../data/papan";
import { useAksi, useGame } from "../context/GameContext";

// Lima tumpukan kartu. Yang bergoyang (nyala) adalah tumpukan yang harus diambil.
export default function TumpukanKartu() {
  const { kartuNyala } = useGame();
  const { klikTumpukan } = useAksi();
  return (
    <div className="tumpukan-baris" id="tumpukanBaris">
      {Object.entries(JENIS_KARTU).map(([k, v]) => (
        <button key={k} id={`deck-${k}`} className={`tumpukan${kartuNyala === k ? " nyala" : ""}`}
          onClick={() => klikTumpukan(k)} aria-label={v.nama}>
          <span className="dek" style={{ "--c": v.warna }}><Icon nama={v.ikon} /></span>
          <span className="lbl">{v.nama.replace("Kartu ", "")}</span>
        </button>
      ))}
    </div>
  );
}
