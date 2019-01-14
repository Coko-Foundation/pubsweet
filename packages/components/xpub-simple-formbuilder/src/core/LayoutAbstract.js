import React from 'react'
import FactoryLibrary from './FactoryLibrary'

class LayoutAbstract extends React.Component {
  constructor() {
    super()
    this.ui = FactoryLibrary.create()
  }

  render() {
    return <div>This is an Abstract view</div>
  }
}

export default LayoutAbstract
