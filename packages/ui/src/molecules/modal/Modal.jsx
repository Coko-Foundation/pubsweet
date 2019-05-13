import React from 'react'

import ModalContext from './ModalContext'

const Modal = ({ children, dismissable, component, ...rest }) => (
  <ModalContext.Consumer>
    {modalProps =>
      children(() =>
        modalProps.showModal({ component, dismissable, modalProps: rest }),
      )
    }
  </ModalContext.Consumer>
)

export default Modal
