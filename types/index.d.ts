import Vue, { VueConstructor, PluginObject } from 'vue'

export namespace GeolocationPlugin {
  interface PositionOptions {
    enableHighAccuracy?: boolean
    timeout?: number
    maximumAge?: number
  }

  interface GeoJSONPoint {
    type: 'Point'
    coordinates: [number, number]
  }

  interface PositionCoords {
    readonly latitude: number
    readonly altitude: number
    readonly longitude: number
    readonly accuracy: number
    readonly altitudeAccuracy: number
    readonly heading: number
    readonly speed: number
  }

  type PositionTimestamp = DOMTimeStamp

  interface Position {
    readonly coords: PositionCoords
    readonly timestamp: PositionTimestamp
  }

  interface Options {
    watch: boolean
    options: PositionOptions
  }

  interface Geolocation {
    coords: PositionCoords | null
    timestamp: PositionTimestamp | null
    geoJSON: GeoJSONPoint | null
    loading: boolean
    supported: boolean

    getCurrentPosition: (options?: Options) => Promise<Position>
    setOption: (key: string, value: number | boolean) => void
    checkSupport: () => boolean
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $geolocation: GeolocationPlugin.Geolocation
  }
  interface VueConstructor {
    readonly $geolocation: GeolocationPlugin.Geolocation
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    readonly $geolocation: GeolocationPlugin.Geolocation
  }
  interface Context {
    readonly $geolocation: GeolocationPlugin.Geolocation
  }
}

interface VueGeolocation extends PluginObject<undefined> {}

export default VueGeolocation
