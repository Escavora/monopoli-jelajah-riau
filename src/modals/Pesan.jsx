import Icon from "../icons/Icon";

// Pesan singkat (atau info petak) dengan satu tombol lanjut.
export default function Pesan({ teks, info, tombol = "Oke", tutup }) {
  return (
    <>
      <div className="teks-kartu">
        {info
          ? <div className="info-petak" style={{ border: "none", margin: 0 }}><Icon nama="info" /><div>{info}</div></div>
          : teks}
      </div>
      <div className="aksi"><button className="btn btn-hijau" onClick={() => tutup(true)}>{tombol}</button></div>
    </>
  );
}
