import React from 'react'
import styled from 'styled-components'

import Label from '../atoms/Label'
import Input from '../atoms/Input'

const Root = styled.div`
  --font-local: var(--font-reviewer);

  align-items: center;
  display: flex;
  font-size: 1em;
  line-height: 1.8;
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
