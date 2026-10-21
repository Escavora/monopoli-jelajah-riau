import PetaRiau from "./PetaRiau";
import DaduBox from "./DaduBox";
import TumpukanKartu from "./TumpukanKartu";

function SudutUkir() {
  return (
    <svg viewBox="0 0 60 60">
      <path d="M4 56V18C4 10 10 4 18 4h38" fill="none" stroke="#C29A45" strokeWidth="3" />
      <path d="M12 56V24c0-7 5-12 12-12h32" fill="none" stroke="#A9853A" strokeWidth="1.6" />
      <path d="M20 30c0-6 4-10 10-10 5 0 8 4 6 8s-8 3-8-1" fill="none" stroke="#1F5A3A" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="18" cy="18" r="4" fill="#C29A45" />
    </svg>
  );
}

// Bagian dalam papan: peta Riau, dadu, dan tumpukan kartu.
export default function Tengah() {
  return (
    <div id="tengah">
      {["a", "b", "c", "d"].map(k => <div key={k} className={`sudut-ukir ${k}`}><SudutUkir /></div>)}
      <div className="peta-box" id="petaBox"><PetaRiau /></div>
      <DaduBox />
      <TumpukanKartu />
    </div>
  );
}
