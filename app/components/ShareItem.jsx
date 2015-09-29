import React from 'react'

export default class ShareItem extends React.Component {

  render () {
    return (
      <div dangerouslySetInnerHTML={{__html: this.props.content}} />
    )
  }
}

ShareItem.propTypes = {
  content: React.PropTypes.string
}
