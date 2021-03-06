import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { th, override } from '@pubsweet/ui-toolkit'

import { TextField } from '../atoms'

const Root = styled.div`
  width: calc(${th('gridUnit')} * 42);
  margin-bottom: ${props =>
    props.inline ? '0' : `calc(${props.theme.gridUnit} * 3) `};
`

const Value = styled.div`
  padding: calc(${th('gridUnit')} - ${th('borderWidth')}) ${th('gridUnit')};
  border: ${th('borderWidth')} ${th('borderStyle')} transparent;
  border-radius: ${th('borderRadius')};
  cursor: pointer;

  &:hover {
    border-color: ${th('colorSecondary')};
  }

  ${override('ui.EditableValue')};
`

const ESCAPE_KEY_CODE = 27

export default class EditableValue extends React.Component {
  constructor(props) {
    super(props)
    this._save = this._save.bind(this)
    this._onChange = this._onChange.bind(this)
    this._onClick = this._onClick.bind(this)
    this._onKeyDown = this._onKeyDown.bind(this)

    this._storedValue = this.props.value
    this.state = {
      value: this._storedValue,
      editing: false,
    }
  }

  _save() {
    if (typeof this.props.onSave === 'function') {
      this.props.onSave(this.state.value)
    }
    this._storedValue = this.state.value
    this.setState({
      editing: false,
    })
  }

  _onChange(event) {
    this.setState({
      value: event.target.value,
    })
  }

  _onClick(event) {
    this.setState({
      editing: true,
    })
  }

  _onKeyDown(event) {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      this.setState({
        value: this._storedValue,
        editing: false,
      })
    }
  }

  render() {
    if (this.state.editing) {
      return (
        <Root>
          <form onSubmit={this._save}>
            <TextField
              inline={this.props.inline}
              onChange={this._onChange}
              onKeyDown={this._onKeyDown}
              required={this.props.required}
              value={this.state.value}
            />
          </form>
        </Root>
      )
    }
    return (
      <Root>
        <Value onClick={this._onClick}>{this.state.value}</Value>
      </Root>
    )
  }
}

EditableValue.propTypes = {
  required: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  value: PropTypes.string,
}
