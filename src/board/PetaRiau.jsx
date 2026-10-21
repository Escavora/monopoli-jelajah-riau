import Icon from "../icons/Icon";

const DARAT = "M40 120 C48 92 70 78 92 66 C110 56 124 40 146 38 C168 36 182 50 200 46 C214 42 226 30 240 36 C252 42 248 58 262 64 C276 70 290 76 288 94 C286 110 270 116 262 130 C254 146 262 162 248 172 C232 184 210 176 192 186 C172 196 150 194 132 184 C112 174 96 180 80 170 C62 158 46 150 40 120Z";
const PULAU = [
  "M232 22 C240 14 254 16 256 26 C258 34 246 38 238 34Z",
  "M268 40 C276 34 288 38 286 48 C284 56 272 56 268 50Z",
  "M294 62 C300 58 308 64 304 72 C300 78 292 72 294 62Z",
];

const FONT_JUDUL = "Fredoka,'Arial Rounded MT Bold',sans-serif";

function Daratan() {
  return (
    <>
      <path d={DARAT} />
      {PULAU.map(d => <path key={d} d={d} />)}
    </>
  );
}

const IKON_PETA = [
  { nama: "istana", label: "Istana Siak", style: { left: "8%", top: "4%" } },
  { nama: "selaso", label: "Rumah Selaso", style: { right: "2%", top: "4%" } },
  { nama: "gajah", label: "Gajah", style: { left: "4%", bottom: "4%" } },
  { nama: "perahu", label: "Pacu Jalur", style: { right: "4%", bottom: "4%" } },
  { nama: "patin", label: "Patin", style: { left: "50%", bottom: "4%", transform: "translateX(-50%)" } },
];

// Peta Provinsi Riau timbul, dengan ikon ciri khas di sekelilingnya.
export default function PetaRiau() {
  return (
    <>
      <svg viewBox="0 0 320 240" role="img" aria-label="Peta Provinsi Riau dengan Pekanbaru sebagai ibu kota">
        <defs>
          <linearGradient id="gPeta" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#86C98A" /><stop offset="1" stopColor="#4FA266" />
          </linearGradient>
          <path id="lengkung" d="M14 200 Q160 240 306 200" />
        </defs>
        <g transform="translate(0 7)" fill="#1F5A3A"><Daratan /></g>
        <g stroke="#C29A45" strokeWidth="3" fill="url(#gPeta)"><Daratan /></g>
        <path d="M60 128 C90 110 120 100 150 128 S210 96 236 66" stroke="#4A90C8" strokeWidth="3.4" fill="none" strokeLinecap="round" opacity=".85" />
        <text x="160" y="96" textAnchor="middle" fontFamily={FONT_JUDUL} fontWeight="700" fontSize="23" fill="#FFF9EC" stroke="#143D27" strokeWidth="5" paintOrder="stroke" letterSpacing="1">PROVINSI RIAU</text>
        <circle cx="150" cy="128" r="7.5" fill="#8E2A22" stroke="#FFF9EC" strokeWidth="3" />
        <text x="150" y="153" textAnchor="middle" fontFamily="Nunito,sans-serif" fontWeight="900" fontSize="13" fill="#2B1A0C" stroke="#FCF3DE" strokeWidth="3.5" paintOrder="stroke">Pekanbaru (Ibu Kota)</text>
        <text fontFamily={FONT_JUDUL} fontWeight="700" fontSize="12.5" fill="#8E2A22">
          <textPath href="#lengkung" startOffset="50%" textAnchor="middle">Jelajahi Riau, Kenali Wilayahmu, Cintai Indonesia!</textPath>
        </text>
      </svg>
      {IKON_PETA.map(i => (
        <div key={i.nama} className="ikon-peta" style={i.style}><Icon nama={i.nama} /><small>{i.label}</small></div>
      ))}
    </>
  );
}
