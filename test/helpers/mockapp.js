const fs = require('fs')
const path = require('path')
const mockdatafile = path.join(__dirname, 'mockapp.json')

const startnewapp = require('pubsweet/test/helpers/startnewapp')

startnewapp().then(
  _app => {
    const mockdata = {
      user: {
        username: _app.user.username,
        password: _app.user.password,
        email: _app.user.email,
        id: _app.user.id
      },
      collection: {
        id: _app.collection.id
      },
      server: process.cwd(),
      pid: process.pid
    }
    fs.writeFileSync(mockdatafile, JSON.stringify(mockdata, null, 2))
    console.log('PARENT SHOULD DETACH')
  }
)
