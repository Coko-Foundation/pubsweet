import React from 'react'

import { Radio, Flexbox } from '../atoms'

class RadioGroup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value,
    }
  }

  handleChange = event => {
    const { value } = event.target
    this.setState({ value })
    this.props.onChange(value)
  }

  render() {
    const { inline, name, options, required } = this.props
    const { value } = this.state

    return (
      <Flexbox inline={!inline}>
        {options.map(option => (
          <Radio
            checked={option.value === value}
            color={option.color}
            inline={inline}
            key={option.value}
            label={option.label}
            name={name}
            onChange={this.handleChange}
            required={required}
            value={option.value}
          />
        ))}
      </Flexbox>
    )
  }
}

export default RadioGroup
