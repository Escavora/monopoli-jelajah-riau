import Icon from "../icons/Icon";
import { useAksi } from "../context/GameContext";

function Selembayung() {
  return (
    <svg className="selembayung" viewBox="0 0 340 120" aria-hidden="true">
      <path d="M14 122 170 44 326 122Z" fill="#4E2A10" />
      <path d="M40 122 170 58 300 122" fill="none" stroke="#C29A45" strokeWidth="4" />
      <g fill="none" strokeLinecap="round">
        <path d="M200 70C182 44 152 22 118 16c-14-2-19 12-7 17" stroke="#2B1A0C" strokeWidth="13" />
        <path d="M140 70C158 44 188 22 222 16c14-2 19 12 7 17" stroke="#2B1A0C" strokeWidth="13" />
        <path d="M200 70C182 44 152 22 118 16c-14-2-19 12-7 17" stroke="#C29A45" strokeWidth="7" />
        <path d="M140 70C158 44 188 22 222 16c14-2 19 12 7 17" stroke="#C29A45" strokeWidth="7" />
      </g>
      <path d="M150 96h40l-20-22Z" fill="#C29A45" />
    </svg>
  );
}

export default function LayarPembuka() {
  const { keLayar } = useAksi();
  return (
    <section className="layar aktif" id="layarPembuka">
      <div className="papan-nama">
        <Selembayung />
        <h1 className="judul-utama">MONOPOLI<br /><em>JELAJAH RIAU</em></h1>
        <div className="subjudul">Petualangan Mengenal Tempat Tinggalku</div>
      </div>
      <div className="panggung" id="panggung" aria-hidden="true">
        <Icon nama="istana" /><Icon nama="perahu" extra="besar" /><Icon nama="selaso" extra="besar" />
        <Icon nama="gajah" /><Icon nama="patin" />
      </div>
      <div className="slogan-teks">Jelajahi Riau, Kenali Wilayahmu, Cintai Indonesia!</div>
      <div className="baris-tombol">
        <button className="btn btn-hijau btn-besar" onClick={() => keLayar("layarAtur")}><Icon nama="mulai" />Mulai Petualangan</button>
        <button className="btn btn-cat btn-besar" onClick={() => keLayar("layarCara")}><Icon nama="buku" />Cara Bermain</button>
      </div>
      <div className="info-kecil">PPKN · Kelas 3 SD (Fase B)</div>
    </section>
  );
}
