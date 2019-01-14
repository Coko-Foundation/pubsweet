export default class Adapter {
  get elements() {
    return this._elements
  }

  get adminElements() {
    return this._adminElements
  }

  set elements(newName) {
    this._name = newName
  }

  set adminElements(newName) {
    this._name = newName
  }
}
