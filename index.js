import React from "react";
import ReactDOM from "react-dom";
import styles from "./LoaderContainer.module.css";
import * as spinkit from "./SpinkitLoaders";

const LOADER_ID = "LOADER_ID"; // target component id for DOM element
const DEFAULT_LOADER = <spinkit.CircleFadeSpiner />;
const DEFAULT_SIZE = "4rem";
const DEFAULT_COLOR = "#333";
const DEFAULT_BACKGROUND = "#fff";

let Loader = DEFAULT_LOADER;
let count = 0;
let hasRunForFirstTime = false;
let background = DEFAULT_BACKGROUND;

const PRESET_LOADERS = {
  "plane-spiner": <spinkit.PlaneSpiner />,
  "chase-spiner": <spinkit.ChaseSpiner />,
  "baunce-spiner": <spinkit.BaunceSpiner />,
  "wave-spiner": <spinkit.WaveSpiner />,
  "pulse-spiner": <spinkit.PulseSpiner />,
  "flow-spiner": <spinkit.FlowSpiner />,
  "swing-spiner": <spinkit.SwingSpiner />,
  "circle-spiner": <spinkit.CircleSpiner />,
  "circle-fade-spiner": <spinkit.CircleFadeSpiner />,
  "grid-spiner": <spinkit.GridSpiner />,
  "fold-spiner": <spinkit.FoldSpiner />,
  "wander-spiner": <spinkit.WanderSpiner />,
};

function appendChildToDom() {
  if (!document.getElementById(LOADER_ID)) {
    const newDiv = document.createElement("div"); // if the element with id doesn't exist, create it
    newDiv.id = LOADER_ID;
    document.body.appendChild(newDiv);
  }

  hasRunForFirstTime = true;
}

function setPresetLoader({ preset, size, color, bg }) {
  const root = document.documentElement;
  root.style.setProperty("--sk-size", size ? size : DEFAULT_SIZE);
  root.style.setProperty("--sk-color", color ? color : DEFAULT_COLOR);
  background = bg ? bg : DEFAULT_BACKGROUND;
  let p = PRESET_LOADERS[preset];
  if (p) {
    Loader = p;
  } else {
    Loader = DEFAULT_LOADER
    console.error('invalid preset, using default')
  }
}

function setCustomLoader(customLoader) {
  Loader = customLoader;
}

function show(callback = () => {}) {
  if (!hasRunForFirstTime) appendChildToDom();
  if (count === 0) {
    ReactDOM.render(
      <div style={{ background }} className={styles.container}>
        {Loader}
      </div>,
      document.getElementById(LOADER_ID),
      callback
    );
  }
  count++;
}

function hide(callback = () => {}) {
  if (hasRunForFirstTime) {
    if (count > 0) {
      count--;
    }
    if (count === 0) {
      ReactDOM.render(
        <></>,
        document.getElementById(LOADER_ID),
        callback
      );
    }
  }
}

function isDisplaying() {
  return count !== 0;
}

const loader = {
  setPresetLoader,
  setCustomLoader,
  show,
  hide,
  isDisplaying,
};

export default loader;
