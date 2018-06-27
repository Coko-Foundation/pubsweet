import React from 'react'
import styled from 'styled-components'
import { th, override } from '@pubsweet/ui-toolkit'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => (props.inline ? '0' : props.theme.gridUnit)};
  ${override('TextField.Root')};
`

const Label = styled.label`
  font-size: ${th('fontSizeBaseSmall')};
  display: block;
  ${override('TextField.Label')};
`

const borderColor = ({ theme, validationStatus = 'default' }) =>
  ({
    error: theme.colorError,
    success: theme.colorSuccess,
    default: theme.colorBorder,
  }[validationStatus])

const Input = styled.input`
  border: ${th('borderWidth')} ${th('borderStyle')} ${borderColor};

  border-radius: ${th('borderRadius')};

  font-family: inherit;
  font-size: inherit;

  padding: 0 calc(${th('gridUnit')} / 2);
  height: calc(${th('gridUnit')} * 2);

  &::placeholder {
    color: ${th('colorTextPlaceholder')};
  }

  ${override('TextField.Input')};
`

class TextField extends React.Component {
  componentWillMount() {
    // generate a unique ID to link the label to the input
    // note this may not play well with server rendering
    this.inputId = `textfield-${Math.round(Math.random() * 1e12).toString(36)}`
  }
  render() {
    const {
      label,
      type = 'text',
      value = '',
      readonly,
      inline,
      ...props
    } = this.props
    return (
      <Root inline={inline}>
        {label && <Label htmlFor={this.inputId}>{label}</Label>}
        <Input
          id={this.inputId}
          readOnly={readonly}
          type={type}
          value={value}
          {...props}
        />
      </Root>
    )
  }
}

export default TextField
