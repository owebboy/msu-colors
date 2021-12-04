import { useState } from "react";
import getColorProps from "../lib/getColorProps";
import { useAppContext } from "./Context";

export function Variant({ colors, tint, vari }) {
  return (
    <div className="grid grid-flow-col w-3/4 mx-auto justify-center">
      {colors.map((color, key) => (
        <ColorSpot key={key} color={color} tint={tint} vari={vari} />
      ))}
    </div>
  );
}

function ColorSpot({ color, tint, vari }) {
  const [toggle, setToggle] = useState(false);
  const [sharedState, setSharedState] = useAppContext();
  const colorProps = getColorProps(color, null, tint, vari);
  return (
    <div
      style={{
        backgroundColor: color,
        color: colorProps.fgColor,
      }}
      className="w-12 h-12 m-2 text-xs md:w-20 md:h-20 md:m-6 rounded-md drop-shadow-sm border-2 border-transparent flex items-center justify-center transition-all hover:drop-shadow-2xl select-none cursor-pointer"
      onMouseLeave={(e) => setToggle(false)}
      onMouseEnter={(e) => setToggle(true)}
      onClick={(e) =>
        sharedState.hash === colorProps.hash
          ? setSharedState({})
          : setSharedState(colorProps)
      }
    >
      {toggle && color}
    </div>
  );
}
