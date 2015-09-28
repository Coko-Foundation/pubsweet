var request = require('superagent')

const utils = {
  getCreate: (id) => {
    return new Promise(function (resolve, reject) {
      request
        .get(`/creates/${id}`)
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

  addCreate: (manageId, create) => {
    return new Promise(function (resolve, reject) {
      request
        .post(`/creates`)
        .send({ data: create })
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

  updateCreate: (id, create) => {
    return new Promise(function (resolve, reject) {
      request
        .put(`/creates/${id}`)
        .send({ data: create })
        .end(function (err, res) {
          if (err) {
            reject(err)
          } else {
            resolve(res.body)
          }
        })
    })
  },

  deleteCreate: (id) => {
    request
      .del(`/creates/${id}`)
      .end(function (err, res) {
        if (err) {
          return console.error(err)
        }
        return res
      })
  }

}

export default utils
