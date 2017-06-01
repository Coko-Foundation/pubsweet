// const fs = require('fs-extra')
const temp = require('temp')

module.exports = async () => {
  const path = temp.mkdirSync('pubsweet')
  console.log(path)

  // await fs.emptyDir(path)

  process.chdir(path)

  return path
}
