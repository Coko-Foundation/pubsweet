import React from 'react'
import LensWriter from 'lens-writer/react'

// Styles
import '../../node_modules/lens-writer/app/app.scss'
import '../scss/components/_substanceEditor'

export default class SubstanceEditor extends React.Component {
  constructor (props) {
    super(props)
    this._onSave = this._onSave.bind(this)
    this._onMessage = this._onMessage.bind(this)

    this.state = {
      value: this.props.value || undefined
    }
  }

  _onSave (value, callback) {
    this.props.onChange(value)
    callback(null)
  }

  _onMessage (message) {

  }

  render () {
    return (
      <LensWriter content={this.state.value} onSave={this._onSave} onMessage={this._onMessage} />
    )
  }
}

SubstanceEditor.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.string
}
