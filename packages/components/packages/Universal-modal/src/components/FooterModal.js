import React from 'react'
import { Button, PlainButton } from '@pubsweet/ui'

const FooterModal = props => (
  <div>
    <Button primary type="submit">
      Submit your manuscript
    </Button>
    <span className={' '}> or </span>
    <PlainButton onClick={() => props.toggleModal({ component: 'modalOne' })}>
      get back to your submission
    </PlainButton>
  </div>
)

export default FooterModal
