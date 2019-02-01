import Vue from 'vue'
import VueGeolocationApi from 'vue-geolocation-api'

// eslint-disable-next-line
Vue.use(VueGeolocationApi, <%= JSON.stringify(options, null, 2) %>)
