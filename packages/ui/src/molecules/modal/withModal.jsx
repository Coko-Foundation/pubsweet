import React from 'react'

import ModalContext from './ModalContext'

export default ({ component, dismissable }) => WrappedComponent => props => (
  <ModalContext.Consumer>
    {modalProps => (
      <WrappedComponent
        hideModal={modalProps.hideModal}
        showModal={() =>
          modalProps.showModal({
            component,
            dismissable,
            modalProps: props,
          })
        }
        {...props}
      />
    )}
  </ModalContext.Consumer>
)
