import React from "react"
import ReactDOM from "react-dom"
import * as spinkit from "./SpinkitLoaders"
import "./LoaderContainer.css"

const LOADER_ID = "super-react-loader" // target component id for DOM element
const DEFAULT_LOADER = <spinkit.CircleFadeSpinner />
const DEFAULT_SIZE = "4rem"
const DEFAULT_COLOR = "#333"
const DEFAULT_BACKGROUND = "#fff"
const ROOT = document.documentElement

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
let background = DEFAULT_BACKGROUND
let hasRunForFirstTime = false
let count = 0

// sets default global css variables
ROOT.style.setProperty("--sk-size", DEFAULT_SIZE)
ROOT.style.setProperty("--sk-color", DEFAULT_COLOR)

function appendChildToDom() {
  if (!document.getElementById(LOADER_ID)) {
    const newDiv = document.createElement("div") // if the element with id doesn't exist, create it
    newDiv.id = LOADER_ID
    document.body.appendChild(newDiv)
  }

  hasRunForFirstTime = true
}

function setPresetLoader({ preset, size, color, bg }) {
  ROOT.style.setProperty("--sk-size", size ? size : DEFAULT_SIZE)
  ROOT.style.setProperty("--sk-color", color ? color : DEFAULT_COLOR)
  background = bg ? bg : DEFAULT_BACKGROUND
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
  if (!hasRunForFirstTime) appendChildToDom()
  if (count === 0) {
    ReactDOM.render(
      <div style={{ background }} className='loader_loaderContainer'>
        {Loader}
      </div>,
      document.getElementById(LOADER_ID),
      callback
    )
  }
  count++
}

function hide(callback = () => {}) {
  if (hasRunForFirstTime) {
    if (count > 0) {
      count--
    }
    if (count === 0) {
      ReactDOM.render(
        <></>,
        document.getElementById(LOADER_ID),
        callback
      )
    }
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
