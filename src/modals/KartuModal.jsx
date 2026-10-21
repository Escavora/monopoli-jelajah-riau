import { useEffect, useRef, useState } from "react";
import Icon from "../icons/Icon";
import { Musik } from "../audio/musik";
import { SFX } from "../audio/sfx";
import { useModal } from "../context/ModalContext";
import Pesan from "./Pesan";
import PilihanGanda from "./PilihanGanda";
import SoalTerbuka from "./SoalTerbuka";

const ISI = { pesan: Pesan, info: Pesan, pilihanGanda: PilihanGanda, soalTerbuka: SoalTerbuka };

function Kartu({ modal, tutup }) {
  const [terbuka, setTerbuka] = useState(false);
  const depan = useRef(null);
  const Isi = ISI[modal.tipe];

  useEffect(() => {
    SFX.kartu();
    Musik.duck(true);
    // kartu dibalik setelah sempat terlihat tertutup
    const t = setTimeout(() => {
      setTerbuka(true);
      const f = depan.current && depan.current.querySelector("button");
      if (f) f.focus({ preventScroll: true });
    }, 450);
    return () => { clearTimeout(t); Musik.duck(false); };
  }, []);

  return (
    <div className="modal aktif" id="modalKartu" role="dialog" aria-modal="true">
      <div className="kartu-wrap">
        <div className={`kartu${terbuka ? " terbuka" : ""}`} id="kartu" style={{ "--c": modal.warna }}>
          <div className="sisi belakang">
            <div className="medali-besar"><Icon nama={modal.ikon} /></div>
            <span>{modal.judul.split(" · ")[0]}</span>
          </div>
          <div className="sisi depan" ref={depan}>
            <div className="kepala-kartu"><Icon nama={modal.ikon} />{modal.judul}</div>
            <div className="badan-kartu"><Isi {...modal} tutup={tutup} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal kartu/info yang dibuka mesin permainan lewat ModalContext.
export default function KartuModal() {
  const { modal, tutup } = useModal();
  if (!modal) return null;
  return <Kartu key={modal.id} modal={modal} tutup={tutup} />;
}
