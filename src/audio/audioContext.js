// Satu AudioContext dipakai bersama oleh efek suara dan musik latar.
let ctx = null;

export function ambilCtx() {
  ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}
