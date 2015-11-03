import React from 'react'
import LensReader from 'lens/ReactLensReader'
import '../../scss/components/_blogpost'

export default class LensBlogpost extends React.Component {
  render () {
    const { blogpost } = this.props

    return (
      <div className='blogpost'>
        <LensReader content={blogpost.source} />
      </div>
    )
  }
}

LensBlogpost.propTypes = {
  blogpost: React.PropTypes.object
}
