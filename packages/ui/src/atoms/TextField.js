import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  max-width: calc(${props => props.theme.gridUnit} * 14);
  margin-bottom: ${props => (props.inline ? '0' : props.theme.gridUnit)};
`

const Label = styled.label`
  font-size: ${props => props.theme.fontSizeBaseSmall};
  display: block;
`

const borderColor = ({ theme, validationStatus = 'default' }) =>
  ({
    error: theme.colorError,
    success: theme.colorSuccess,
    warning: theme.colorWarning,
    default: theme.colorBorder,
  }[validationStatus])

const Input = styled.input`
  border: ${props => props.theme.borderWidth}
    ${props => props.theme.borderStyle} ${borderColor};

  border-radius: ${props => props.theme.borderRadius};

  font-family: inherit;
  font-size: inherit;

  padding: 0 calc(${props => props.theme.gridUnit} / 2);
  height: calc(${props => props.theme.gridUnit} * 2);

  &::placeholder {
    color: ${props => props.theme.colorTextPlaceholder};
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
  onKeyDown,
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
      onKeyDown={onKeyDown}
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
