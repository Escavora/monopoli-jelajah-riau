import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { GameProvider } from "./context/GameContext";
import { ModalProvider } from "./context/ModalContext";
import { ToastProvider } from "./context/ToastContext";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <ModalProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </ModalProvider>
    </ToastProvider>
  </StrictMode>
);
