import React from 'react'
import ConfigurableEditor from '../configurable/ConfigurableEditor'

const MainEditor = props => (
  <ConfigurableEditor
    bold
    bulletlist
    createtable
    insertimage
    italic
    joinaboveblock
    liftitem
    orderedlist
    redo
    smallcaps
    subscript
    superscript
    table
    undo
    {...props}
  />
)

export default MainEditor
