import { useEffect } from "react";
import { Musik } from "../audio/musik";

// Musik latar menyala selama layar papan tampil, dan berhenti saat tab disembunyikan.
export function useMusikLatar() {
  useEffect(() => {
    Musik.start();
    const onVis = () => (document.hidden ? Musik.stop() : Musik.start());
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      Musik.stop();
    };
  }, []);
}
