import React from 'react'
import LensReader from './ReactLensReader'

// Styles
import './styles/Reader.scss'

export default class Reader extends React.Component {
  render () {
    const { content } = this.props
    return (
      <div className='blogpost'>
        <LensReader content={content} />
      </div>
    )
  }
}

Reader.propTypes = {
  // Data
  content: React.PropTypes.object
}

export default Reader
