import Icon from "../icons/Icon";
import { PION } from "../data/pion";
import { IDX_NKRI, JENIS_KARTU, koordinat, namaTampil } from "../data/papan";
import { useToast } from "../context/ToastContext";

// Di ponsel nama petak disembunyikan (terlalu kecil), jadi nama muncul saat petak diketuk.
const LAYAR_KECIL = "(max-width:600px),(max-height:500px)";

// Satu petak di tepi papan. `penghuniStempel` = pemain yang sudah punya stempel di petak ini.
export default function Petak({ petak, indeks, sorot, penghuniStempel }) {
  const toast = useToast();
  const [baris, kolom] = koordinat(indeks);
  const kelas = ["petak"];
  if (petak.tipe === "kartu") kelas.push("kartu");
  if (petak.tipe === "pojok") kelas.push("pojok");
  if (indeks === IDX_NKRI) kelas.push("nkri");
  if (sorot) kelas.push("sorot");

  const style = { gridArea: `${baris}/${kolom}` };
  if (petak.tipe === "kartu") style.backgroundColor = JENIS_KARTU[petak.jenis].warna;

  const sebutNama = () => {
    if (window.matchMedia(LAYAR_KECIL).matches) toast(namaTampil(petak.nama), petak.ikon, 1600);
  };

  return (
    <div className={kelas.join(" ")} id={`petak${indeks}`} style={style} title={namaTampil(petak.nama)} onClick={sebutNama}>
      {petak.tipe === "lokasi" && <div className={`strip ${petak.zona}`} />}
      <div className="ikon"><Icon nama={petak.ikon} /></div>
      <div className="nama">{petak.nama}</div>
      {petak.ket && <div className="ket">{petak.ket}</div>}
      <span className="stempelku">
        {penghuniStempel.map(q => <i key={q.pion} className="cap" style={{ background: PION[q.pion].warna }} />)}
      </span>
    </div>
  );
}
