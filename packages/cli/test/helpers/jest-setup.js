const path = require('path')

process.env.NODE_CONFIG_DIR = path.resolve(__dirname, '..', 'config')

process.cwd = () => path.resolve(__dirname, '..')
