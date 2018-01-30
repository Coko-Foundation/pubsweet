import React from 'react'
import styled from 'styled-components'

const Root = styled.label`
  --font-local: var(--font-reviewer);

  align-items: center;
  display: flex;
  font-size: 1em;
  line-height: 1.8;
`

const Label = styled.span`
  margin-right: 10px;
`

const Input = styled.input`
  --color-back: darkgray;

  background: linear-gradient(
      to right,
      transparent 0%,
      transparent 2px,
      white 2px,
      white 4px
    ),
    linear-gradient(white 0%, white 90%, var(--color-back) 95%, white 100%);
  background-position: 0 0, 0.2em 0;
  background-repeat: repeat-X, repeat-Y;
  background-size: 7px 100%, 100% 1.3em;
  border: none;
  border-left: 1px solid darkgrey;
  caret-color: var(--color-primary);
  flex: 1;
  font-family: var(--font-local), serif;
  font-size: inherit;
  max-width: 100%;
  padding: 0 0.5em;

  &:hover,
  &:focus {
    border-color: transparent;
    box-shadow: none;
    outline-style: none;
  }

  &:hover {
    --color-back: var(--color-primary);
  }

  &:focus {
    --color-back: #aaa;
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
