import React from 'react'
import { PlainButton } from '@pubsweet/ui'

const HeaderModal = props => (
  <div>
    <h4 className="modal-title">{props.title}</h4>
    <PlainButton onClick={() => props.toggleModal({ component: 'modalOne' })}>
      x
    </PlainButton>
  </div>
)

export default HeaderModal
