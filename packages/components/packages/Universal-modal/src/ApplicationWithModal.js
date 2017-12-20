import React from 'react'
import ModalContainer from './ModalContainer'

const ApplicationWithModal = WrappedComponent => (
  <div>
    <WrappedComponent />
    <ModalContainer />
  </div>
)

export default ApplicationWithModal
