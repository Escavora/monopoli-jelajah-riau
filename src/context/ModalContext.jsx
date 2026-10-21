import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const ModalCtx = createContext(null);
let urutan = 0;

// Modal kartu berbasis Promise: `buka(cfg)` menunggu sampai pemain menutupnya dan
// mengembalikan nilai yang dikirim ke `tutup(nilai)` (mis. true/false hasil jawaban).
export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);
  const penyelesai = useRef(null);

  const buka = useCallback(cfg => new Promise(res => {
    penyelesai.current = res;
    setModal({ ...cfg, id: ++urutan });
  }), []);

  const tutup = useCallback(nilai => {
    setModal(null);
    const r = penyelesai.current;
    penyelesai.current = null;
    if (r) r(nilai);
  }, []);

  const ada = useCallback(() => penyelesai.current !== null, []);

  const nilai = useMemo(() => ({ modal, buka, tutup, ada }), [modal, buka, tutup, ada]);
  return <ModalCtx.Provider value={nilai}>{children}</ModalCtx.Provider>;
}

export function useModal() {
  return useContext(ModalCtx);
}
