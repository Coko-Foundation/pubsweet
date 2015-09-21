var request = require('superagent')

const utils = {

  addManage: (manage) => {
    return new Promise(function (resolve, reject) {
      request
        .post('/manages')
        .send({ data: manage })
        .end(function (err, res) {
          if (err) {
            console.error(err)
            reject(err)
          } else {
            resolve(res.body)
          }
        })
    })
  },

  updateManage: (id, manage) => {
    return new Promise(function (resolve, reject) {
      request
        .put('/manages/' + id)
        .send({ data: manage })
        .end(function (err, res) {
          if (err) {
            reject(err)
          } else {
            resolve(res.body)
          }
      })
    })
  },

  deleteManage: (id) => {
    request
      .del('/manages/' + id)
      .end(function (err, res) {
        if (err) {
          return console.error(err)
        }
        return res
      })
  }

}

export default utils
