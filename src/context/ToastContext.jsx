import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [isi, setIsi] = useState({ teks: "", ikon: "", tampil: false });
  const timer = useRef(null);

  const toast = useCallback((teks, ikon = "", ms = 2200) => {
    setIsi({ teks, ikon, tampil: true });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setIsi(s => ({ ...s, tampil: false })), ms);
  }, []);

  const nilai = useMemo(() => ({ isi, toast }), [isi, toast]);
  return <ToastCtx.Provider value={nilai}>{children}</ToastCtx.Provider>;
}

export function useToast() {
  return useContext(ToastCtx).toast;
}

export function useIsiToast() {
  return useContext(ToastCtx).isi;
}
