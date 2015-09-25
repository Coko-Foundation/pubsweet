var request = require('superagent')

const utils = {
  getCreate: (manageId, id) => {
    return new Promise(function (resolve, reject) {
      request
        .get(`/manages/${manageId}/creates/${id}`)
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
        .post(`/manages/${manageId}/creates`)
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

  updateCreate: (manageId, id, create) => {
    return new Promise(function (resolve, reject) {
      request
        .put(`/manages/${manageId}/creates/${id}`)
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

  deleteCreate: (manageId, id) => {
    request
      .del(`/manages/${manageId}/creates/${id}`)
      .end(function (err, res) {
        if (err) {
          return console.error(err)
        }
        return res
      })
  }

}

export default utils
