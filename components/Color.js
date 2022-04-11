import { colord } from "colord";
import { Fragment, useState } from "react";
import getColorProps from "../lib/getColorProps";
import { useAppContext } from "./Context";
import { ColorSpot } from "./Variant";

export default function Color({ color, name }) {
  let borderColor = "transparent";
  if (colord(color).isEqual("#fff")) {
    borderColor = "#ccc";
  }

  const colorAttributes = getColorProps(color, name);
  let colorAttributesFmt = {};
  Object.assign(colorAttributesFmt, colorAttributes);
  delete colorAttributesFmt.hash;
  delete colorAttributesFmt.fgColor;
  delete colorAttributesFmt.color;
  delete colorAttributesFmt.minified;

  return (
    <div className="m-3 border border-gray-300 rounded-lg shadow-lg p-2">
      <ColorSpot
        color={color}
        tint="na"
        vari="featured"
        name={name}
        featured={true}
      />

      <div className="p-3">
        <h3 className="uppercase leading-tight tracking-wider text-gray-800 border-b pb-2 mb-1">
          {name}
        </h3>
        <div>
          {Object.entries(colorAttributesFmt).map(([key, value], idx) => (
            <div key={idx}>
              <h4 className="uppercase text-gray-400 leading-tight">{key}</h4>
              <div className="col-span-2 color lowercase 2xl:text-lg font-mono whitespace-pre-line text-gray-600">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
