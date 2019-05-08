import React, { useState } from 'react'
import { createPortal } from 'react-dom'

import ModalOverlay from './ModalOverlay'
import ModalContext from './ModalContext'

function ModalProvider({ children }) {
  const [modalState, setModalVisibility] = useState({
    isVisibile: false,
    dismissable: false,
    component: undefined,
    modalProps: {},
  })

  const hideModal = () => {
    setModalVisibility({
      isVisibile: false,
    })
  }

  const showModal = ({ component, dismissable, modalProps }) => {
    setModalVisibility({
      isVisibile: true,
      component,
      dismissable,
      modalProps,
    })
  }
  return (
    <ModalContext.Provider
      value={{
        showModal,
        hideModal,
        isVisibile: modalState.isVisible,
      }}
    >
      {modalState.isVisibile &&
        createPortal(
          <ModalOverlay
            onClick={modalState.dismissable ? hideModal : undefined}
          >
            {modalState.component({
              hideModal,
              ...modalState.modalProps,
            })}
          </ModalOverlay>,
          document.body,
        )}
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider
