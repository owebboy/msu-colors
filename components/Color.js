import { colord } from "colord";
import { Fragment } from "react";
import getColorProps from "../lib/getColorProps";
import { useAppContext } from "./Context";

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
  const [sharedState, setSharedState] = useAppContext();

  return (
    <div className="m-3 border border-gray-300 rounded-lg shadow-lg p-2">
      <button
        tabIndex="0"
        aria-checked="false"
        role="radio"
        style={{
          backgroundColor: color,
          border: `1px solid ${borderColor}`,
        }}
        className="focus:outline-none focus-within:ring ring-offset-2 focus-within:ring-black focus-within:ring-opacity-50 w-full h-32 shadow-sm rounded-md cursor-pointer select-none transition-all hover:drop-shadow-lg"
        onClick={(e) => {
          sharedState.hash === colorAttributes.hash
            ? setSharedState({})
            : setSharedState(colorAttributes);
        }}
      ></button>

      <div className="p-3">
        <h3 className="uppercase leading-3 tracking-wider text-gray-800 border-b pb-2 mb-1">
          {name}
        </h3>
        <div className=" grid grid-cols-3 justify-center items-center grid-rows-3 gap-x-3 md:grid-cols-1 xl:grid-cols-3">
          {Object.entries(colorAttributesFmt).map(([key, value], idx) => (
            <Fragment key={idx}>
              <h4 className="uppercase text-gray-400">{key}</h4>
              <div className="col-span-2 color lowercase 2xl:text-lg">
                {value}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
