import Toast from "./components/Toast";
import { useGame } from "./context/GameContext";
import { useSetup } from "./hooks/useSetup";
import KartuModal from "./modals/KartuModal";
import ModalGuru from "./modals/ModalGuru";
import LayarAkhir from "./screens/LayarAkhir";
import LayarAtur from "./screens/LayarAtur";
import LayarCara from "./screens/LayarCara";
import LayarPapan from "./screens/LayarPapan";
import LayarPembuka from "./screens/LayarPembuka";

export default function App() {
  const { layar } = useGame();
  const setup = useSetup();
  return (
    <>
      <div id="app">
        {layar === "layarPembuka" && <LayarPembuka />}
        {layar === "layarCara" && <LayarCara />}
        {layar === "layarAtur" && <LayarAtur setup={setup} />}
        {layar === "layarPapan" && <LayarPapan />}
        {layar === "layarAkhir" && <LayarAkhir />}
      </div>
      <KartuModal />
      <ModalGuru />
      <Toast />
    </>
  );
}
