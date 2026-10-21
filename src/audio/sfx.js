// Efek suara sintetis (WebAudio), tanpa file audio.
import { ambilCtx } from "./audioContext";

let suaraOn = true;

export const suaraNyala = () => suaraOn;
export function toggleSuara() {
  suaraOn = !suaraOn;
  return suaraOn;
}

function nada(freq, dur, tipe = "sine", vol = 0.15, delay = 0) {
  if (!suaraOn) return;
  try {
    const ac = ambilCtx();
    const t = ac.currentTime + delay, o = ac.createOscillator(), g = ac.createGain();
    o.type = tipe; o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(ac.destination); o.start(t); o.stop(t + dur);
  } catch (e) { /* audio tidak tersedia: abaikan */ }
}

export const SFX = {
  dadu() { for (let i = 0; i < 8; i++) nada(200 + Math.random() * 300, 0.05, "square", 0.06, i * 0.07); },
  langkah() { nada(520, 0.08, "triangle", 0.12); },
  benar() { [523, 659, 784, 1046].forEach((f, i) => nada(f, 0.18, "triangle", 0.14, i * 0.1)); },
  salah() { nada(300, 0.2, "sawtooth", 0.08); nada(220, 0.3, "sawtooth", 0.08, 0.18); },
  kartu() { nada(700, 0.06, "sine", 0.1); nada(950, 0.08, "sine", 0.1, 0.07); },
  menang() { [523, 659, 784, 659, 784, 1046].forEach((f, i) => nada(f, 0.25, "triangle", 0.15, i * 0.15)); },
};
