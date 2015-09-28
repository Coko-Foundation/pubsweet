// import React from 'react'

var React = window.React = require('react')
import Editor from 'components/Editor'
// import styles from 'scss/components/_create'

export default class Create extends React.Component {
  render () {
    return (
      <Editor createId={this.props.params.createId}/>
    )
  }
}

Create.propTypes = {
  params: {
    createId: React.PropTypes.number
  }

}

