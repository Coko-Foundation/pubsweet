import React from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import Joi from 'joi-browser'

class PubSweetFormGroup extends React.Component {
  constructor (props) {
    super(props)
    this.validationState = this.validationState.bind(this)
  }

  validationState () {
    let [model, property] = this.props.modelProperty.split('.')
    let validation = Joi.reach(this.props.validations[model], property)

    let result = Joi.validate(validation, this.state.value)
    if (result.error) {
      this.setState({ validationMessage: result.details.message })
      return 'error'
    } else {
      this.setState({ validationMessage: '' })
      return 'success'
    }
  }

  handleChange (e) {
    this.setState({ value: e.target.value })
  }

  render () {
    return <FormGroup
      controlId={this.props.controlId}
      validationState={this.validationState()}
    >
      <ControlLabel>Working example with validation</ControlLabel>
      <FormControl
        type='text'
        value={this.state.value}
        placeholder={this.props.placeholder}
        onChange={this.handleChange}
      />
      <FormControl.Feedback />
      <HelpBlock>{this.state.validationMessage}</HelpBlock>
    </FormGroup>
  }
}

PubSweetFormGroup.propTypes = {
  controlId: React.PropTypes.string.required,
  label: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  validations: React.PropTypes.object,
  modelProperty: React.PropTypes.string
}

export default PubSweetFormGroup
