import { PETAK } from "../data/papan";
import { useGame } from "../context/GameContext";
import Petak from "./Petak";
import Tengah from "./Tengah";

export default function Papan() {
  const { pemain, sorot } = useGame();
  return (
    <div id="papan">
      <Tengah />
      {PETAK.map((p, i) => (
        <Petak key={i} petak={p} indeks={i} sorot={sorot === i} penghuniStempel={pemain.filter(q => q.stempel.includes(i))} />
      ))}
    </div>
  );
}
