import { adminElements, elements } from './Ui'
import Adapter from '../core/Adapter'

export default class UiAdapter extends Adapter {
  constructor() {
    super()
    this._adminElements = adminElements
    this._elements = elements
  }
}
