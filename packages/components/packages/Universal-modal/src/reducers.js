import { TOGGLE_MODAL_TRIGGER } from './types'

export default function modal(
  state = {
    isOpen: false,
    modalType: 'confirm',
    component: null,
    successFn: null,
    cancelFn: null,
    onAfterOpen: () => {},
    onRequestClose: () => {},
    closeTimeoutMS: 150,
    style: {},
    contentLabel: 'Modal',
  },
  action,
) {
  if (action.type === TOGGLE_MODAL_TRIGGER) {
    const modal = {
      isOpen: action.isOpen,
      modalType: action.modalType,
      component: action.component,
      successFn: action.successFn,
      cancelFn: action.cancelFn,
      onAfterOpen: action.onAfterOpen,
      onRequestClose: action.onRequestClose,
      closeTimeoutMS: action.closeTimeoutMS,
      style: action.style,
      contentLabel: action.contentLabel,
    }
    return Object.assign({}, state, modal)
  }
  return state
}
