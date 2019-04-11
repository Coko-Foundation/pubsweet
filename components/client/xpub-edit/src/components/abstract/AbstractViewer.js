import React from 'react'
import ConfigurableViewer from '../configurable/ConfigurableViewer'

const AbstractViewer = props => (
  <ConfigurableViewer
    bold
    heading
    italic
    smallcaps
    subscript
    superscript
    {...props}
  />
)

export default AbstractViewer
