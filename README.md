# Vue Geolocation API
A simple reactive wrapper for [Geolocation Web API](https://developer.mozilla.org/pt-BR/docs/Web/API/Geolocation)

## Features
* Customizable
* Reactive geolocation position
* Simple watcher control
* SSR Compatibility
* GeoJSON output

## Setup
Install with npm
```bash
npm install --save vue-geolocation-api
```
Install with yarn
```bash
yarn add vue-geolocation-api
```

### Vue instance
```js
import Vue from 'vue'
import VueGeolocationApi from 'vue-geolocation-api'

Vue.use(VueGeolocationApi/*, { ...options } */)
```
### Nuxt
Add to [modules](https://nuxtjs.org/guide/modules) section at your **nuxt.config.js**
```js
module.exports =  {
  modules:  [
    'vue-geolocation-api/nuxt',
  ],
  geolocation:  {
    // watch: true,
  },
}
```

## Usage

### Computed properties
```js
export default {
  // ...
  computed: {
    inRange() {
      const coords = this.$geolocation.coords
      if (!coords) return '?'
      return distanceFrom(coords, this.destination) > 150
    }
  }
}
```
*Note that distanceFrom is not included in this package, if you need this feature I recommend to use with [@turf/distance](https://www.npmjs.com/package/@turf/distance) or [geo-distance](https://www.npmjs.com/package/geo-distance)*

### Component templates
```html
<template>
  <div>
    <span v-if="$geolocation.loading">Loading location...</span>
    <span v-else-if="!$geolocation.supported">Geolocation API is not supported</span>
    <span v-else>Range from destination: {{ inRange ? 'Allowed' : 'Disallowed' }}</span>
  </div>
</template>
```

### Watch statements
```js
export default {
  // ...
  watch: {
    inRange(reached) {
      if (reached !== true) return
      console.log('Congratulations, you arrived')
      this.$geolocation.watch = false // Stop watching location
    }
  }
}
```

## Outputs
### $geolocation.position *[[Position](https://developer.mozilla.org/pt-BR/docs/Web/API/Position)]*
Exposes the results from [getCurrentPosition](https://developer.mozilla.org/pt-BR/docs/Web/API/Geolocation/getCurrentPosition) or the last result from [watchPosition](https://developer.mozilla.org/pt-BR/docs/Web/API/Geolocation/watchPosition).
**Default or unavailable:** null

### $geolocation.loading *[Boolean]*
If ***true***, means the location is currently being executed.

### $geolocation.supported *[Boolean]*
If ***true*** means the location api is available in the browser.
If ***false*** means the location api is not available in the browser.
if ***null*** means the support wasn't verified yet.

### $geolocation.coords *[[Coordinates](https://developer.mozilla.org/pt-BR/docs/Web/API/Coordinates)]*
Alias for `$geolocation.position.coords`
**Default or unavailable:** null

### $geolocation.timestamp [[Timestamp](https://www.unixtimestamp.com/)]
Alias for `$geolocation.position.timestamp`
**Default or unavailable:** null

### $geolocation.geoJSON [[GeoJSON](http://geojson.org/) Point]
Formatted coordinates.
**Default or unavailable:** null

## Options

### $geolocation.watch *[Boolean]*
If ***true*** will initiate `watchPosition`.
If ***false*** stop `watchPosition`.
This property **can** be changed dynamically and **will** react to it's changes.

### $geolocation.options *[[PositionOptions](https://developer.mozilla.org/pt-BR/docs/Web/API/PositionOptions)]*
Defines the parameters that will be used by `getCurrentPosition` and `watchPosition`.
Changing this property will trigger an `watchPosition` reload if currently watching.
**Important:** This property is only reactive if you replace it entirely. If you just want to change one options check the method `setOption`

## Methods

### $geolocation.getCurrentPosition(?options) *[Promised [Position](https://developer.mozilla.org/pt-BR/docs/Web/API/Position)]*
Simply wraps the `navigator.geolocation.getCurrentPosition` as a Promise.

### $geolocation.setOption(key, value) *[Undefined]*
Reactively updates the `key` property in `$geolocation.options` with `value`.

### $geolocation.checkSupport() *[Boolean]*
Forces the `$geolocation.supported` to update.

## Contributing or Issuing
### Coming soon...
#
### Created by [@SkyaTura](https://github.com/SkyaTura)
