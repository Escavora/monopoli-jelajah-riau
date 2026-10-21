import { useEffect, useRef } from "react";

const WARNA = ["#3B82F6", "#FACC15", "#22C55E", "#A855F7", "#EF4444", "#C29A45", "#1F5A3A"];

// Hujan konfeti di kanvas layar penuh; berhenti sendiri setelah ±7 detik.
export default function Konfeti() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext("2d");
    cv.width = innerWidth; cv.height = innerHeight;
    const bag = Array.from({ length: 160 }, () => ({
      x: Math.random() * cv.width, y: -20 - Math.random() * cv.height,
      w: 6 + Math.random() * 8, h: 10 + Math.random() * 8, v: 2 + Math.random() * 3,
      r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.2, c: WARNA[Math.floor(Math.random() * WARNA.length)],
    }));
    let t = 0, raf = 0;
    (function loop() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      bag.forEach(b => {
        b.y += b.v; b.x += Math.sin((t + b.r) * 0.05); b.r += b.vr;
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r); ctx.fillStyle = b.c;
        ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h); ctx.restore();
      });
      if (++t < 420) raf = requestAnimationFrame(loop);
      else ctx.clearRect(0, 0, cv.width, cv.height);
    })();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas id="konfeti" ref={ref} />;
}
