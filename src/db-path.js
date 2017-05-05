module.exports = appPath => require('path').join(appPath, 'api', 'db', process.env.NODE_ENV)
