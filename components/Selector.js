import { colord, extend } from "colord";
import labPlugin from "colord/plugins/lab";
import a11yPlugin from "colord/plugins/a11y";
import { useEffect, useMemo, useState } from "react";
import A11yView from "./A11yView";
extend([labPlugin, a11yPlugin]);
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmarkLarge} from '@fortawesome/pro-solid-svg-icons'

function wcagOpacity(color) {
  // if (color >= 7) {
  //   return "opacity-100";
  // }
  //
  // if (color >= 4.5) {
  //   return "opacity-95";
  // }
  //
  // if (color >= 3) {
  //   return "opacity-50";
  // }
  //
  // return "opacity-10";
}

function wcag(color) {
    if (color < 3) {
      return <FontAwesomeIcon icon={faXmarkLarge} />;
    }

    return '';
}

const accessibleRuleSets = () => {
  return [
    ["AA", "normal"],
    ["AA", "large"],
    ["AAA", "normal"],
    ["AAA", "large"],
  ];
};

export default function Selector({ colors }) {
  const [colorA, setColorA] = useState("#000000");
  const [colorB, setColorB] = useState("#FFFFFF");
  const [colorState, setColorState] = useState(true);
  const [sortedColors, setSortedColors] = useState(colors);
  const [readable, setReadable] = useState(new Map());

  useMemo(() => {
    setReadable(
      new Map(
        sortedColors.map((color) => [
          color,
          wcag(colord(color).contrast(!colorState ? colorA : colorB)),
        ])
      )
    );
  }, [colorA, colorB, colorState, sortedColors]);

  useMemo(() => {
      setSortedColors(colors.sort((a, b) => {
          const bContrast  = colord(b).contrast(!colorState ? colorA : colorB)
          const aContrast = colord(a).contrast(!colorState ? colorA : colorB)
          if (aContrast < bContrast) return -1
          if (aContrast > bContrast) return 1
          return 0
      }).reverse())
  }, [colorA, colorB, colorState, colors]);

  return (
    <div className="md:flex w-11/12 mx-auto">
      <div className="w-full sm:w-1/2 md:w-1/4 mx-auto my-auto">
        <h1 className="text-center text-xl mb-4">Accessibility</h1>

        <div className="grid grid-cols-4">
          <div
            style={{
              backgroundColor: colord(colorB).isReadable(colorA)
                ? "#008208"
                : "red",
            }}
            className={`w-12 h-12 m-1 border rounded cursor-pointer flex items-center justify-center text-white`}
          >
            AA
          </div>
          <div
            style={{
              backgroundColor: colord(colorB).isReadable(colorA, {
                size: "large",
              })
                ? "#008208"
                : "red",
            }}
            className={`w-12 h-12 m-1 border rounded cursor-pointer flex items-center justify-center text-white`}
          >
            AA<sub>lg</sub>
          </div>
          <div
            style={{
              backgroundColor: colord(colorB).isReadable(colorA, {
                level: "AAA",
              })
                ? "#008208"
                : "red",
            }}
            className={`w-12 h-12 m-1 border rounded cursor-pointer flex items-center justify-center text-white`}
          >
            AAA
          </div>
          <div
            style={{
              backgroundColor: colord(colorB).isReadable(colorA, {
                level: "AAA",
                size: "large",
              })
                ? "#008208"
                : "red",
            }}
            className={`w-12 h-12 m-1 border rounded cursor-pointer flex items-center justify-center text-white`}
          >
            AAA<sub>lg</sub>
          </div>
        </div>

        <div className="flex">
          <p
            style={{
              backgroundColor: colorA,
              color: colord(colorA).isDark() ? "#ffffff" : "#000000",
            }}
            className={`w-12 h-12 m-1 border rounded cursor-pointer flex items-center justify-center ring-black ring-offset-white ring-offset-2  ${
              colorState ? "ring-2" : ""
            }`}
            onClick={(e) => setColorState(true)}
          >
            A
          </p>
          <p
            style={{
              backgroundColor: colorB,
              color: colord(colorB).isDark() ? "#ffffff" : "#000000",
            }}
            className={`w-12 h-12 m-1 border rounded cursor-pointer flex items-center justify-center ring-black ring-offset-white ring-offset-2  ${
              !colorState ? "ring-2" : ""
            }`}
            onClick={(e) => setColorState(false)}
          >
            B
          </p>
        </div>

        <h2>Choose new {colorState ? "A" : "B"} from accessible color list:</h2>
        <div className="grid grid-cols-5 gap-0.5">
          {sortedColors.map((color) => (
            <button
              key={color}
              style={{
                backgroundColor: color,
                color: colord(color).isDark() ? "#ffffff" : "#000000",
              }}
              className={`w-12 h-12 border rounded cursor-pointer flex items-center justify-center text-xs  ${wcagOpacity(
                readable.get(color)
              )}`}
              onClick={(e) => {
                if (colorState) {
                  setColorA(color);
                  setColorState(false);
                } else {
                  setColorB(color);
                  setColorState(true);
                }
              }}
            >
              {readable.get(color)}
            </button>
          ))}
        </div>
      </div>
      <div className="md:w-3/4 mx-auto flex p-2">
        <A11yView colorA={colorA} colorB={colorB} />
        <A11yView colorA={colorB} colorB={colorA} />
      </div>
    </div>
  );
}
