import { useEffect, useState } from "react";
import getColorProps from "../lib/getColorProps";
import { useAppContext } from "./Context";
import cn from "classnames";

export function Variant({ colors, tint, vari }) {
  return (
    <div className="grid grid-flow-col w-3/4 mx-auto justify-center">
      {colors.map((color, key) => (
        <ColorSpot key={key} color={color} tint={tint} vari={vari} />
      ))}
    </div>
  );
}

export function ColorSpot({ color, tint, vari, name=null, featured=false }) {
  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState(false);
  const [mouse, setMouse] = useState(false);
  const [sharedState, setSharedState] = useAppContext();
  const colorProps = getColorProps(color, name, tint, vari);

  useEffect((e) => {
    setSelected(sharedState.hash == colorProps.hash)
  }, [sharedState.hash, colorProps.hash])

  return (
    <button
      tabIndex="0"
      aria-checked="false"
      role="radio"
      style={{
        backgroundColor: color,
        color: colorProps.fgColor,
      }}
      className={cn(
        selected && featured ? cn('ring ring-blue-500 ring-offset-white ring-offset-2') : '',
        selected && !featured ? cn((tint == "white" ? "ring-black" : "ring-white"), tint=='spartanGreen'?'ring-offset-green-spartan':tint=='white'?'ring-offset-white':'ring-offset-black', 'ring ring-offset-4'):"",
        featured?'w-full h-32 shadow-sm':"w-12 h-12 md:w-20 md:h-20 md:m-6 m-2",
        featured && color=='#FFFFFF'?'border border-gray-500':"",
        "focus:outline-none  text-xs  rounded-md drop-shadow-sm border-transparent flex items-center justify-center transition-all hover:drop-shadow-lg select-none cursor-pointer"
      )}
      onMouseLeave={(e) => setToggle(false)}
      onMouseEnter={(e) => setToggle(true)}
      onMouseDown={(e) => setMouse(true)}
      onFocus={(e) => {
        if (!mouse) { 
          setSharedState(colorProps);
        }
        setMouse(false);
      }}
      onClick={(e) => {
        if (selected) {
          setSharedState({});
        } else {
          setSharedState(colorProps);
        }
      }}
    >
      {!featured && toggle && color}
    </button>
  );
}
