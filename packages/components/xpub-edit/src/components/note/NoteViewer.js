import React from 'react'
import ConfigurableViewer from '../configurable/ConfigurableViewer'

const NoteViewer = props => (
  <ConfigurableViewer bold italic smallcaps subscript superscript {...props} />
)

export default NoteViewer
