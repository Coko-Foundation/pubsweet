const path = require('path')
const config = require('config')
const fs = require('fs-extra')

// can't use node-config in webpack so save whitelisted client config into the build and alias it below
const outputPath = path.resolve(__dirname, '_build', 'config')
fs.ensureDirSync(outputPath)
const clientConfigPath = path.join(outputPath, 'client-config.json')
fs.writeJsonSync(clientConfigPath, config, { spaces: 2 })

const makeWebpackConfig = require('@pubsweet/styleguide/src/webpack-config')

const webpackConfig = makeWebpackConfig(__dirname)

webpackConfig.resolve = {
  alias: {
    joi: 'joi-browser',
    config: clientConfigPath,
  },
}

module.exports = webpackConfig
