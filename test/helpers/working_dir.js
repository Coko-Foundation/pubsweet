const fs = require('fs-extra')
const temp = require('temp')

module.exports = () => new Promise(
  (resolve, reject) => temp.mkdir('pubsweet', (err, path) => {
    if (err) return reject(err)
    fs.emptyDir(path, err => {
      if (err) return reject(err)
      process.chdir(path)
      resolve(path)
    })
  })
)
