import { getCurrentPosition, positionToObject } from './helpers'

export const VueGeolocationApi = (Vue, defaultOptions = {}) =>
  Vue.extend({
    data: () =>
      Object.assign(
        {
          options: {},
          watch: false,
        },
        defaultOptions,
        {
          _watcher: null,
          position: null,
          loading: false,
          supported: null,
        }
      ),
    computed: {
      coords() {
        const { position } = this
        return position ? position.coords : null
      },
      timestamp() {
        const { position } = this
        return position ? position.timestamp : null
      },
      geoJSON() {
        const { coords } = this
        if (!coords) return null
        const { latitude, longitude, altitude } = coords
        const coordinates = [latitude, longitude]
        return altitude === null ? coordinates : [...coordinates, altitude]
      },
    },
    watch: {
      watch: '_watch',
      options: {
        deep: true,
        handler: '_watch',
      },
    },
    beforeDestroy() {
      this.clearTimer()
    },
    created() {
      if (typeof window === 'undefined') return
      this.checkSupport()
      this._watch()
    },
    methods: {
      checkSupport() {
        return (this.supported = 'geolocation' in navigator)
      },
      async getCurrentPosition(options) {
        if (!this.checkSupport()) return
        const params = Object.assign({}, this.options, options || {})
        this.loading = true
        const response = await getCurrentPosition(params)
        return this._setCurrentPosition(response)
      },
      setOption(key, value) {
        this.options = Object.assign({}, this.options, { [key]: value })
      },
      _setCurrentPosition(position) {
        if (!position) {
          this.position = null
        }
        this.loading = false
        return (this.position = positionToObject(position))
      },
      _watch() {
        if (!this.watch) return this._clearWatch()
        this._watchPosition()
      },
      _clearWatch() {
        if (!this._watcher) return
        navigator.geolocation.clearWatch(this._watcher)
        this._watcher = null
      },
      _watchPosition(_success, _error, options) {
        if (!this.checkSupport()) return
        this._clearWatch()
        this.loading = true
        this._watcher = navigator.geolocation.watchPosition(
          _success || (position => this._setCurrentPosition(position)),
          _error || (positionError => console.error(positionError)),
          options
        )
      },
    },
  })

export default VueGeolocationApi
