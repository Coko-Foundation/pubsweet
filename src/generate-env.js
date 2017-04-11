const path = require('path')
const fs = require('fs-extra')
const uuid = require('uuid')

const envpath = mode => path.join(process.cwd(), `.env.${mode}`)

const envfile = () => `PUBSWEET_SECRET=${uuid.v4()}\n`

const write = (path, content) => new Promise(
  (resolve, reject) => fs.writeFile(
    path,
    content,
    err => {
      if (err) return reject(err)
      return resolve(path)
    }
  )
)

module.exports = () => {
  return write(
    envpath(process.env.NODE_ENV), envfile(process.env.NODE_ENV)
  )
}
