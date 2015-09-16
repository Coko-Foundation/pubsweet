import alt from 'altInstance'
import ManageAPI from 'utils/ManageAPI'

class ManageActions {
  publish (id) {
  }

  unpublish (id) {
  }

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
      // .done(function success() {
      //   // We might not need to do anything it successfully added due to optimistic updates.
      // })
      // .fail(function failure() {
      //   // dispatch an event if fails to notify user that it has failed
      // })
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
