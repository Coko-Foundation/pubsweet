import React from 'react'
import styled from 'styled-components'
import { th, override } from '@pubsweet/ui-toolkit'

const Label = styled.span`
  ${override('ui.Radio.Label')};
`
const Input = styled.input`
  margin-right: ${th('subGridUnit')};
  ${override('ui.Radio.Input')};
`
const Root = styled.label`
  cursor: pointer;
  align-items: center;
  display: ${props => (props.inline ? 'inline-flex' : 'flex')};
  min-height: calc(${th('gridUnit')} * 3);
  color: ${props => (props.color ? props.color : props.theme.colorText)};

  ${override('ui.Radio')};
`
const Radio = ({
  className,
  color,
  inline,
  name,
  value,
  label,
  checked,
  required,
  onChange,
  readonly,
}) => (
  <Root checked={checked} color={color} inline={inline}>
    <Input
      checked={checked}
      disabled={readonly}
      name={name}
      onChange={onChange}
      required={required}
      type="radio"
      value={value}
    />
    <Label checked={checked} color={color}>
      {label}
    </Label>
  </Root>
)

export default Radio
