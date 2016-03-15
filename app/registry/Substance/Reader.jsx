import React from 'react'
import LensReader from 'lens/ReactLensReader'

// Styles
import './styles/reader.scss'

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
  content: React.PropTypes.string
}

export default Reader
