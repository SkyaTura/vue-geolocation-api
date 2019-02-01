const { resolve } = require('path')

module.exports = function(moduleOptions) {
  const options = Object.assign({}, this.options.geolocation, moduleOptions)
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'vue-geolocation-api.js',
    options,
  })
}

module.exports.meta = require('../package.json')
