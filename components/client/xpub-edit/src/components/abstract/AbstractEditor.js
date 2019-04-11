import React from 'react'
import ConfigurableEditor from '../configurable/ConfigurableEditor'

const AbstractEditor = props => (
  <ConfigurableEditor
    bold
    heading
    italic
    smallcaps
    subscript
    superscript
    {...props}
  />
)

export default AbstractEditor
