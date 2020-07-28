import React, { Fragment } from "react"
import ReactDOM from "react-dom"
import * as spinkit from "./SpinkitLoaders.jsx"
import "./LoaderContainer.css"

const CONTAINER_REF = document.createElement("div") // target DOM element ref
const DEFAULT_LOADER = <spinkit.CircleFadeSpinner />
const DEFAULT_SIZE = "4rem"
const DEFAULT_COLOR = "#333"
const DEFAULT_BACKGROUND = "#fff"

const PRESET_LOADERS = {
  "plane": <spinkit.PlaneSpinner />,
  "chase": <spinkit.ChaseSpinner />,
  "baunce": <spinkit.BaunceSpinner />,
  "wave": <spinkit.WaveSpinner />,
  "pulse": <spinkit.PulseSpinner />,
  "flow": <spinkit.FlowSpinner />,
  "swing": <spinkit.SwingSpinner />,
  "circle": <spinkit.CircleSpinner />,
  "circle-fade": <spinkit.CircleFadeSpinner />,
  "grid": <spinkit.GridSpinner />,
  "fold": <spinkit.FoldSpinner />,
  "wander": <spinkit.WanderSpinner />
}

let Loader = DEFAULT_LOADER
let count = 0

// sets a new value for a css variable
function setCssVar(name, newValue) {
  document.documentElement.style.setProperty(name, newValue)
}

// append container div to DOM
document.body.appendChild(CONTAINER_REF)

// sets default global css variables
setCssVar("--sk-size", DEFAULT_SIZE)
setCssVar("--sk-color", DEFAULT_COLOR)
setCssVar("--srl-background", DEFAULT_BACKGROUND)

function setPresetLoader({ preset, size, color, bg }) {
  setCssVar("--sk-size", size ? size : DEFAULT_SIZE)
  setCssVar("--sk-color", color ? color : DEFAULT_COLOR)
  setCssVar("--srl-background", bg ? bg : DEFAULT_BACKGROUND)
  let p = PRESET_LOADERS[preset]
  if (p) {
    Loader = p
  } else {
    Loader = DEFAULT_LOADER
    console.error('invalid preset, using default')
  }
}

function setCustomLoader(customLoader) {
  Loader = customLoader
}

function show(callback = () => {}) {
  if (count === 0) {
    ReactDOM.render(
      <div className='loader_loaderContainer'>
        {Loader}
      </div>,
      CONTAINER_REF,
      callback
    )
  }
  count++
}

function hide() {
  if (count > 0) {
    count--
  }
  if (count === 0) {
    ReactDOM.unmountComponentAtNode(CONTAINER_REF)
  }
}

function isDisplaying() {
  return count !== 0
}

const loader = {
  setPresetLoader,
  setCustomLoader,
  show,
  hide,
  isDisplaying
}

export default loader
