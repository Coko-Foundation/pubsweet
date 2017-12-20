import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')
const UniversalModal = props => {
  const {
    isOpen,
    modalType,
    component,
    successFn,
    cancelFn,
    onAfterOpen,
    onRequestClose,
    closeTimeoutMS,
    style,
    contentLabel
  } = props.modal

  return (
    <div>
      <Modal contentLabel={contentLabel} isOpen={isOpen}>
        {component}
      </Modal>
    </div>
  )
}

export default UniversalModal
