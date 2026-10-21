import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Token from "../components/Token";
import { useGame } from "../context/GameContext";

// Posisi relatif di dalam petak, tergantung berapa bidak yang berbagi petak yang sama.
const SATU = [[0, 0]];
const O2 = [[-0.22, 0], [0.22, 0]];
const O3 = [[-0.22, -0.12], [0.22, -0.12], [0, 0.2]];
const O4 = [[-0.22, -0.18], [0.22, -0.18], [-0.22, 0.2], [0.22, 0.2]];
const O6 = [[-0.26, -0.2], [0, -0.2], [0.26, -0.2], [-0.26, 0.2], [0, 0.2], [0.26, 0.2]];
const POLA = [SATU, SATU, O2, O3, O4, O6, O6];

// Bidak melayang di atas papan; posisinya dihitung dari ukuran petak yang sebenarnya.
export default function LapisPion() {
  const { pemain, giliran, lompat } = useGame();
  const lapRef = useRef(null);
  const [posisi, setPosisi] = useState([]);

  const hitung = useCallback(() => {
    const lap = lapRef.current;
    if (!lap) return;
    const lr = lap.getBoundingClientRect();
    const grup = {};
    pemain.forEach((p, i) => (grup[p.pos] = grup[p.pos] || []).push(i));
    const hasil = [];
    Object.entries(grup).forEach(([pos, ids]) => {
      const petak = document.getElementById("petak" + pos);
      if (!petak) return;
      const r = petak.getBoundingClientRect();
      const pola = POLA[ids.length];
      ids.forEach((id, k) => {
        const [dx, dy] = pola[k];
        hasil[id] = { left: r.left - lr.left + r.width * (0.5 + dx), top: r.top - lr.top + r.height * (0.55 + dy) };
      });
    });
    setPosisi(hasil);
  }, [pemain]);

  useLayoutEffect(() => { hitung(); }, [hitung]);

  useEffect(() => {
    const ro = new ResizeObserver(hitung);
    ro.observe(lapRef.current);
    return () => ro.disconnect();
  }, [hitung]);

  return (
    <div id="lapisPion" ref={lapRef}>
      {pemain.map((p, i) => {
        const melompat = lompat.id === i && lompat.n > 0;
        return (
          <div key={i} id={`pion${i}`} className={`pion${i === giliran ? " giliran" : ""}`} title={p.nama} style={posisi[i]}>
            {/* key berganti tiap langkah supaya animasi lompat mulai dari awal */}
            <span key={melompat ? lompat.n : 0} className={`pion-isi${melompat ? " lompat" : ""}`}><Token pion={p.pion} /></span>
          </div>
        );
      })}
    </div>
  );
}
