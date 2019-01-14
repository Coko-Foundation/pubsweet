import React from 'react'
import FactoryLibrary from './FactoryLibrary'

class LayoutAbstract extends React.Component {
  constructor() {
    super()
    FactoryLibrary.create().then(Library => {
      const library = new Library()
      this.setState({
        library: this.administration ? library : library.elements,
      })
    })
  }

  render() {
    return <div>This is an Abstract view</div>
  }
}

export default LayoutAbstract
