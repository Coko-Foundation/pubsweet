import React from 'react'
import { AbstractEditor } from 'xpub-edit'

const AbstractInput = input => (
  <AbstractEditor placeholder="Enter text" title="" {...input} />
)

export default AbstractInput
