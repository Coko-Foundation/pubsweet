import alt from 'altInstance'
import ManageAPI from 'utils/ManageAPI'

class ManageActions {

  create (title) {
    const that = this

    const data = {
      status: 'unpublished',
      title: title
    }

    // This dispatches for views to make optimistic updates
    // Makes an additional call to the server API and actually adds the topic
    ManageAPI.addManage(data).then(function (data) {
      that.dispatch(data)
    }).catch(function (err) {
      console.error(err)
    })
  }

  update (id, data) {
    const that = this

    ManageAPI.updateManage(id, data).then(function (data) {
      that.dispatch(data)
    }).catch(function (err) {
      console.error(err)
    })
  }

  destroy (id) {
    this.dispatch(id)
    // Keeping it consistent with the above
    ManageAPI.deleteManage(id)
  }

  typing (data) {
    this.dispatch(data)
  }

}

export default alt.createActions(ManageActions)
