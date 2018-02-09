import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  max-width: calc(var(--grid-unit) * 14);
`

const Label = styled.label`
  font-size: var(--font-size-base-small);
  display: block;
`

const Input = styled.input`
  border: var(--border-width) var(--border-style) var(--color-border);
  border-radius: var(--border-radius);

  font-family: inherit;
  font-size: inherit;

  padding: 0 calc(var(--grid-unit) / 2);
  height: calc(var(--grid-unit) * 2);

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
