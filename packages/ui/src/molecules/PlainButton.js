import React from 'react'
import { Button } from '../atoms'

const PlainButton = ({ className, children, type, disabled, onClick }) => (
  <Button
    className={className}
    disabled={disabled}
    onClick={onClick}
    plain
    type={type}
  >
    {children}
  </Button>
)

export default PlainButton
