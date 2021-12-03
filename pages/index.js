import { colord } from "colord";
import Head from "next/head";
import { useState } from "react";
import Color from "../components/Color";
import { useAppContext } from "../components/Context";
import { Variant, Swatch } from "../components/Variant";
import colors from "../data/colors.json";

export default function Home() {
  const [sharedState, setSharedState] = useAppContext();
  const [copied, setCopied] = useState(false);
  return (
    <main>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>
      <div className="container mx-auto mb-48">
        <header className="flex flex-col items-start justify-center my-10 w-max mx-auto">
          <h1 className="text-5xl font-semibold">MSU Colors</h1>
          <hr
            style={{ borderColor: "#0B9A6D" }}
            className="w-12  border-t-8 mt-5"
          />
        </header>

        <div className="m-1">
          <h2 className="text-2xl text-center mb-2">Primary Colors</h2>
          <div className="grid md:grid-cols-3 lg:w-3/4 mx-auto">
            {colors.primaryColors.map((c, i) => (
              <Color key={i} color={c.color} name={c.name} />
            ))}
          </div>

          <h2 className="text-2xl text-center my-2">Secondary Colors</h2>
          <div className="grid md:grid-cols-3  lg:w-3/4 mx-auto">
            {colors.secondaryColors.map((c, i) => (
              <Color key={i} color={c.color} name={c.name} />
            ))}
          </div>

          <h2 className="text-2xl text-center my-2">Accessible Tints</h2>

          <h3 className="text-xl text-center mb-2">On Black</h3>
          <div className="shadow-lg bg-black w-full h-96 flex flex-col items-center justify-center rounded-lg">
            {colors.tints.black.map((v, i) => (
              <Variant key={i} tint="black" vari={i} colors={v} />
            ))}
          </div>

          <h3 className="text-xl text-center my-2">On Spartan Green</h3>
          <div
            style={{ backgroundColor: colors.primaryColors[0].color }}
            className="shadow-lg w-full h-96 flex flex-col items-center justify-center rounded-lg"
          >
            {colors.tints.spartanGreen.map((v, i) => (
              <Variant key={i} tint="spartanGreen" vari={i} colors={v} />
            ))}
          </div>

          <h3 className="text-xl text-center my-2">On White</h3>
          <div className="shadow-lg bg-white w-full h-96 flex flex-col items-center justify-center rounded-lg border border-gray-500 ">
            {colors.tints.white.map((v, i) => (
              <Variant key={i} tint="white" vari={i} colors={v} />
            ))}
          </div>
        </div>
        <div className="text-center py-10">
          Created by <a href="//oliverpope.com">Oliver Pope</a> for{" "}
          <a href="//msu.edu">MSU. 💚 </a>
        </div>
      </div>

      <footer
        style={{
          backgroundColor: sharedState.color
            ? colord(sharedState.hex).alpha(0.75).toRgbString()
            : "transparent",
          color: sharedState.color ? sharedState.fgColor : "transparent",
          borderColor: sharedState.color
            ? colord(sharedState.hex).isEqual("white")
              ? "#ccc"
              : colord(sharedState.hex).toHex()
            : "transparent",
          height: sharedState.color ? "6rem" : "0",
        }}
        className="transition-all ease-in-out fixed w-full h-24 bottom-0 left-0 backdrop-filter backdrop-blur z-30 bg-opacity-70 border-t flex flex-col shadow drop-shadow-2xl"
      >
        <div className="container mx-auto px-5 flex justify-between items-center h-full">
          <div className="text-3xl font-light uppercase tracking-widest">
            {sharedState.color}
          </div>
          <div className="text-center">
            <div
              className="text-3xl font-light cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(sharedState.hex);
                setCopied(true);
                setTimeout(() => setCopied(false), 1000);
              }}
            >
              {sharedState.hex}
            </div>
            <h3 className="uppercase text-xs">
              {copied ? "Copied" : "Click to copy"}
            </h3>
          </div>
        </div>
        <div
          className="text-sm text-center uppercase mb-3 leading-none select-none cursor-pointer"
          onClick={(e) => setSharedState({})}
        >
          close
        </div>
      </footer>
    </main>
  );
}
