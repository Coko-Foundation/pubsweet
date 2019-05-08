import { createContext } from 'react'

export default createContext({
  modalKey: undefined,
  showModal: () => {},
  hideModal: () => {},
})
