import React from 'react'
import PropTypes from 'prop-types'
import {
  FormGroup as BootstrapFormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
} from 'react-bootstrap'
import Joi from 'joi-browser'

import mergeValidations from 'pubsweet-server/src/models/validations'
import config from 'config'

const appValidationsPath = config.validations
const validations = mergeValidations(require(appValidationsPath))

class FormGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startedEditing: false,
    }
  }

  validateState(state) {
    if (!state.startedEditing) return state

    const [model, property] = this.props.modelProperty.split('.')
    const validation = Joi.reach(validations[model], property)

    const result = validation.label(this.props.label).validate(state.value)
    if (result.error) {
      return {
        ...state,
        validation: 'error',
        validationMessage: result.error.message,
      }
    }

    return {
      ...state,
      validation: 'success',
      validationMessage: '',
    }
  }

  handleChange(e) {
    const validatedState = this.validateState({
      startedEditing: true,
      value: e.target.value,
    })
    this.setState(validatedState)
  }

  render() {
    return (
      <BootstrapFormGroup
        controlId={this.props.controlId}
        validationState={this.state.validation}
      >
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl
          inputRef={this.props.inputRef}
          onChange={e => this.handleChange(e)}
          placeholder={this.props.placeholder}
          type="text"
          value={this.state.value}
        />
        <FormControl.Feedback />
        <HelpBlock>{this.state.validationMessage}</HelpBlock>
      </BootstrapFormGroup>
    )
  }
}

FormGroup.propTypes = {
  controlId: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  modelProperty: PropTypes.string,
  inputRef: PropTypes.func,
}

export default FormGroup
