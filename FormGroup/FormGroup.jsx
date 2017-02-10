import React from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import Joi from 'joi-browser'

class PubSweetFormGroup extends React.Component {
  constructor (props) {
    super(props)
    this.validateState = this.validateState.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      startedEditing: false
    }
  }

  validateState (state) {
    if (!state.startedEditing) return null

    let [model, property] = this.props.modelProperty.split('.')
    let validation = Joi.reach(VALIDATIONS[model], property)

    let result = validation.label(this.props.label).validate(state.value)
    if (result.error) {
      Object.assign(state, {
        validation: 'error',
        validationMessage: result.error.message
      })
    } else {
      Object.assign(state, {
        validation: 'success',
        validationMessage: ''
      })
    }
  }

  handleChange (e) {
    let nextState = {
      startedEditing: true,
      value: e.target.value
    }
    this.validateState(nextState)
    this.setState(nextState)
  }

  render () {
    return <FormGroup
      controlId={this.props.controlId}
      validationState={this.state.validation}
    >
      <ControlLabel>{this.props.label}</ControlLabel>
      <FormControl
        type='text'
        value={this.state.value}
        placeholder={this.props.placeholder}
        onChange={this.handleChange}
        inputRef={this.props.inputRef}
      />
      <FormControl.Feedback />
      <HelpBlock>{this.state.validationMessage}</HelpBlock>
    </FormGroup>
  }
}

PubSweetFormGroup.propTypes = {
  controlId: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  modelProperty: React.PropTypes.string,
  inputRef: React.PropTypes.func
}

export default PubSweetFormGroup
