import alt from 'altInstance'
import CreateAPI from 'utils/CreateAPI'

class CreateActions {

  get (manageId, id) {
    const that = this

    CreateAPI.getCreate(id).then(function (data) {
      that.dispatch(data)
    }).catch(function (err) {
      console.error(err)
    })
  }

  create (content) {
    const that = this

    const data = {
      content: content
    }

    CreateAPI.addCreate(data).then(function (data) {
      that.dispatch(data)
    }).catch(function (err) {
      console.error(err)
    })
  }

  update (id, data) {
    const that = this

    CreateAPI.updateCreate(id, data).then(function (data) {
      that.dispatch(data)
    }).catch(function (err) {
      console.error(err)
    })
  }

  destroy (id) {
    this.dispatch(id)
    CreateAPI.deleteCreate(id)
  }
}

export default alt.createActions(CreateActions)
