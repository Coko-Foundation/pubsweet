import React from 'react'
import styled from 'styled-components'
import { th, override } from '@pubsweet/ui-toolkit'

const Label = styled.span`
  ${override('ui.Checkbox.Label')};
`
const Input = styled.input`
  margin-right: ${th('gridUnit')};
  ${override('ui.Checkbox.Input')};
`
const Root = styled.label`
  cursor: pointer;
  align-items: center;
  display: ${props => (props.inline ? 'inline-flex' : 'flex')};
  font-family: ${th('fontAuthor')};

  &:not(:last-child) {
    margin-right: ${props => (props.inline ? props.theme.gridUnit : '0')};
  }

  ${override('ui.Checkbox')};
`

const Checkbox = ({
  className,
  disabled,
  inline,
  name,
  value,
  label,
  checked,
  required,
  onChange,
}) => {
  checked = checked || false

  return (
    <Root checked={checked} className={className} inline={inline}>
      <Input
        checked={checked}
        disabled={disabled}
        name={name}
        onChange={onChange}
        required={required}
        type="checkbox"
        value={value}
      />
      <Label checked={checked}>{label}</Label>
    </Root>
  )
}

export default Checkbox
