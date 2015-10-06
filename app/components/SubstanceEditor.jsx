import React from 'react'
import LensWriter from 'lens-writer/react'

// Styles
import 'lens-writer/app/app.scss'
import 'scss/components/_substanceEditor'

export default class SubstanceEditor extends React.Component {
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
      <LensWriter content={this.state.value} />
    )
  }
}

SubstanceEditor.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.string
}
