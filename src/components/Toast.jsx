import { useIsiToast } from "../context/ToastContext";
import Icon from "../icons/Icon";

export default function Toast() {
  const { teks, ikon, tampil } = useIsiToast();
  return (
    <div id="toast" role="status" className={tampil ? "tampil" : ""}>
      {ikon && <Icon nama={ikon} />}<span>{teks}</span>
    </div>
  );
}
