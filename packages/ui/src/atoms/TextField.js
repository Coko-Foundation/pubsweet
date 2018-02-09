import React from 'react'
import styled from 'styled-components'

const Root = styled.label`
  display: flex;
  flex-direction: column;
`

const Label = styled.span`
  font-size: var(--font-size-base-small);
`

const Input = styled.input`
  border: var(--border-width) var(--border-style) var(--color-border);
  border-radius: var(--border-radius);

  font-size: inherit;

  padding: var(--sub-grid-unit);
  height: calc((var(--grid-unit) / 2) - (var(--border-width) * 2));

  &::placeholder {
    color: var(--color-text-placeholder);
  }
`

const TextField = ({
  label,
  name,
  placeholder,
  required,
  type = 'text',
  value = '',
  onBlur,
  onChange,
  readonly,
}) => (
  <Root>
    {label && <Label>{label}</Label>}
    <Input
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readonly}
      required={required}
      type={type}
      value={value}
    />
  </Root>
)

export default TextField
