import React from 'react'
import ConfigurableEditor from '../configurable/ConfigurableEditor'

const MainEditor = props => (
  <ConfigurableEditor
    bold
    bulletlist
    createtabinsertimage
    createtable
    insertimage
    joinaboveblock
    liftitem
    table
    {...props}
  />
)

export default MainEditor
