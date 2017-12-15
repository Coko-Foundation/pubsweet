import React from 'react'
import PropTypes from 'prop-types'

const ENTER_KEY_CODE = 13

export default class TextInput extends React.Component {
  constructor(props) {
    super(props)
    this._save = this._save.bind(this)
    this._onChange = this._onChange.bind(this)
    this._onKeyDown = this._onKeyDown.bind(this)
    this.state = {
      value: this.props.value || '',
    }
  }

  render() {
    return (
      <input
        autoFocus
        className={this.props.className}
        id={this.props.id}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        placeholder={this.props.placeholder}
        value={this.state.value}
      />
    )
  }

  _save() {
    this.props.onSave(this.state.value)
    this.setState({
      value: '',
    })
  }

  _onChange(event) {
    this.setState({
      value: event.target.value,
    })
  }

  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save()
    }
  }
}

TextInput.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  value: PropTypes.string,
}
