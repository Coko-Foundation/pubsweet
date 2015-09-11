import alt from 'altInstance';
import ManageAPI from 'utils/ManageAPI';

/*
 * Declaring ManageActions using ES2015. This is equivalent to creating
 * function ManageActions() {}
 * AND
 * ManageActions.prototype.create() = function(data) {}
 */
class ManageActions {
  publish(id) {

  }

  unpublish(id) {

  }

  create(data) {
    // This dispatches for views to make optimistic updates
    this.dispatch(data);
    // Makes an additional call to the server API and actually adds the topic
    ManageAPI.addManage(data);
      // .done(function success() {
      //   // We might not need to do anything it successfully added due to optimistic updates.
      // })
      // .fail(function failure() {
      //   // dispatch an event if fails to notify user that it has failed
      // });

  }

  destroy(id) {
    this.dispatch(id);
    // Keeping it consistent with the above
    ManageAPI.deleteManage(id);
  }

  typing(data) {
    this.dispatch(data);
  }

}

export default alt.createActions(ManageActions);
