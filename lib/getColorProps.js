import { colord, extend } from "colord";

import names from "colord/plugins/names";
import cmykPlugin from "colord/plugins/cmyk";
import minify from "colord/plugins/minify";

extend([cmykPlugin, minify, names]);

export default function getColorProps(
  color,
  name = null,
  tint = null,
  vari = null
) {
  let rgb = colord(color).toRgb();
  return {
    color: name
      ? name
      : colord(color).toName()
      ? colord(color).toName()
      : `R:${rgb.r.toString().padStart(3, "0")} G:${rgb.g
          .toString()
          .padStart(3, "0")} B:${rgb.b.toString().padStart(3, "0")}`,
    hex: color,
    rgb: colord(color).toRgbString(),
    hsl: colord(color).toHslString(),
    minified: colord(color).minify(),
    fgColor: colord(color).isLight() ? "black" : "white",
    hash: `${tint}-${vari}-${color}`,
  };
}
