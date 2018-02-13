import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  max-width: calc(var(--grid-unit) * 14);
  margin-bottom: ${props => (props.inline ? '0' : 'var(--grid-unit)')};
`

const Label = styled.label`
  font-size: var(--font-size-base-small);
  display: block;
`

const Input = styled.input`
  border: var(--border-width) var(--border-style)
    ${({ validationStatus = 'default' }) => {
      const colorMap = {
        error: 'var(--color-error)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        default: 'var(--color-border)',
      }
      return colorMap[validationStatus]
    }};

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
  validationStatus,
  inline,
}) => (
  <Root inline={inline}>
    {label && <Label>{label}</Label>}
    <Input
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readonly}
      required={required}
      type={type}
      validationStatus={validationStatus}
      value={value}
    />
  </Root>
)

export default TextField
