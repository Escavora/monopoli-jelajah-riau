import { useState } from "react";
import Icon from "../icons/Icon";
import { SFX } from "../audio/sfx";
import { useGame } from "../context/GameContext";

// Soal terbuka: dijawab lisan, lalu guru/teman menilai Benar atau Belum Tepat.
export default function SoalTerbuka({ tanya, contoh, ketBenar, tutup }) {
  const { kunci } = useGame();
  const [lihat, setLihat] = useState(false);
  const tampil = lihat || kunci;

  function nilai(ok) {
    if (ok) SFX.benar(); else SFX.salah();
    tutup(ok);
  }

  return (
    <>
      <div className="teks-kartu">{tanya}</div>
      <div className="petunjuk"><Icon nama="bicara" />Jawab dengan suara lantang. Guru atau teman menilai dengan jujur.</div>
      <div className={`contoh${tampil ? " tampil" : ""}`}><Icon nama="lampu" /><div>Contoh jawaban: {contoh}</div></div>
      {!tampil && (
        <div className="aksi"><button className="btn btn-cat" onClick={() => setLihat(true)}><Icon nama="lampu" />Lihat Contoh Jawaban</button></div>
      )}
      <div className="aksi">
        <button className="btn btn-hijau" onClick={() => nilai(true)}><Icon nama="benar" />Benar</button>
        <button className="btn btn-merah" onClick={() => nilai(false)}><Icon nama="salah" />Belum Tepat</button>
      </div>
      <div className="hadiah"><Icon nama={ketBenar.ikon} />{ketBenar.teks}</div>
    </>
  );
}
