import { useState } from "react";
import Icon from "../icons/Icon";
import { SFX } from "../audio/sfx";
import { useGame } from "../context/GameContext";

const HURUF = "ABC";

// Soal pilihan ganda: setelah menjawab, jawaban benar ditandai dan tombol Lanjut muncul.
export default function PilihanGanda({ info, tanya, opsi, benar, tutup }) {
  const { kunci } = useGame();
  const [pilih, setPilih] = useState(null);
  const sudah = pilih !== null;
  const ok = pilih === benar;

  function jawab(i) {
    setPilih(i);
    if (i === benar) SFX.benar(); else SFX.salah();
  }

  return (
    <>
      {info && <div className="info-petak"><Icon nama="info" /><div>{info}</div></div>}
      <div className="teks-kartu">{tanya}</div>
      <div className="opsi">
        {opsi.map((o, i) => {
          const kelas = [];
          if (sudah && i === benar) kelas.push("benar");
          if (sudah && i === pilih && !ok) kelas.push("salah");
          if (kunci && i === benar) kelas.push("kunci");
          return (
            <button key={i} className={kelas.join(" ")} disabled={sudah} onClick={() => jawab(i)}>
              <b>{HURUF[i]}</b>{o}
            </button>
          );
        })}
      </div>
      <div className={`umpan${sudah ? (ok ? " ok" : " no") : ""}`}>
        {sudah && (ok ? "Hebat, jawabanmu benar!" : "Belum tepat. Jawaban yang benar sudah ditandai hijau.")}
      </div>
      {sudah && (
        <div className="aksi"><button className="btn btn-hijau" onClick={() => tutup(ok)}>Lanjut <Icon nama="mulai" /></button></div>
      )}
    </>
  );
}
