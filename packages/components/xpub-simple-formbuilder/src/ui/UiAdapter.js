import { adminElements, elements } from './Ui'
import Adapter from '../core/Adapter'

export default class UiAdapter extends Adapter {
  constructor() {
    super()
    this.adminElements = adminElements
    this.elements = elements
  }
}
