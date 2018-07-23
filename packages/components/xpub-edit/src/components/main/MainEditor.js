import React from 'react'
import ConfigurableEditor from '../configurable/ConfigurableEditor'

const MainEditor = props => (
  <ConfigurableEditor
    undo
    redo
    bold
    italic
    superscript
    subscript
    smallcaps
    bulletlist
    orderedlist
    joinaboveblock
    liftitem
    createtable
    table
    insertimage
    {...props}
  />
)

export default MainEditor
