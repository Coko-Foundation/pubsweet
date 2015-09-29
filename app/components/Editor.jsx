import React from 'react'
import ReactQuill from 'react-quill'

import 'scss/components/_editor'

export default class Editor extends React.Component {
  constructor (props) {
    super(props)
    this._onChange = this._onChange.bind(this)

    this.state = {
      value: this.props.value || ''
    }
  }

  _onChange (value) {
    this.setState({value: value})
    this.props.onChange(value)
  }

  render () {
    return (
      <ReactQuill theme='snow' value={this.state.value} onChange={this._onChange} />
    )
  }
}

Editor.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.string
}
