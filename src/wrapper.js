import VueGeolocationApi from './vue-geolocation-api'

export function install(Vue, options) {
  if (install.installed) return
  const Component = VueGeolocationApi(Vue, options)
  const geolocation = new Component()
  install.installed = true
  Vue.prototype.$geolocation = geolocation
}

const plugin = { install }

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

export default {
  install,
  VueGeolocationApi,
}
