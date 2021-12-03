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
  return {
    color: name
      ? name
      : colord(color).toName()
      ? colord(color).toName()
      : `~${colord(color).toName({ closest: true })}`,
    hex: color,
    rgb: colord(color).toRgbString(),
    hsl: colord(color).toHslString(),
    minified: colord(color).minify(),
    fgColor: colord(color).isLight() ? "black" : "white",
    hash: `${tint}-${vari}-${color}`,
  };
}
