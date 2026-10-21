import { IKON } from "./index";

// Ikon digambar sendiri pada kanvas 48x48; isinya string SVG statis dari ./icons.
export default function Icon({ nama, extra = "" }) {
  return (
    <svg
      className={`ic ${extra}`.trim()}
      viewBox="0 0 48 48"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: IKON[nama] || "" }}
    />
  );
}
