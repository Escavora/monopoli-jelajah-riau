import Icon from "../icons/Icon";
import { useAksi, useGame } from "../context/GameContext";

// Titik pada grid 3x3 untuk tiap mata dadu, dan rotasi tiap muka kubus.
const TITIK = { 1: [5], 2: [1, 9], 3: [1, 5, 9], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] };
const ROT = { 1: "rotateY(0deg)", 2: "rotateY(-90deg)", 3: "rotateX(-90deg)", 4: "rotateX(90deg)", 5: "rotateY(90deg)", 6: "rotateY(180deg)" };
const GRID = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Dadu({ rotasi }) {
  return (
    <div id="dadu" style={rotasi ? { transform: rotasi } : undefined}>
      {[1, 2, 3, 4, 5, 6].map(n => (
        <div key={n} className={`muka m${n}`} style={{ transform: `${ROT[n]} translateZ(calc(var(--s)/2))` }}>
          {GRID.map(c => (TITIK[n].includes(c) ? <i key={c} /> : <span key={c} />))}
        </div>
      ))}
    </div>
  );
}

export default function DaduBox() {
  const { pemain, giliran, sibuk, selesai, daduRot } = useGame();
  const { lempar } = useAksi();
  const p = pemain[giliran];
  return (
    <div className="dadu-box">
      <div className="giliran-mini" id="giliranMini">Giliran<b>{p?.nama}</b></div>
      <div className="scene"><Dadu rotasi={daduRot} /></div>
      <button id="tombolLempar" className="btn btn-hijau" disabled={sibuk || selesai} onClick={lempar}>
        <Icon nama="dadu" />LEMPAR DADU
      </button>
    </div>
  );
}
