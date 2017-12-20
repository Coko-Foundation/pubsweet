import * as T from './types'

const toggleModalTrigger = args => ({
  type: T.TOGGLE_MODAL_TRIGGER,
  ...args,
})

export const toggleModal = args => dispatch =>
  dispatch(toggleModalTrigger(args))
