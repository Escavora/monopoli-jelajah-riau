import Icon from "../icons/Icon";
import { PION } from "../data/pion";

// Bidak kayu bulat berhias warna pemain.
export default function Token({ pion, cls = "" }) {
  return (
    <span className={`token ${cls}`.trim()} style={{ "--c": PION[pion].warna }}>
      <Icon nama={PION[pion].ikon} />
    </span>
  );
}
