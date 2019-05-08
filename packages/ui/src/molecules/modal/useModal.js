import { useContext } from 'react'

import ModalContext from './ModalContext'

const useModal = ({ component, dismissable }) => {
  const { showModal, hideModal } = useContext(ModalContext)

  return {
    hideModal,
    showModal: () => showModal({ component, dismissable }),
  }
}

export default useModal
