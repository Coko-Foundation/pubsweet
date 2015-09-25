import Immutable from 'immutable'
import createActions from 'actions/CreateActions'
import alt from 'altInstance'

class CreateStore {

  /*
   * The constructor of your store definition receives the alt instance as its
   * first and only argument. All instance variables, values assigned to `this`,
   * in any part of the StoreModel will become part of state.
   */
  constructor () {
    this.creates = Immutable.OrderedMap({})
    this.newCreate = ''
    this.on('init', this.bootstrap)
    this.on('bootstrap', this.bootstrap)

    this.bindListeners({
      handleUpdate: [createActions.UPDATE, createActions.GET],
      handleCreate: createActions.CREATE,
      handleDestroy: createActions.DESTROY
    })
  }

  bootstrap () {
    if (!Immutable.OrderedMap.isOrderedMap(this.creates)) {
      this.creates = Immutable.fromJS(this.creates).toOrderedMap()
    }
    this.newManage = ''
  }

  handleUpdate (data) {
    const id = data.id.toString()
    this.creates = this.creates.set(id, Immutable.fromJS(data))
    this.emitChange()
  }

  handleCreate (data) {
    const id = data.id.toString()
    this.creates = this.creates.set(id, Immutable.fromJS(data))
    this.emitChange()
  }

  handleDestroy (id) {
    this.creates = this.creates.delete(id.toString())
    this.emitChange()
  }

}

export default alt.createStore(CreateStore, 'CreateStore')
