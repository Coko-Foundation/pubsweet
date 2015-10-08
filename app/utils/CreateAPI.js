var request = require('superagent')

const utils = {
  getCreates: (id) => {
    return new Promise(function (resolve, reject) {
      request
        .get('/api/creates')
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

  getCreate: (id) => {
    return new Promise(function (resolve, reject) {
      request
        .get(`/api/creates/${id}`)
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

  addCreate: (create) => {
    return new Promise(function (resolve, reject) {
      request
        .post('/api/creates')
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
        .put(`/api/creates/${id}`)
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
      .del(`/api/creates/${id}`)
      .end(function (err, res) {
        if (err) {
          return console.error(err)
        }
        return res
      })
  }

}

export default utils
