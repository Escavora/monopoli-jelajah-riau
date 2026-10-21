import { createContext, useContext, useState, useSyncExternalStore } from "react";
import { buatEngine } from "../game/engine";
import { useModal } from "./ModalContext";
import { useToast } from "./ToastContext";

const EngineCtx = createContext(null);

export function GameProvider({ children }) {
  const toast = useToast();
  const { buka, tutup, ada } = useModal();
  // Dibuat sekali: toast dan fungsi modal bersifat stabil, state selalu dibaca lewat store.
  const [engine] = useState(() => buatEngine({ toast, modal: { buka, tutup, ada } }));
  return <EngineCtx.Provider value={engine}>{children}</EngineCtx.Provider>;
}

/** State permainan terkini; komponen dirender ulang saat state berubah. */
export function useGame() {
  const { store } = useContext(EngineCtx);
  return useSyncExternalStore(store.subscribe, store.get);
}

/** Aksi permainan (lempar dadu, mulai, Mode Guru, ...). Referensinya tidak berubah. */
export function useAksi() {
  return useContext(EngineCtx).aksi;
}
