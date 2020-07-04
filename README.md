# Super React Loader
The easiest way to implement a full-screen loader in React.
Just import the library and write `loader.show()`.

## Demo
Try it on [CodeSandbox](https://codesandbox.io/s/super-react-loader-y7epr?file=/src/App.js).

## Install
Using npm:
```bash
npm i super-react-loader
```
or using yarn:
```bash
yarn add super-react-loader
```

## Basic usage
```javascript
import loader from 'super-react-loader'

loader.show() // shows loader
loader.hide() // hides loader
```
Very easy and clean :)

## Customization
You can choose between some preset loaders or create your custom.

### Preset loaders
To use it you have to pass the preset name.
```javascript
// in your index.js
loader.setPresetLoader({ preset: 'fold' })
```
Options
```javascript
loader.setPresetLoader({
    preset: 'plane',    // loader preset name
    size: '8rem',       // loader size
    color: '#000',      // loader color
    bg: 'lightblue'     // background property
})
```
#### Available loaders (based on [SpinKit](https://github.com/tobiasahlin/SpinKit) library)
- `plane`
- `chase`
- `baunce`
- `wave`
- `pulse`
- `flow`
- `swing`
- `circle`
- `circle-fade` _(default)_
- `grid`
- `fold`
- `wander`

### Set your custom loader component
```javascript
const MyCustomLoader = () => <div>loading...</div>

loader.setCustomLoader(<MyCustomLoader />)
```

You can combine it with `setPresetLoader` to define the background
```javascript
const MyCustomLoader = () => <div>Loading...</div>

loader.setPresetLoader({ bg: '#652BE2' }) // change background color
loader.setCustomLoader(<MyCustomLoader />)
```

## API
##### `loader.show([callBack()])`
Shows the loader.
Accepts an optional callback function that is executed when the loader rendering is finished.

##### `loader.hide([callBack()])`
Hides the loader.
Accepts an optional callback function that is executed when the loader is finished hiding.

##### `loader.setPresetLoader({ preset, size, color, bg })`
Changes the loader animation by another preset loader.
Receives a strings object.
- `preset`: Name of the preset. Default is `'circle-fade'`.
- `size`: Size of the loader. It set css width and length property. Default is `'4rem'`
- `color`: Color of the loader. Default is `'#333'`
- `bg`: Background css property. Default is `'#fff'`

##### `loader.setCustomLoader(Component)`
Sets a new custom loader inside a full-screen container.
Receives a React component or element.

##### `loader.isDisplaying()`
Returns `true` if the loader is displaying. Otherwise returns `false`.
