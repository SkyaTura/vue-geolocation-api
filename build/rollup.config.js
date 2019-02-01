import vue from 'rollup-plugin-vue' // Handle .vue SFC files
import babel from 'rollup-plugin-babel'
export default {
  input: 'src/wrapper.js', // Path relative to package.json
  output: {
    name: 'VueGeolocationApi',
    exports: 'named',
  },
  plugins: [
    vue(),
    babel(), // Transpile to ES5
  ],
}
