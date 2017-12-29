import { TOGGLE_MODAL_TRIGGER } from './types'

export default function modal(state = [], action) {
  if (action.type === TOGGLE_MODAL_TRIGGER) {
    let find = false

    const modalState = state.map(item => {
      if (item.component === action.component) {
        find = true
        item.isOpen = !item.isOpen
        return { ...item, ...action.payload }
      }
      return item
    })

    if (!find) {
      const modalProps = {
        isOpen: true,
        title: action.title,
        component: action.component,
        onAfterOpen: action.onAfterOpen,
        onRequestClose: action.onRequestClose,
        closeTimeoutMS: action.closeTimeoutMS,
        style: action.style,
        contentLabel: action.contentLabel,
      }

      modalState.push(modalProps)
    }

    return modalState
  }
  return state
}
