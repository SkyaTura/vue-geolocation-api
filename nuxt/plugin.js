import Vue from 'vue'
import VGA from 'vue-geolocation-api'

export default (ctx, inject) => {
  // eslint-disable-next-line
  const Component = VGA.VueGeolocationApi(Vue, <%= JSON.stringify(options, null, 2) %>)
  const geolocation = new Component()
  ctx.app.$geolocation = geolocation
  inject('geolocation', geolocation)
}
