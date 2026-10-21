/* ===== MUSIK LATAR: loop 8 birama bergaya zapin, tangga nada pentatonik A minor =====
   Melodi petik (gambus) + bas + gendang (dum/tak). Volume sengaja kecil; menyingkir saat kartu terbuka. */
import { ambilCtx } from "./audioContext";

const N = { A3: 220, C4: 261.63, D4: 293.66, E4: 329.63, G4: 392, A4: 440, C5: 523.25, D5: 587.33, E5: 659.25 };
const MEL = [
  "A4 - C5 A4 G4 - E4 -", "D4 E4 G4 - E4 D4 C4 -", "C5 - D5 C5 A4 - G4 E4", "E4 G4 E4 D4 C4 - A3 -",
  "E5 - D5 C5 D5 - C5 A4", "G4 - A4 C5 A4 G4 E4 -", "C5 D5 C5 A4 G4 E4 G4 A4", "G4 E4 D4 E4 C4 - A3 -",
].map(b => b.split(" ").map(n => N[n] || 0));
const AKAR = [110, 110, 146.83, 110, 110, 110, 146.83, 164.81];
const DUM = [0, 3, 4], TAK = [2, 5, 7];
const BPM = 112, DUR = 60 / BPM / 2, TINGGI = 0.7;

let aktif = true, timer = null, langkah = 0, nextT = 0, master = null, noise = null;

function ac() {
  const a = ambilCtx();
  if (a.state === "suspended") a.resume();
  return a;
}

function petik(f, t, vol) {
  const a = ambilCtx(), o = a.createOscillator(), g = a.createGain(), lp = a.createBiquadFilter();
  o.type = "square"; lp.type = "lowpass"; lp.frequency.value = 2200;
  o.frequency.setValueAtTime(f * 1.06, t); o.frequency.exponentialRampToValueAtTime(f, t + 0.045);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0008, t + DUR * 1.6);
  o.connect(lp).connect(g).connect(master); o.start(t); o.stop(t + DUR * 1.7);
}
function bas(f, t) {
  const a = ambilCtx(), o = a.createOscillator(), g = a.createGain();
  o.type = "triangle"; o.frequency.value = f;
  g.gain.setValueAtTime(0.1, t); g.gain.exponentialRampToValueAtTime(0.001, t + DUR * 2);
  o.connect(g).connect(master); o.start(t); o.stop(t + DUR * 2.1);
}
function dum(t) {
  const a = ambilCtx(), o = a.createOscillator(), g = a.createGain();
  o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(55, t + 0.12);
  g.gain.setValueAtTime(0.16, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
  o.connect(g).connect(master); o.start(t); o.stop(t + 0.22);
}
function tak(t) {
  const a = ambilCtx(), s = a.createBufferSource(), hp = a.createBiquadFilter(), g = a.createGain();
  if (!noise) {
    noise = a.createBuffer(1, a.sampleRate * 0.06, a.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  s.buffer = noise; hp.type = "highpass"; hp.frequency.value = 3000;
  g.gain.setValueAtTime(0.07, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
  s.connect(hp).connect(g).connect(master); s.start(t);
}
function main(s, t) {
  const bar = s >> 3, i = s & 7, f = MEL[bar][i];
  if (f) petik(f, t, 0.05);
  if (i === 0) bas(AKAR[bar], t);
  if (i === 4) bas(AKAR[bar] * 1.5, t);
  if (DUM.includes(i)) dum(t);
  if (TAK.includes(i) || (bar === 7 && i === 6)) tak(t);
}
function tick() {
  const a = ac();
  while (nextT < a.currentTime + 0.15) { main(langkah, nextT); nextT += DUR; langkah = (langkah + 1) % 64; }
}

export const Musik = {
  start() {
    if (!aktif || timer) return;
    const a = ac();
    if (!master) { master = a.createGain(); master.connect(a.destination); }
    master.gain.setValueAtTime(TINGGI, a.currentTime);
    nextT = a.currentTime + 0.1;
    timer = setInterval(tick, 40);
  },
  stop() { clearInterval(timer); timer = null; },
  toggle() { aktif = !aktif; if (aktif) this.start(); else this.stop(); return aktif; },
  duck(b) { if (master) master.gain.setTargetAtTime(b ? TINGGI * 0.3 : TINGGI, ambilCtx().currentTime, 0.15); },
  nyala() { return aktif; },
};
