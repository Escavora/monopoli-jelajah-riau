import Bingkai from "../components/Bingkai";
import Papan from "../board/Papan";
import LapisPion from "../board/LapisPion";
import PanelSamping from "../board/PanelSamping";
import { useMusikLatar } from "../hooks/useMusikLatar";

export default function LayarPapan() {
  useMusikLatar();
  return (
    <section className="layar aktif" id="layarPapan">
      <Bingkai id="papanWrap">
        <Papan />
        <LapisPion />
      </Bingkai>
      <PanelSamping />
    </section>
  );
}
