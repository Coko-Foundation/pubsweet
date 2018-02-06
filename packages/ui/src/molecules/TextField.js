import React from 'react'
import styled from 'styled-components'

import Label from '../atoms/Label'
import Input from '../atoms/Input'

const Root = styled.div`
  --font-local: var(--font-reviewer);

  display: flex;
  flex-direction: ${props => (props.inline ? 'row' : 'column')};
  align-items: ${props => (props.inline ? 'center' : 'normal')};
  justify-items: ${props => (props.inline ? 'bottom' : 'auto')};

  max-width: 200px;
  margin-top: 0;
  margin-bottom: 20px;

  font-size: 1em;
  line-height: 1.8;

  ${Input} {
    margin-left: ${props => (props.inline ? '1em' : '')};
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
      value={value}
    />
  </Root>
)

export default TextField
