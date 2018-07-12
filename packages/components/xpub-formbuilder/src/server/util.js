const fs = require('fs')
const path = require('path')

const Util = {}

const promiseAllP = (items, block) => {
  const promises = []
  items.forEach((item, index) => {
    const prom = () =>
      new Promise((resolve, reject) =>
        block.apply(this, [item, index, resolve, reject]),
      )
    promises.push(prom(item, index))
  })
  return Promise.all(promises)
}

Util.readFiles = dirname =>
  new Promise((resolve, reject) => {
    fs.readdir(dirname, (err, filenames) => {
      if (err) return reject(err)
      return promiseAllP(filenames, (filename, index, resolve, reject) =>
        fs.readFile(
          path.resolve(dirname, filename),
          'utf-8',
          (err, content) => {
            if (err) return reject(err)
            return resolve({
              filename,
              content,
            })
          },
        ),
      )
        .then(results => resolve(results))
        .catch(error => reject(error))
    })
  })

module.exports = Util
