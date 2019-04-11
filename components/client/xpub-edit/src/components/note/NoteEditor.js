import React from 'react'
import ConfigurableEditor from '../configurable/ConfigurableEditor'

const NoteEditor = props => (
  <ConfigurableEditor bold italic smallcaps subscript superscript {...props} />
)

export default NoteEditor
