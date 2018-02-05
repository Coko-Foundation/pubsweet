import React from 'react'
import styled from 'styled-components'

const Root = styled.label`
  --font-local: var(--font-reviewer);

  display: block;
  align-items: center;

  font-size: 0.8em;
  font-style: italic;
  text-transform: lowercase;

  cursor: text;

  &:hover {
    color: var(--color-primary);
  }
`

const Label = styled.span`
  display: block;
`

const Input = styled.input`
  --color-back: darkgray;

  border: none;
  border-bottom: 1px dashed var(--color-back);

  caret-color: var(--color-primary);
  flex: 1;

  font-family: var(--font-local), serif;
  font-size: 1.3em;

  max-width: 100%;
  line-height: 1;
  margin-bottom: 3em;
  margin-top: 0.6em;
  padding: 0;

  &:hover,
  &:focus {
    --color-back: transparent;
    box-shadow: none;
    outline-style: none;
  }

  &::placeholder {
    color: #999;
    font-family: var(--font-interface);
    font-size: 1em;
    font-style: italic;
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
  className,
}) => (
  <Root className={className}>
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
